import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useCart } from "../components/Layout/context/cart";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setcart] = useCart();

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-app-2023-payment-gateway.onrender.com/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getrelatedporducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getrelatedporducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-app-2023-payment-gateway.onrender.com/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid-product-page">
        <div className="row">
          <div className="col-md-3 ">
            <h4 className="card bg-light text-center">{product.name}</h4>

            <img
              src={`https://e-commerce-app-2023-payment-gateway.onrender.com/api/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="col-md-9 text-success text-center">
            <h4>Product details</h4>
            <div className="card  text-light bg-dark ">
              <h4>Name: {product.name}</h4>
              <h4>Description: {product.description}</h4>
              <h4>Price : {product.price}/- only</h4>
              <h4>Current Quantity present: {product.quantity}</h4>
              <h4>Category: {product.category?.name}</h4>
              <h4>Shipping Availability : {product.shipping ? "YES" : "NO"}</h4>
              <div>
                <button
                  className="btn btn-success w-20 text-light mb-3 px-3"
                  onClick={() => {
                    const updatedCart = [...cart, product];
                    setcart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    toast.success("item added to cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center similar-products">
        {relatedProducts.length < 1 ? (
          <div className="text-center">
            <p> No related products found</p>
            <hr></hr>
            <div className="text-center">
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <button className="btn btn-outline-secondary mb-5">BACK</button>
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center ">
              <h4>{relatedProducts.length} similar products found</h4>
              <div className="text-center ">
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <button className="btn btn-outline-secondary mb-5">
                    BACK
                  </button>
                </NavLink>
              </div>
            </div>
          </>
        )}

        {relatedProducts.map((p) => (
          <div
            className="cardetails text-center card m-2 bg-dark text-light "
            style={{ width: "18rem" }}
          >
            <img
              src={`https://e-commerce-app-2023-payment-gateway.onrender.com/api/product/product-photo/${p._id}`}
              className="homeimgtag card-img-top homeimg"
              alt={p.name}
            />
            <div className="card-body">
              <p className="card-title">{p.name}</p>
              <p className="card-text">{p.description.substring(0, 40)}...</p>
              <p className="tex-dark">
                {p.price.toLocaleString("en-Us", {
                  style: "currency",
                  currency: "INR",
                })}
                /-
              </p>

              <button
                className="productbtn btn btn-primary ms-2"
                onClick={() => navigate(`/productdetails/${p.slug}`)}
              >
                More info
              </button>
              <button
                className="productbtn btn btn-success ms-2"
                onClick={() => {
                  setcart([...cart, p]);
                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                  toast.success("item added to cart");
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
