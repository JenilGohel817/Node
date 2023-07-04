import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, SetPorduct] = useState([]);
  const [category, Setcategory] = useState([]);

  const getCate = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-category/${params.slug}`
      );
      SetPorduct(data?.product);
      Setcategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getCate();
  }, [params?.slug]);

  return (
    <>
      <Layout>
        <div>category - {category?.name}</div>
        <div>{product?.length} Found</div>
        {product?.map((p) => (
          <div key={p._id}>
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>

                <p className="card-text">${p.price}</p>
                <button onClick={() => navigate(`/product/${p.slug}`)}>
                  More Detail
                </button>
                <button>Add TO Cart</button>
              </div>
            </div>
          </div>
        ))}
      </Layout>
    </>
  );
};

export default CategoryDetails;
