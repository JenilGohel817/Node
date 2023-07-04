import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/category/get-all`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategory;
