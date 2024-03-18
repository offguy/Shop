const mongoose = require("mongoose");

// Export a function that takes a resource name and optional populate parameter
const createRepository = (resource, populateFields = []) => {
  //require the model based on the resource name
  const Model = require(`../models/${resource}Model`);

  // Define the generic repository functions
  const getAll = () => {
    // Conditionally populate fields based on the provided populateFields
    const query = populateFields.length > 0 ? Model.find({}).populate(populateFields) : Model.find({});
    return query.exec();
  };

  
  return {
    getAll
  };
};

//conditional population
const createRepositoryWithPopulation = (resource) => {
  // resources that require population
  const resourcesWithPopulation = ["purchases"];

  // Create repository with or without population based on the resource
  if (resourcesWithPopulation.includes(resource)) {
    const populateFields = [];

    if (resource === "purchases") {
      // Populate the 'customerId' field
      populateFields.push({ path: "customerId", model: "customer" });
      
      // Populate the 'products' field with the required fields from the product collection
      populateFields.push({ 
        path: "products", 
        model: "product", 
        select: "_id name price", 
        populate: { 
          path: "productId", 
          model: "product", 
          select: "_id name price"
        },
        transform: (doc) => ({
          _id: doc.productId,
          name: doc.productId.name,
          price: doc.productId.price,
          quantity: doc.quantity
        })
      });
    }

    return createRepository(resource, populateFields);
  } else {
    return createRepository(resource);
  }
};


module.exports = createRepositoryWithPopulation;
