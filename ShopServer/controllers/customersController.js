const express = require('express');
const customersSERV = require('../services/customersService');

const router = express.Router();

// Entry point: http://localhost:3000/customers

//Get all Customers
router.get('/', async (req, res) => {
   try {
    const customers = await customersSERV.getAllCustomers()
    res.send(customers)
   } catch (error) {
    res.send(error)
   } 
});

// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const customer = await customersSERV.getById(id)
    res.send(customer)
  } catch (error) {
    res.send(error)
  }
});

// Add a new Customer
router.post('/', async (req, res) => {
  try {
    const newCust = req.body
    const response = await customersSERV.addNewCustomer(newCust)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
});

// Update a customer
router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const custUpd = req.body;
    await customersSERV.updateCustomer(id, custUpd)
    res.status(200).send(custUpd)
  } catch (error) {
    res.send(error)
  }
});

// Delete a Customer
router.delete('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      await customersSERV.deleteCustomer(id)
      res.send('DELETED')
    } catch (error) {
      res.send(error)
    }
});

module.exports = router;
