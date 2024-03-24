import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "./Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { LuBaggageClaim } from "react-icons/lu";
import { useCart } from "../../context/cart";
import { FaRegCircleUser } from "react-icons/fa6";

function Header() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <div>
      <header style={{ padding: "20px 0px" }}>
        <div className="px-3 py-2 text-bg-white border-bottom">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <NavLink
                to="/"
                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                <div>
                  <h1
                    style={{
                      fontSize: "30px",
                      fontWeight: "bolder",
                      color: "black",
                    }}
                  >
                    Exclusive
                  </h1>
                </div>
              </NavLink>

              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small ul-design">
                <li>
                  <NavLink to="/" className="nav-link text-secondary">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown" style={{ color: "gray" }}>
                  <Link
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "gray" }}
                  >
                    Category
                  </Link>
                  <ul className="dropdown-menu">
                    <Link
                      className="dropdown-item"
                      to={`/categories`}
                      style={{ color: "gray" }}
                    >
                      All Categories
                    </Link>
                    {categories.map((c) => (
                      <>
                        <li>
                          <Link
                            style={{ color: "gray" }}
                            className="dropdown-item"
                            to={`/category/${c.slug}`}
                          >
                            {c.name}
                          </Link>
                        </li>
                      </>
                    ))}
                    <li></li>
                  </ul>
                </li>
                <li style={{ color: "gray" }}>
                  <NavLink
                    to="/about"
                    style={{ color: "gray" }}
                    className="nav-link"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="nav-link "
                    style={{ color: "gray" }}
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/privacy "
                    className="nav-link"
                    style={{ color: "gray" }}
                  >
                    Privacy Policey
                  </NavLink>
                </li>
                <SearchInput />
                <li>
                  <NavLink to="/cart" className="nav-link">
                    <LuBaggageClaim
                      style={{ fontSize: "25px", color: "gray" }}
                      className="fa"
                    />
                    <span
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "3px 8px",
                        position: "absolute",
                        top: "20px",
                        fontSize: "12px",
                      }}
                    >
                      {cart.length}
                    </span>
                  </NavLink>
                </li>

                <div className="text-end">
                  {!auth.user ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-light text-dark me-2"
                      >
                        <NavLink
                          to="/login"
                          style={{
                            color: "red",
                            textDecoration: "none",
                            padding: "0px 10px",
                          }}
                        >
                          Login
                        </NavLink>
                      </button>
                      <button type="button" className="btn btn-danger">
                        <NavLink
                          to="/register"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Register
                        </NavLink>
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        to="#"
                        role="button"
                        aria-expanded="false"
                      >
                        <FaRegCircleUser
                          style={{ fontSize: "25px", color: "red" }}
                        />
                      </NavLink>
                      <ul className="dropdowny" >
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/login"
                            onClick={handleLogout}
                          >
                            logout
                          </NavLink>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
