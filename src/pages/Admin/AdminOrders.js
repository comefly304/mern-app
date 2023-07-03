import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../components/Layout/context/authcontex";
import moment from "moment";
import { useCart } from "../../components/Layout/context/cart";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setstatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Arriving",
    "deliverd",
    "cancel",
  ]);
  const [changestatus, setchangestatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cart, setcart] = useCart();

  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://e-commerce-app-2023-payment-gateway.onrender.com/api/auth/all-orders"
      );
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

  //handleupdate order
  const handleupdate = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `https://e-commerce-app-2023-payment-gateway.onrender.com/api/auth/order-status/${orderId}`,
        {
          status: value,
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
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Admin orders</h3>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Products status</th>
                        <th scope="col">Date modified</th>
                        <th scope="col">Dog status</th>
                        <th scope="col">Collectig type </th>
                        <th scope="col">Payment</th>
                        <th scope="col">Total Products</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="col">{i + 1}</td>
                        <td scope="col">{o?.buyer?.name}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleupdate(o._id, value)}
                            value={o?.status}
                          >
                            {status?.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.dogstatus}</td>
                        <td>{o?.ordertype}</td>
                        <td scope="col">
                          {o?.payment.success
                            ? `Successful`
                            : ` Failed | ${!o?.payment.success ? `COD` : ``}`}
                        </td>

                        <td scope="col">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
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

export default AdminOrders;
