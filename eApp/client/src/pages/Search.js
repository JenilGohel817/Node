import React from "react";
import { SearchAuth } from "./../context/search.js";
import Layout from "../components/layout/Layout.js";

const Search = () => {
  const [values, Setvalues] = SearchAuth();
  return (
    <Layout>
      <h6>
        {values?.results.results.length < 1
          ? "No Product Found"
          : `Found ${values?.results.results.length}`}
      </h6>
      {values?.results.results.map((p) => (
        <div key={p._id}>
          <div className="card m-2">
            <img
              src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description}</p>

              <p className="card-text">${p.price}</p>
              <button>More Detail</button>
              <button>Add TO Cart</button>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Search;
