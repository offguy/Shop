const Customer = require('../models/customersModel');

function getAll() {
  return Customer.find({});
}

function getById(id) {
  return Customer.findById(id);
}

function addNew(obj) {
  const newCust = new Customer(obj);
  return newCust.save();  
}

function update(id, obj) {
  return Customer.findByIdAndUpdate(id, obj);
}

function Delete(id) {
  return Customer.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  addNew,
  update,
  Delete
};
