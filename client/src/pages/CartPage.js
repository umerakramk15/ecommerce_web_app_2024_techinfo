import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      console.log(myCart.category.name);
    } catch (error) {
      console.log(error);
    }
  };
  // total price
  const priceCal = () => {
    let total = 0;
    cart?.map((item) => (total = total + item.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <p style={{ color: "gray" }}>
            Home / <span style={{ color: "black" }}>Cart</span>
          </p>
          <div className="col-md-12" style={{ padding: "80px 0px" }}>
            <div className="col-md-12">
              <div className="row m-4">
                <div className="container row">
                  <div className="col-md-6">Product</div>
                  <div className="col-md-2">Price</div>
                  <div className="col-md-2">Category</div>
                  <div className="col-md-2">Total</div>
                </div>
              </div>
              {cart?.map((p) => (
                <div className="row m-4" key={p._id}>
                  <div className="container row">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <img
                          style={{ width: "80px" }}
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                        <p className="mx-3 my-2 d-flex align-items-center">
                          {p.name}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-center">
                      ${p.price}
                    </div>
                    <div className="col-md-2 d-flex align-items-center">
                      {p.category.name}
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                      1 Qty
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                      <MdCancel
                        style={{
                          background: "red",
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "25px",
                        }}
                        onClick={() => removeCartItem(p._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row" style={{ padding: "50px 0px" }}>
              <div className="col-md-6 text-center p-4">
                <div className="d-flex align-items-center">
                  <input type="text" style={{ height: "40px" }} />
                  <button className="btn btn-outline-danger m-3 py-2 px-4">
                    Apply Coupons
                  </button>
                </div>
              </div>
              <div
                className="col-md-6 px-4 py-4"
                style={{ border: "1px solid black" }}
              >
                <h4 className="mb-4">Cart Total</h4>
                <div className="d-flex align-items-center pt-4 justify-content-between">
                  <p>Subtotal</p>
                  <p>{priceCal()}</p>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="d-flex align-items-center pt-4 justify-content-between">
                  <p>Subtotal</p>
                  <p>{priceCal()}</p>
                </div>
                <div className="text-center">
                  {auth?.user?.address ? (
                    <div className="mb-3">
                      <h4>Current Address</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className="btn btn-outline-warning px-4 py-2"
                        onClick={() => navigate("/dashboard/user/Profile")}
                      >
                        Process to Checkout
                      </button>
                    </div>
                  ) : (
                    <div className="mb-3">
                      {auth?.token ? (
                        <button
                          className="btn btn-outline-warning px-4 py-2"
                          onClick={() => navigate("/dashboard/user/Profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-danger px-4 py-2"
                          onClick={() => navigate("/login", { state: "/cart" })}
                        >
                          Login to Checkout
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
