import ProductsComp from './products/Products';
import CustomersComp from './customers/Customers';
import PurchasesComp from './purchases/Purchases';
import CartComp from './purchases/Cart';
import EditProductComp from './Edit/EditProduct';
import EditCustomerComp from './Edit/EditCustomer';
import NavComp from './Nav';
import { fetchProducts, fetchCustomers, fetchPurchases } from '../requests/shopAPI';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function HomeComp({ authorazation }) {
    const dispatch = useDispatch();
    const {accessToken, _id} = authorazation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchProducts(accessToken)
                const customers = await fetchCustomers(accessToken);
                const purchases = await fetchPurchases(accessToken);
            
                dispatch({ type: 'INITIALIZE_DATA', payload: { products, customers, purchases, _id } });
            } catch (error) {
              'Error fetching initial data:', error;
            }
        };

        fetchData();
    }, []);

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
                        <Route path='/products/*' element={<ProductsComp />} >
                            <Route path='product/:id' element={<EditProductComp />} />
                        </Route>
                        <Route path='/customers/*' element={<CustomersComp />} >
                            <Route path='customer/:id' element={<EditCustomerComp />} />
                        </Route>
                        <Route path='/purchases' element={<PurchasesComp />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default HomeComp;
