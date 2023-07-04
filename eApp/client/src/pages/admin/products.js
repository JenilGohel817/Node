import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/adminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, Setproducts] = useState([]);

  const getProduct = async (e) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product`
      );
      Setproducts(data.getProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Layout title={"products"}>
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <div>
              <h2 className="my-5">All Product</h2>
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/products/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
