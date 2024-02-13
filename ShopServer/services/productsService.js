const productsREP = require('../repositories/productsREP')

const getAllProducts = async () => {
try {
    const res = await productsREP.getAll()
    return res
} catch (error) {
  return error
} 
}

const getById = async (id) => {
  try {
    return await productsREP.getById(id)
  } catch (error) {
    return error
  }
}

const addNewProduct = async (obj) => {
  try {
        const newProd = obj;
        const res = await productsREP.addNew(newProd)
      return res
    } catch (error) {
        return 'problem in productOBJ'
      }
    }

const updateProduct = async (id, obj) => {
  try {
    return await productsREP.update(id, obj)
  } catch (error) {
    return 'incorrect ID/productOBJ'
  }
  
}
const  deleteProduct = async (id) => {
  try {
    return await productsREP.Delete(id)
  } catch (error) {
    return 'incorrect id'
  }
}

module.exports = {
  getAllProducts,
  getById,
  addNewProduct,
  updateProduct,
  deleteProduct}