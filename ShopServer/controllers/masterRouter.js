const express = require('express');
const createService = require('../services/masterService');
const createRepositoryWithPopulation = require('../repositories/masterREP');

const router = express.Router();

// Handle routes without an 'id'
router.use('/:resource', async (req, res, next) => {
  const { resource } = req.params;

  try {
    const repository = createRepositoryWithPopulation(resource)
    const service = createService(repository);

    const result = await handleRequestWithoutId(service, req);
    
    if (!result) {
      throw new Error('No data found');
    }

    res.send(result);
  } catch (error) {
    res.send({ error: error.message });
  }
});



async function handleRequestWithoutId(service, req) {
  try {
        return await service.getAll();
  } catch (error) {
    throw error;
  }
}

module.exports = router;
