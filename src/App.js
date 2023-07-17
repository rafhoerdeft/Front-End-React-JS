import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./component/ProductList";
import AddProduct from "./component/AddProduct";
import UpdateProduct from "./component/UpdateProduct";
import Login from "./component/Login";
import Register from "./component/Register";
import { AuthProvider } from "./middleware/AuthProvider";
import { Layout } from "./component/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={
            <Layout>
              <ProductList />
            </Layout>
          } />
          <Route path="/product/add" element={
            <Layout>
              <AddProduct />
            </Layout>
          } />
          <Route path="/product/edit/:id" element={
            <Layout>
              <UpdateProduct />
            </Layout>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
