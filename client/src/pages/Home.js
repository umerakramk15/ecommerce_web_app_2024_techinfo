import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Layout/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // getTotal
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by categories
  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }

    setChecked(all);
  };
  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // load more
  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);
  const loadmore = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // get all cat

  const getAllCategory = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked, radio]);

  useEffect(() => {
    getAllCategory();
    getTotal();
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered Product

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );

      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className=" row mt-2">
          <div className="col-md-2">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column p-3">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center">Filter By Price</h4>
            <div className="d-flex flex-column p-3">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products </h1>
            <div className="d-flex flex-wrap">
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
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "loading...." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
