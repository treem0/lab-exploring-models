require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');


describe('application routes', () => {
  it('has a route that gets all the cars', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toContainEqual({ 
          __v: expect.any(Number),
          _id: expect.any(String),
          name: 'Tesla Cyber Truck',
          horsepower: 500, 
        });
      });
  });
  it('has a route that gets a car by ID', () => {
    return request(app)
      .get('/car/:id')
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: '5deadd97db36e77d24ff4189',
          name: 'Tesla Model S',
          horsepower: 300, 
        });
      });
  });
  
  it('has a /cars post route', () => {
    return request(app)
      .post('/cars')
      .send({
        name: 'Tesla Cyber Truck',
        horsepower: 500,
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          name: 'Tesla Cyber Truck',
          horsepower: 500,
        });
      });
  });
  it('has a /car PUT route', async() => {
    const car = await Car.create({
      name: 'tesla',
      horsepower: 400
    });

    return request(app)
      .put(`/cars/${car._id}`)
      .send({
        name: 'Tesla Cyber Truck',
        horsepower: 500,
      })
      .then(res => {
        expect(res.params).toEqual({
          _id: expect.any(String),
          name: 'Tesla Cyber Truck',
          horsepower: 500,
          __v: expect.any(Number)
        });
      });
  });
});
  
