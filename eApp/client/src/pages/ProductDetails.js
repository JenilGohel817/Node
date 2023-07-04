import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.js";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [realproduct, setRealproduct] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.slug) fetchProduct();
  }, [params?.slug]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-single-product/${params.slug}`
      );
      setProduct(data?.product);
      getRealtedProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getRealtedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/realted-product/${pid}/${cid}`
      );
      setRealproduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-md-6">
            <img
              src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="col-md-6">
            <h5>{product?.name}</h5>
            <h5>{product.description}</h5>
            <h5>{product.price}</h5>
            <h5>{product?.category?.name}</h5>
            <button className="btn btn-primary">Add To Card</button>
          </div>
        </div>
        <div className="row">
          <h2>Related Product</h2>
          {realproduct.length < 1 && <>Not Product Found</>}
          {realproduct?.map((p) => (
            <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default ProductDetails;
