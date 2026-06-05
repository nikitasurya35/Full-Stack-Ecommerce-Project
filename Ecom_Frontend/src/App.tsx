import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Pages/login";
import Home from './Pages/home';
import ProductDetails from './Pages/ProductDetails'
import ImageUploadDashboard from './Pages/imageUploadDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/product/:slug" element={<ProductDetails />} /> 
        <Route path="/uploadImage" element={<ImageUploadDashboard />} />
        {/* :slug is a route parameter that will capture the product slug from the URL */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;