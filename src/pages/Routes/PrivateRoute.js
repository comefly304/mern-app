import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../components/Layout/context/authcontex";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();


  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("https://e-commerce-app-2023-payment-gateway.onrender.com/api/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
   
  return ok ? <Outlet/> : <Spinner/>
}

