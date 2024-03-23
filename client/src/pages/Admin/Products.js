import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("All Product Page Error");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            {" "}
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All products List</h1>
            <div className="container">
              <div className="d-flex">
                {products.map((p) => (
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
                          <p className="card-text">{p.description}</p>
                          <p className="card-text">Rs : {p.price}</p>
                          <a href="#" className="btn btn-primary">
                          Update Product
                          </a>
                        </div>
                      </div>
                    </>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Products;
