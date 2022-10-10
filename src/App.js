import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/LoginPage/Login"
import Register from "./Pages/RegisterPage/Register"
import Product from "./Pages/ProductsPage/porducts"

import SideBar from './SideBar/Sidebar';


function App() {

  return (
    <div className="app">
      <SideBar></SideBar>
      <Routes basename="https://assignment-api.piton.com.tr/api/v1/product">
        <Route path="https://assignment-api.piton.com.tr/api/v1/user/login" element={<Login />} />
        <Route path="https://assignment-api.piton.com.tr/api/v1/user/register" element={<Register />} />
        <Route path="https://assignment-api.piton.com.tr/api/v1/product/all" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
