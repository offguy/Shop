import LoginComponent from './pages/auth/Login';
import RegisterComponent from './pages/auth/Register';
import './App.css';
import HomeComp from './pages/home';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
function App() {
  const [accessToken, setAccessToken] = useState();
  console.log(accessToken);

  const getToken = (token) => {
    setAccessToken(token);
  };

  return (
    <div>
      <div className="products_customer-container">
        <Routes>
          {/* Always render the register route */}
          <Route path="/" element={<RegisterComponent />} />
          {/* Render the login route only if accessToken is not set */}
          {!accessToken && <Route path="/login" element={<LoginComponent getToken={getToken} />} />}
        </Routes>
        {/* Render the home route only if accessToken is set */}
        {accessToken && (
          <Routes>
            <Route path="home/*" element={<HomeComp accessToken={accessToken} />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
