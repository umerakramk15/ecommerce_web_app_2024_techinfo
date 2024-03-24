import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

function CategoryProduct() {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.slug) getProductByCat();
  }, []);
  return (
    <Layout>
      <div className="container m-3">
        <h1 className="text-center">
          {category.name} -{" "}
          <span className="text-center" style={{ fontSize: "18px" }}>
            {products.length} result found
          </span>
        </h1>
          <div className="d-flex flex-wrap">
            <div className="container">
            {products.map((p) => (
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
                      {p.description.substring(0, 20)}...
                    </p>
                    <p className="card-text">Rs : {p.price}</p>

                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Detail
                    </a>

                    <a
                      className="btn btn-primary m-3"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success(`${p.name} Added to Cart`);
                      }}
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProduct;
