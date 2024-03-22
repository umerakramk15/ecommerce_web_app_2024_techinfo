import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

function Products() {
  const [product, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );

      console.log(data.products);
      toast.success("Product Fetched");
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
            <h1>All products</h1>
            <button className="btn btn-primary" onClick={getAllProducts}>
              {" "}
              GET ALL PRODUCTS
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Products;
