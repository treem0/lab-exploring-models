require('dotenv').config();
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose'); 
const Car = require('../lib/models/Car');

describe('application routes', () => {
  beforeAll(done => {
    done();
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });
  
  beforeAll(() =>{
    connect();
  });

  beforeEach(() =>{
    return mongoose.connection.dropDatabase();
  });
  afterAll(() =>{
    return mongoose.connection.close();
  });

  it('has a home route', () =>{
    return request(app)
      .get('/')
      .then(res =>[
        expect(res.body).toEqual({ text: 'all the cars' })
      ]);
  });

  it('has a route that gets a car by ID', async() => {
    const teslaCar = await Car.create({
      name: 'Tesla Model S',
      horsepower: 300
    });
    return request(app)
      .get(`/cars/${teslaCar._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
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
    const teslaCar = await Car.create({
      name: 'Tesla Cyber Truck',
      horsepower: 500
    });
    return request(app)
      .put(`/update/${teslaCar._id}`)
      .send({
        name: 'Tesla Cyber Truck',
        horsepower: 500
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Tesla Cyber Truck',
          horsepower: 500,
          __v: expect.any(Number)
        });
      });
  });

  it('has a /cars by ID delete route', async() =>{
    const teslaCar = await Car.create({
      name: 'Tesla Model S',
      horsepower: 300
    });
    return request(app)
      .delete(`/cars/${teslaCar._id}`)
      .then(res =>{
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Tesla Model S',
          horsepower: 300,
          __v: expect.any(Number) 
        });
      });
  });
});

  
