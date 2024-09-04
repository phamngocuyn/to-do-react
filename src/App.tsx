import './App.css';
import { Routes, Route } from 'react-router-dom';
import Products from './pages/product';
import DetailProduct from './pages/product/detail-product';
// import Home from './pages/app';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />}></Route> */}
      <Route path="/" element={<Products />}></Route>
      <Route path="/product/:productId" element={<DetailProduct />}></Route>
    </Routes>
  );
}

export default App;
