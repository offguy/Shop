const express = require('express');
const purchasesSERV = require('../services/purchasesService');

const router = express.Router();

// Entry point: http://localhost:3000/purchases

//Get all Purchases
router.get('/', async (req, res) => {
   try {
    const purchases = await purchasesSERV.getAllPurchases()
    res.send(purchases)
   } catch (error) {
    res.send(error)
   } 
});

// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const purchase = await purchasesSERV.getById(id)
    res.send(purchase)
  } catch (error) {
    res.send(error)
  }
});

// Add a new Purchase
router.post('/', async (req, res) => {
  try {
    const newPurch = req.body
    const response = await purchasesSERV.addNewPurchase(newPurch)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
});

// Update a Purchase
router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const purchUpd = req.body;
    await purchasesSERV.updatePurchase(id, purchUpd)
    res.status(200).send(purchUpd)
  } catch (error) {
    res.send(error)
  }
});

// Delete a Purchase
router.delete('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      await purchasesSERV.deletePurchase(id)
      res.send('DELETED')
    } catch (error) {
      res.send(error)
    }
});

module.exports = router;
