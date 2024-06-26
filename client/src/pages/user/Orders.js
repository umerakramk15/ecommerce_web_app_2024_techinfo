import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";

function Orders() {
  const [orders, setOders] = useState([]);
  const [auth, setAuth] = useAuth();
  //get orders

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            {" "}
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products.length}</td>
                        <td>{o?.payment?.params?.transaction?.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="col-md-12">
                      <div className="row m-4">
                        <div className="container row">
                          <div className="col-md-6">Product</div>
                          <div className="col-md-2">Price</div>
                          <div className="col-md-2"></div>
                          <div className="col-md-2">Total</div>
                        </div>
                      </div>
                      {o?.products?.map((p, i) => (
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
                              {o?.products?.category?.name}
                            </div>
                            <div className="col-md-2 d-flex align-items-center">
                              1 Qty
                            </div>
                           
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
