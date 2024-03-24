import React from "react";
import Layout from "./components/Layout/Layout";
import { useSearch } from "./context/search";
import { Link } from "react-router-dom";
import { useAuth } from "./context/auth";
function Search() {
  const [values, setValues] = useSearch();
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values?.results.length < 1
              ? "No Result Found"
              : `${values.results.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values.results.map((p) => (
              <Link
                to={`/dashboard/admin/product/${p.slug}`}
                key={p._id}
                className=" product-link"
              >
                <>
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 20)}
                      </p>
                      <p className="card-text">Rs : {p.quantity}</p>
                      {auth.user.role === 1 ? (
                        <>
                          <a href="#" className="btn btn-primary">
                            Update Product
                          </a>
                        </>
                      ) : (
                        <>
                          <a href="#" className="btn btn-primary m-3">
                            Add to Cart
                          </a>

                          <a href="#" className="btn btn-primary m-3">
                            More Detail
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
