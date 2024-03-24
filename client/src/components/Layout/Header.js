import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "./Form/SearchInput";

function Header() {
  const [auth, setAuth] = useAuth();
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
      <header>
        <div className="px-3 py-2 text-bg-dark border-bottom">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <NavLink
                to="/"
                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                <div>
                  <h1>LOGO</h1>
                </div>
              </NavLink>

              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <SearchInput/>
                <li>
                  <NavLink to="/" className="nav-link text-secondary">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="nav-link text-white">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="nav-link text-white">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy" className="nav-link text-white">
                    Privacy Policey
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="nav-link text-white">
                    Products
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="px-3 py-2 border-bottom mb-3">
          <div className="container d-flex flex-wrap justify-content-center">
            <form
              className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto"
              role="search"
            >
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="text-end">
              {!auth.user ? (
                <>
                  <button
                    type="button"
                    className="btn btn-light text-dark me-2"
                  >
                    <NavLink to="/login">Login</NavLink>
                  </button>
                  <button type="button" className="btn btn-danger">
                    <NavLink to="/register">Register</NavLink>
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
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
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
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
