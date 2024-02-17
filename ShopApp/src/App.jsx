import LoginComponent from './pages/auth/Login';
import RegisterComponent from './pages/auth/Register';
import './App.css';
import HomeComp from './pages/home';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
function App() {
  const [authorazation, setAuthorazation] = useState({
    accessToken : '',
    _id: ''
  });

  const getAuth = (token, _id) => {
    setAuthorazation({_id, accessToken: token});
  };

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
