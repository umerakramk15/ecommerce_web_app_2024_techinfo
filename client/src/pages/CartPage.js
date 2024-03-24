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
          <div className="col-md-12">
            <h1 className="text-center bg-light p2 mb-1">
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart.length > 1
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your cart is Empty"}
            </h4>
          </div>
          <div className="row m-4">
            <div className="col-md-9 card">
              {cart?.map((p) => (
                <>
                  <div className="row p-4">
                    <div className="col-md-4">
                      <img
                        style={{ width: "150px" }}
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                    <div className="col-md-7 p-4 flex align-item-center">
                      <h3>{p.name}</h3>
                      <p>{p.description.substring(0, 50)}...</p>
                      <p>{p.price}</p>
                      <p>{p.category.name}</p>
                    </div>
                    <div className="col-md-1">
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
                </>
              ))}
            </div>
            <div className="col-md-3 text-center p-4">
              <h4>Cart Summary</h4>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {priceCal()}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
