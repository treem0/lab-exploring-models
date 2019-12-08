const express = require('express');
const app = express();
const Car = require('./models/Car');

app.use(express.json());

app.get('/', (req, res) => {
  Car.find()
    .then(vehicles => {
      res.send(vehicles);
    });
});

app.get('/car/:id', (req, res) =>{
  Car.findOne()
    .then(vehicle => {
      res.send(vehicle);
    });
});

app.post('/cars', (req, res) => {
  const { name, horsepower } = req.body;
  Car.create({ name, horsepower })
    .then(createdCar => {
      res.send(createdCar);
    });
});

app.put('/cars/:id', (req, res) => {
  const id = req.params.id;
  const { name, horsepower } = req.body;
  Car.findByIdAndUpdate({ id, name, horsepower })
    .then(updatedCar => {
      res.send(updatedCar);
    });
});




module.exports = app;
