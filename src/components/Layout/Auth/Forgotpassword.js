import React, { useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/authcontex";

const Forgotpassword = () => {
  const [email, setemail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setanswer] = useState("");

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-commerce-app-2023-payment-gateway.onrender.com/api/auth/forgot-password",
        {
          email,
          answer,
          newPassword,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error("something went wrong while changing password");
    }
  };

  return (
    <Layout>
      <div className="registerform  ">
        <h1>Forgot password</h1>
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
              type="text"
              value={answer}
              onChange={(e) => setanswer(e.target.value)}
              className="form-control"
              placeholder="Whats ur favourite food?"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              className="form-control"
              placeholder="New password"
            />
          </div>
          <div className="text-center">
              <NavLink to="/login">
                <button className="forgot-password-btn btn btn-outline-secondary ">BACK</button>
              </NavLink>
            </div>
            <button type="submit" className="loginbtn btn btn-primary mt-2">
              SUBMIT
            </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgotpassword;
