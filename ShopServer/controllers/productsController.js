const express = require('express');
const productsSERV = require('../services/productsService');

const router = express.Router();

// Entry point: http://localhost:3000/products

//Get all products
router.get('/', async (req, res) => {
   try {
    const products = await productsSERV.getAllProducts()
    res.send(products)
   } catch (error) {
    res.send(error)
   } 
});

// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const products = await productsSERV.getById(id)
    res.send(products)
  } catch (error) {
    res.send(error)
  }
});

// Add a new product
router.post('/', async (req, res) => {
  try {
    const newProd = req.body
    const response = await productsSERV.addNewProduct(newProd)
    res.send(response.message)
  } catch (error) {
    res.send(error)
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const prodUpd = req.body;
    await productsSERV.updateProduct(id, prodUpd)
    res.status(200).send(prodUpd)
  } catch (error) {
    res.send(error)
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      await productsSERV.deleteProduct(id)
      res.send('DELETED')
    } catch (error) {
      res.send(error)
    }
});

module.exports = router;
