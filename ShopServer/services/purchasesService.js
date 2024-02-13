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
    return error
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
        console.error(`Error updating product: ${error}`);
      }
    }
    
    const res = await purchasesREP.addNew(obj);
    return res;
  } catch (error) {
    console.error(`Problem with adding purchase: ${error}`);
    return 'problem in PurchaseOBJ';
  }
};

const updatePurchase = async (id, obj) => {
  try {
    return await purchasesREP.update(id, obj)
  } catch (error) {
    return 'incorrect ID/PurchaseOBJ'
  }
  
}
const  DeletePurchase = async (id) => {
  try {
    return await purchasesREP.Delete(id)
  } catch (error) {
    return 'incorrect id'
  }
}

module.exports = {
  getAllPurchases,
  getById,
  addNewPurchase,
  updatePurchase,
  DeletePurchase}