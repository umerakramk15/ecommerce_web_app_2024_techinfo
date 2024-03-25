import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
function AdminOrders() {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delevered",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useAuth();
  const [orders, setOders] = useState([]);

  //get orders

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth//all-status/${orderId}`,
        { status: value }
      );
      getOrders();
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
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
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
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleStatus(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
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

export default AdminOrders;
