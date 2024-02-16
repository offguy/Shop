import ProductsComp from './products/Products';
import CustomersComp from './customers/Customers';
import PurchasesComp from './purchases/Purchases';
import CartComp from './purchases/Cart';
import EditProductComp from './Edit/EditProduct';
import EditCustomerComp from './Edit/EditCustomer';
import NavComp from './Nav';
import { fetchProducts, fetchCustomers, fetchPurchases } from '../requests/shopAPI';
import { useDispatch, useSelector } from 'react-redux';

import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

function HomeComp({accessToken}) {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
          try {
            

            console.log(accessToken)
            const products = await fetchProducts(accessToken)
            const customers = await fetchCustomers(accessToken);
            const purchases = await fetchPurchases(accessToken);
            console.log(products);
            console.log(customers);
            console.log(purchases);
            dispatch({ type: 'INITIALIZE_DATA', payload: { products, customers, purchases } });
          } catch (error) {
            console.error('Error fetching initial data:', error);
          }
        };
    
        fetchData();
      }, [dispatch]);
    
  
    return (
      <>
        <div>
                    <h1>SHOP</h1>
          <nav className="nav-container">
            <NavComp />
          </nav>
          <div className="cart-container">
        <CartComp accessToken={accessToken} />
      </div>
          <div className="products_customer-container">
            <Routes>
              <Route path='/products' element={<ProductsComp />}>
                <Route path='home/products/product/:id' element={<EditProductComp />} />
              </Route>
              <Route path='/customers' element={<CustomersComp />}>
                <Route path='home/customers/customer/:id' element={<EditCustomerComp />} />
              </Route>
              <Route path='/purchases' element={<PurchasesComp />} />
            </Routes>
          </div>
          </div>

      </>
    )
  }
  
  export default HomeComp