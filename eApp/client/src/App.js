import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import NotFound from "./pages/404";
import Reg from "./pages/reg";
import Login from "./pages/login";
import Dashboard from "./pages/user/dashboard";
import UserRoute from "./components/route/UserProtect";
import ForgetPassword from "./pages/forget";
import AdminRoute from "./components/route/adminProtect";
import Admin from "./pages/admin/adminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import User from "./pages/admin/User";
import Order from "./pages/user/Order";
import ProfileDA from "./pages/user/profile";
import Products from "./pages/admin/products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/categoryDetails";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart  " element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryDetails />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user-order" element={<Order />} />
          <Route path="user-Profile" element={<ProfileDA />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Admin />} />
          <Route path="admin-category" element={<CreateCategory />} />
          <Route path="products" element={<Products />} />
          <Route path="admin-user" element={<User />} />
          <Route path="admin-product" element={<CreateProduct />} />
          <Route path="products/:slug" element={<UpdateProduct />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
