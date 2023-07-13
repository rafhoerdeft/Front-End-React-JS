import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./component/ProductList";
import AddProduct from "./component/AddProduct";
import UpdateProduct from "./component/UpdateProduct";
import Login from "./component/Login";
import Register from "./component/Register";
import Navbar from "./component/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={
          <div>
            <Navbar />
            <ProductList />
          </div>
        } />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/edit/:id" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
