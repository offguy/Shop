
const initState = {
  products: [],
  customers: [],
  purchases: [],
  cart: {
    custId: "",
    date: new Date().toLocaleDateString(),
    prods: null
  },
};


const storeState = (state = initState, action) => {
  switch (action.type) {
    case 'INITIALIZE_DATA':
      const { products, customers, purchases, _id } = action.payload;
      const productsWithStatus = (products || []).map(product => ({ ...product, status: 'UNCHANGED' }));
      const customersWithStatus = (customers || []).map(customer => ({ ...customer, status: 'UNCHANGED' }));
      const purchasesWithStatus = (purchases || []).map(purchase => ({ ...purchase, status: 'UNCHANGED' }));
      const cart = {...state.cart}
      return {
        ...state,
        products: productsWithStatus,
        customers: customersWithStatus,
        purchases: purchasesWithStatus,
        cart: {...cart, custId : _id}
      };

    case 'ADDPROD':
      const data = action.payload;
      const cartProd = { ...data, quantity: parseInt(data.quantity) };
      let updatedCartProds;
      //adding product to cart.prods
      if (state.cart.prods !== null) {
        const cartProdIndex = state.cart.prods.findIndex(prod => prod._id === cartProd._id);
        if (cartProdIndex !== -1) {
          const updatedProds = [...state.cart.prods];
          updatedProds[cartProdIndex].quantity += cartProd.quantity;
          updatedCartProds = updatedProds;
        } else {
          updatedCartProds = [...state.cart.prods, cartProd];
        }
      } else updatedCartProds = [cartProd];
      // decresing quantity in products
      const decProdList = [...state.products];
      const decProduct = decProdList.findIndex(prod => prod._id === cartProd._id);
      if (decProduct !== -1) {
        decProdList[decProduct].quantity -= cartProd.quantity;
        return { ...state, products: decProdList, cart: { ...state.cart, prods: updatedCartProds } };
      }

    
    case 'UPDATEPROD':
      const productData = action.payload;
      const updateCart = state.cart.prods? [...state.cart.prods] : null;
      const updateProducts = [...state.products];
      const prodsUpdateIndex = updateProducts.findIndex(prod => prod._id === productData._id);

      if (updateCart) {
          const cartUpdateIndex = updateCart.findIndex(prod => prod._id === productData._id);
        //updating cart.prods
          if (cartUpdateIndex !== -1) {
            const cartProd = updateCart[cartUpdateIndex];
            updateCart[cartUpdateIndex] = { ...productData, quantity: cartProd.quantity, status: 'UPDATED' };
          }
      }
      //updating products
      if (prodsUpdateIndex !== -1) {
        updateProducts[prodsUpdateIndex] = { ...productData, status: 'UPDATED' };
      }
     
      return { ...state, cart: { ...state.cart, prods: updateCart }, products: updateProducts };

    case 'DELETEPROD':
      const prodid = action.payload._id;
      //check for product in cart and delete if finds
      const delCart = state.cart.prods ? [...state.cart.prods] : null;
      if (delCart && delCart.length !== 0) {
        const delindex = delCart.findIndex(prod => prod._id === prodid);
        if (delindex !== -1) {
          delCart.splice(delindex, 1);
        }
      }
      //"delete" product from products
      const delproducts = [...state.products];
      const prodindex = delproducts.findIndex(prod => prod._id === prodid);
      if (prodindex !== -1) {
        delproducts[prodindex].status = 'DELETED';
      }

      return { ...state, products: delproducts, cart: { ...state.cart, prods: delCart } };

    case 'REMOVEPROD':
      const removeId = action.payload._id;
      const amount = action.payload.quantity;
      const prodsReset = [...state.products];
      const removeCartProds = [...state.cart.prods];
      const resetIndex = prodsReset.findIndex(prod => prod._id === removeId);
      const removeIndex = removeCartProds.findIndex(prod => prod._id === removeId);
      //remove from cart
      removeCartProds.splice(removeIndex, 1);
      //update the product.quantity in products
      prodsReset[resetIndex].quantity += amount;
      return { ...state, products: prodsReset, cart: { ...state.cart, prods: removeCartProds } };

    case 'UPDATECUST':
        const customerData = action.payload;
      
        const updateCustomers = [...state.customers];
        const custUpdateIndex = updateCustomers.findIndex(cust => cust._id === customerData._id);
        if (custUpdateIndex !== -1) {
          updateCustomers[custUpdateIndex] = { ...customerData, status: 'UPDATED' };
        }
        return { ...state, customers: updateCustomers };
        
    case 'DELETECUST':
        const id = action.payload._id;

        const delCusts = [...state.customers];
        const custIndex = delCusts.findIndex(cust => cust._id === id);
        if (custIndex !== -1) {
          delCusts[custIndex].status = 'DELETED';
        }
      return { ...state, customers: delCusts };

      case 'RESET_CART':
        return {...state, cart: {
          custId: '65bbcf5b51222f8847b4a82a',
          date: new Date().toLocaleDateString(),
          prods: null
        }}

   

    default:
      return {...state};
  }
};

export default storeState;
