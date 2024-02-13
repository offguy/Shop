const Product = require('../models//productsModel');

function getAll() {
  return Product.find({});
}

function getById(id) {
  return Product.findById(id);
}

function addNew(obj) {
  const newProd = new Product(obj);
  return newProd.save();  
}

function update(id, obj) {
  return Product.findByIdAndUpdate(id, obj);
}

function Delete(id) {
  return Product.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  addNew,
  update,
  Delete
};
