import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import PageNotFound from "./pages/PageNotFound";
import Resgister from "./pages/Auth/Resgister";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import PrivateRoute from "./components/Layout/Routes/Private";
import AdminPrivate from "./components/Layout/Routes/AdminPrivate";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<Resgister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />}></Route>
          <Route path="user/profile" element={<Profile />}></Route>
          <Route path="user/orders" element={<Orders />}></Route>
        </Route>
        <Route path="/dashboard" element={<AdminPrivate />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route
            path="admin/create-category"
            element={<CreateCategory />}
          ></Route>
          <Route
            path="admin/create-product"
            element={<CreateProduct />}
          ></Route>
          <Route path="admin/users" element={<Users />}></Route>
          <Route path="admin/products" element={<Products />}></Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
