import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductsComp from './pages/products/Products';
import CustomersComp from './pages/customers/Customers';
import PurchasesComp from './pages/purchases/Purchases'; // Import the new component
import EditProductComp from './pages/Edit/EditProduct';
import EditCustomerComp from './pages/Edit/EditCustomer';
import NavComp from './pages/Nav';
import { fetchProducts, fetchCustomers, fetchPurchases } from './requests/api';
import { useEffect } from 'react';
import CartComp from './pages/purchases/Cart';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch products, customers, and purchases and update Redux store
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        const customers = await fetchCustomers();
        const purchases = await fetchPurchases();
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
    <div>
      <h1>SHOP</h1>
      <nav className="nav-container">
        <NavComp />
      </nav>
      <div className="cart-container">
        <CartComp />
      </div>
      <div className="products_customer-container">
        <Routes>
          <Route path='products' element={<ProductsComp />}>
            <Route path='product/:id' element={<EditProductComp />} />
          </Route>
          <Route path='customers' element={<CustomersComp />}>
            <Route path='customer/:id' element={<EditCustomerComp />} />
          </Route>
          <Route path='purchases' element={<PurchasesComp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
