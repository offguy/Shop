const customersREP = require('../repositories/customersREP')

const getAllCustomers = async () => {
try {
    return await customersREP.getAll()
} catch (error) {
  return error
} 
}

const getById = async (id) => {
  try {
    return await customersREP.getById(id)
  } catch (error) {
    return error
  }
}

const addNewCustomer = async (obj) => {
  try {
      const newCust = obj;
      const res = await customersREP.addNew(newCust)
      return res
    } catch (error) {
        return 'problem in CustomerOBJ'
      }
    }

const updateCustomer = async (id, obj) => {
  try {
    return await customersREP.update(id, obj)
  } catch (error) {
    return 'incorrect ID/CustomerOBJ'
  }
  
}
const  deleteCustomer = async (id) => {
  try {
    return await customersREP.Delete(id)
  } catch (error) {
    return 'incorrect id'
  }
}

module.exports = {
  getAllCustomers,
  getById,
  addNewCustomer,
  updateCustomer,
  deleteCustomer}