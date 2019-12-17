const express = require('express');
const app = express();
const Car = require('./models/Car');

app.use(express.json());

app.get('/', (req, res) =>{
  res.send({ text: 'all the cars' });
});

app.get('/cars/:id', (req, res) =>{
  Car.findById(req.params.id)
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

app.put('/update/:id', (req, res) => {
  Car
    .findByIdAndUpdate(req.params.id, req.body)
    .then(updatedCar => res.send(updatedCar));
});

app.delete('/cars/:id', (req, res) => {
  Car
    .findByIdAndDelete(req.params.id)
    .then(deletedItem =>{
      res.send(deletedItem);
    });
});


module.exports = app;
