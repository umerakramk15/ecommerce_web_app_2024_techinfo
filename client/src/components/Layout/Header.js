import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header>
        <div className="px-3 py-2 text-bg-dark border-bottom">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <Link
                to="/"
                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                <div>
                  <h1>LOGO</h1>
                </div>
              </Link>

              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <Link to="/" className="nav-link text-secondary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="nav-link text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="nav-link text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="nav-link text-white">
                    Privacy Policey
                  </Link>
                </li>
                <li>
                  <Link to="/" className="nav-link text-white">
                    Products
                  </Link>
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
              <button type="button" className="btn btn-light text-dark me-2">
                Login
              </button>
              <button type="button" className="btn btn-primary">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
