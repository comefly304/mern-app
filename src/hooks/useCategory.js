import { useState, useEffect } from "react";
import axios from "axios";

//custom categories hook

export default function useCategory() {
  const [categories, setcategories] = useState([]);

  const getcategories = async () => {
    try {
      const { data } = await axios.get(
        "https://e-commerce-app-2023-payment-gateway.onrender.com/api/category/get-category"
      );
      setcategories(data?.category);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getcategories();
  }, []);
  return categories;
}
