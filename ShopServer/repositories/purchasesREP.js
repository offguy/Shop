const Purchase = require('../models/purchasesModel');

function getAll() {
  return Purchase.find({});
}

function getById(id) {
  return Purchase.findById(id);
}

function addNew(obj) {
  const newPerch = new Purchase(obj);
  return newPerch.save();  
}

function update(id, obj) {
  return Purchase.findByIdAndUpdate(id, obj);
}

function Delete(id) {
  return Purchase.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  addNew,
  update,
  Delete
};
