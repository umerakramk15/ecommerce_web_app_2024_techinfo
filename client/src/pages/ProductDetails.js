import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useFetcher, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


function ProductDetails() {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const params = useParams();
  // get Products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );

      setProduct(data.product);
      getRelatedProduct();
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product

  const getRelatedProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${product._id}/${product.category._id}`
      );

      setRelatedProduct(data.products);
      console.log(relatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
    
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container row mx-auto mt-2">
        <div className="col-md-6">
          {product ? (
            <>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                style={{ width: "400px" }}
                alt={product.name}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="col-md-6">
          <p>Home / Product / {params.slug}</p>

          {product ? (
            <>
              <h1 className="mb-4">{product.name}</h1>
              <p>{product.description}</p>
              <h1> ${product.price}.00</h1>

              <h4>Category - {product.category.name}</h4>
              <a href="/product/cart" className="btn btn-primary mt-4">
                Add to cart
              </a>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="row conatainer mx-auto">
        <div className="col-md-10 mx-auto">
          <hr />
          <h1>{relatedProduct < 1 && <>No Similar Product</>}</h1>
          <div className="d-flex flex-wrap">
            {relatedProduct.map((p) => (
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
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">Rs : {p.price}</p>

                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Detail
                    </a>

                    <a href="/product/cart" className="btn btn-primary m-3">
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

export default ProductDetails;
