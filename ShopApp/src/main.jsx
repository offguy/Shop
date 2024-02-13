import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  reducer  from './redux/rootReducer.jsx';
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  
)
