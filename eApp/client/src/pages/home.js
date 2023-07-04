import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.js";
import { UseAuth } from "../context/auth.js";
import axios from "axios";
import { Badge, Checkbox, Radio } from "antd";
import { price } from "../components/prices.js";
import { useNavigate } from "react-router-dom";
import { CartAuth } from "../context/cart.js";
import { toast } from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = CartAuth();
  const [auth, setAuth] = UseAuth();
  const [categories, setCategories] = useState([]);
  const [products, Setproducts] = useState([]);
  const [checked, Setchecked] = useState([]);
  const [radio, Setradio] = useState([]);
  const [total, Settotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoding] = useState(false);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/category/get-all`
      );

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    getTotal();
  }, []);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-count`
      );
      Settotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    Setchecked(all);
  };
  const getProduct = async (e) => {
    setLoding(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-list`
      );
      setLoding(false);
      Setproducts(data.product);
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getProduct();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/product/product-filters`,
        { checked, radio }
      );
      Setproducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Product"}>
      <div className="row">
        <div className="col-md-3">
          <button onClick={() => window.location.reload()}>Reload</button>
          <div>
            Filter By Category
            {categories?.map((c) => (
              <div key={c._id}>
                <Checkbox
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <div className="">
            Filter By price
            <Radio.Group onChange={(e) => Setradio(e.target.value)}>
              {price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>

        <div className="col-md-9">
          <div>
            <h2 className="my-5">All Product</h2>
            {products?.map((p) => (
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
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added In Cart");
                      }}
                    >
                      Add TO Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {products && products.length < total && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "loading..." : "load More"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
