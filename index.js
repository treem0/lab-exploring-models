require('dotenv').config();
require('./lib/utils/connect')();
const Car = require('./lib/models/Car');


async function allCrudMethods() {
  // C - POST
  const createdCar = await Car.create({
    name: 'Tesla CyberTruck',
    horsepower: 500
  });

  // R - GET
  const aSingleFoundCar = await Car.findById(createdCar._id);
  const allFoundCars = await Car.find();

  // U - PUT
  const updatedCar = await Car.findByIdAndUpdate(aSingleFoundCar._id,
    { text: 'I like tennis balls' },
    { new: true });

  // D - DELETE
  const deletedCar = await Car.findByIdAndDelete(aSingleFoundCar._id);
}

module.exports = allCrudMethods;
