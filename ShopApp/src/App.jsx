import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginComponent from './pages/auth/Login';
import RegisterComponent from './pages/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomeComp from './pages/home';

function App() {
  const [authorazation, setAuthorazation] = useState({
    accessToken: '',
    _id: '',
    role: ''
  });

  const getAuth = (token, _id, role) => {
    // Save tokens in state
    setAuthorazation({ _id, accessToken: token, role });

    // Save tokens in cookies
    Cookies.set('accessToken', token);
    Cookies.set('_id', _id);
    Cookies.set('role', role);
  };

  useEffect(() => {
    // Check for tokens in cookies
    const accessToken = Cookies.get('accessToken');
    const _id = Cookies.get('_id');
    const role = Cookies.get('role');

    if (accessToken) {
      setAuthorazation({ accessToken, _id, role });
    }
  }, []);

  return (
    <div>
      <div className="products_customer-container">
        <Routes>
          {/* Always render the register route */}
          <Route path="/" element={<RegisterComponent />} />
          {/* Render the login route only if accessToken is not set */}
          {!authorazation.accessToken && <Route path="/login" element={<LoginComponent getAuth={getAuth} />} />}
        </Routes>
        {/* Render the home route only if accessToken is set */}
        {authorazation.accessToken && (
          <Routes>
            <Route path="home/*" element={<HomeComp authorazation={authorazation} />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
