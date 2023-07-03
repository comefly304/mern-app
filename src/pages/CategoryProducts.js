import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../components/Layout/context/cart";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setcart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-app-2023-payment-gateway.onrender.com/api/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container category-page bg-dark">
        <div className="layout-content">
          <h5 className="text-center">{category?.name}</h5>
          <h6 className="text-center">{products?.length} result found </h6>
       
            <div className="">
              <div className="productshomeimgv">
                {products?.map((p) => (
                  <div className="card m-2" key={p._id}>
                    <img
                      src={`https://e-commerce-app-2023-payment-gateway.onrender.com/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </h5>
                      </div>
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price">
                        <button
                          className="btn btn-primary ms-1"
                          onClick={() => navigate(`/productdetails/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="productbtn btn btn-secondary ms-2"
                          onClick={() => {
                            const updatedCart = [...cart, p];
                            setcart(updatedCart);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(updatedCart)
                            );
                            toast.success("item added to cart");
                          }}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    
    </Layout>
  );
};

export default CategoryProduct;
