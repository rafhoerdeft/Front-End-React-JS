import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./component/ProductList";
import AddProduct from "./component/AddProduct";
import UpdateProduct from "./component/UpdateProduct";
import Login from "./component/Login";
import Register from "./component/Register";
import Navbar from "./component/Navbar";
import { AuthProvider } from "./middleware/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={
            <div>
              <Navbar />
              <ProductList />
            </div>
          } />
          <Route path="/product/add" element={
            <div>
              <Navbar />
              <AddProduct />
            </div>
          } />
          <Route path="/product/edit/:id" element={
            <div>
              <Navbar />
              <UpdateProduct />
            </div>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
