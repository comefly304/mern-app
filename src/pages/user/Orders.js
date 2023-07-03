import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import toast from "react-hot-toast";
import { useAuth } from "../../components/Layout/context/authcontex";
import axios from "axios";
import moment from "moment";
import { useCart } from "../../components/Layout/context/cart";
import { Select } from "antd";
const { Option } = Select;

const Orders = () => {
  const [dogstatus, setdogstatus] = useState(["Yes", "No"]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart, setcart] = useCart();
  const [ordertype, setordertype] = useState([
    "Wait For me to collect the order",
    "Keep the order near my door step",
    "Call me when u arrive",
    "Call me before 10 minutes of arriving",
  ]);

  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-app-2023-payment-gateway.onrender.com/api/auth/orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while getting the orders");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  //handle update dog info
  const handleupdate = async (orderId, dogvalue) => {
    try {
      const { data } = await axios.put(
        `https://e-commerce-app-2023-payment-gateway.onrender.com/api/auth/order-dog-status/${orderId}`,
        {
          dogstatus: dogvalue,
        }
      );
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  //ordertype update
  const handleordertypeupdate = async (orderId, ordertypevalue) => {
    try {
      const { data } = await axios.put(
        `https://e-commerce-app-2023-payment-gateway.onrender.com/api/auth/order-type-status/${orderId}`,
        {
          ordertype: ordertypevalue,
        }
      );
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h5 className="text-center">
              Total products present in cart : {cart?.length}
            </h5>

            <h5 className="text-center">All orders</h5>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="order-table table text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>

                        <th scope="col">Products status</th>
                        <th scope="col">Date modified</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Dog?</th>
                        <th scope="col">Collecting type</th>
                        <th scope="col">Total Products</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="col">{i + 1}</td>
                        <td scope="col">{o?.buyer?.name}</td>

                        <td scope="col">{o?.status}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td scope="col">
                          {o?.payment.success
                            ? (<>
                            <h6 className="text-center text-success mt-1">Successful</h6>
                            </>)
                            : (<>
                            <h6 className="text-center text-warning mt-1">Failed</h6>
                            </>)}
                        </td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleupdate(o._id, value)}
                            value={o?.dogstatus}
                          >
                            {dogstatus?.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) =>
                              handleordertypeupdate(o._id, value)
                            }
                            value={o?.ordertype}
                          >
                            {ordertype?.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td scope="col">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h7> Order ID : {o?._id}</h7>
                  <div className="container ">
                    {o?.products?.map((p, i) => (
                      <div
                        className="row mb-2 p-3 card flex-row imgcontainer"
                        key={p._id}
                      >
                        <div className="col-md-4">
                          <img
                            src={`https://e-commerce-app-2023-payment-gateway.onrender.com/api/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>
                            Rs{" "}
                            {p.price.toLocaleString("en-Us", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
