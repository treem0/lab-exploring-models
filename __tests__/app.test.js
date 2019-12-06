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
  it('has a /car PUT route', () => {
    return request(app)
      .put('/car/:id')
      .send({
        name: 'Tesla Model S',
        horsepower: 300
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: expect.any(Number),
          _id: expect.any(String),
          name: 'Tesla Model S',
          horsepower: 300,
        });
      });
  });
});
  
