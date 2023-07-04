import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const CategoriesData = useCategory();
  return (
    <div>
      <Layout title={"All Cate"}>
        <div className="row">
          {CategoriesData?.map((e) => (
            <div className="col-md-2">
              <div className="card">
                <button key={e._id} className="btn">
                  <Link to={`/category/${e.slug}`}>{e.name}</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Categories;
