import React, { useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "./Authstyle.css";
import { useAuth } from "../context/authcontex";
import { Header } from "antd/es/layout/layout";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const localtion = useLocation();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-commerce-app-2023-payment-gateway.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        navigate(localtion.state || "/");
        localStorage.setItem("auth", JSON.stringify(res.data));
      }
    } catch (err) {
      toast.error("something went wrong while login");
    }
  };

  return (
    <Layout>
      <div className="registerform  ">
        <h1 className="register-text">Login</h1>
       
        <form onSubmit={handlesubmit} className="card p-3">
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div>
            <NavLink to="/forgot-password">
              <button className="forgot-password-btn btn btn-outline-secondary ">
                Forgot password
              </button>
            </NavLink>
          </div>
          <button type="submit" className="loginbtn btn btn-primary">
            Login
          </button>
          <button onClick={()=>{setemail("user001@gmail.com");setpassword("1234")}} className="mt-2 user-btn btn btn-warning">
           Login as Guest
          </button>
          <button onClick={()=>{setemail("admin@gmail.com");setpassword("1234")}} className="mt-2 admin-btn btn btn-primary">
           Login as Admin
          </button>
          <div className="mt-4 align-items-center text-center">
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              <h4 className="text-success">Create a free account now?</h4>
            </NavLink>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
