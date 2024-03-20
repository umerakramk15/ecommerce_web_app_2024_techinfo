import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import PageNotFound from "./pages/PageNotFound";
import Resgister from "./pages/Auth/Resgister";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Layout/Routes/Private";

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
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />}></Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
