import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Pages/login";
import Home from './Pages/home';
import ProductDetails from './Pages/ProductDetails'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/product" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;