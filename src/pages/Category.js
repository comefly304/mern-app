import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

const Category = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="bg-dark text-ligth">
      <h1 className="text-center">All categories</h1>
      <div className="categoriesdiv container-fluid categories-list ">
        {categories.map((c) => (
          <div className="categoriesbtn  " key={c._id}>
            <Link to={`/category/${c.slug}`}>
              <button className=" catbtn btn btn-secondary-outline text-light">
                {c.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default Category;
