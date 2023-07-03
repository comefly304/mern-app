import React from "react";
import { useSearch } from "../Layout/context/Seacrh";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const SearchForm = () => {
  const [values, setvalues] = useSearch();
  const naviagte = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://e-commerce-app-2023-payment-gateway.onrender.com/api/product/search/${values.keyword}`
      );
      setvalues({ ...values, results: data });
      naviagte("/search");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handlesubmit}>
        <input
          className="form-control me-2 "
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setvalues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-primary search-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
