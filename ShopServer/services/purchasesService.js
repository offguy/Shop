const purchasesREP = require('../repositories/purchasesREP')
const productsREP = require('../repositories/productsREP')

const getAllPurchases = async () => {
try {
    return await purchasesREP.getAll()
} catch (error) {
  return error
} 
}

const getById = async (id) => {
  try {
    return await purchasesREP.getById(id)
  } catch (error) {
    return 'incorrect id: ' + error
  }
}

const addNewPurchase = async (obj) => {
  const { products } = obj;
  console.log(products);
  try {
    for (const prod of products) {
      try {
        const { productId, quantity } = prod;
        await productsREP.update(productId, { $inc: { quantity: -quantity } });
      } catch (error) {
      `Error updating product: ${error}`
      }
    }
    
    const res = await purchasesREP.addNew(obj);
    return res;
  } catch (error) {
    return 'problem in PurchaseOBJ: ' + error;
  }
};

const updatePurchase = async (id, obj) => {
  try {
    return await purchasesREP.update(id, obj)
  } catch (error) {
    return 'incorrect ID/PurchaseOBJ: ' + error
  }
  
}
const  deletePurchase = async (id) => {
  try {
    return await purchasesREP.Delete(id)
  } catch (error) {
    return 'incorrect id: ' + error
  }
}

module.exports = {
  getAllPurchases,
  getById,
  addNewPurchase,
  updatePurchase,
  deletePurchase}