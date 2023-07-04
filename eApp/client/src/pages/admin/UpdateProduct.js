import { Layout, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "../../components/adminMenu";
import { Option } from "antd/es/mentions";
const UpdateProduct = () => {
  const params = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const getSingle = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-single-product/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setCategory(data.product.category);
      setPhoto(data.product.photo);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingle();
    //eslint-disable-next-line
  }, []);

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
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    let ans = window.prompt("Are You Sure To Delete This Item");

    if (!ans) return;
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/product/delete-product/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/product/update-product/${id}`,
        productData
      );

      if (data.success) {
        console.log("product Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={"Update Product"}>
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <form action="POST">
              <input
                type="text"
                required
                className="form-control my-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                required
                className="form-control my-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
              />
              <input
                type="text"
                required
                className="form-control my-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="price"
              />
              <Select
                bordered={false}
                placeholder="Select Category"
                showSearch
                size="large"
                className="form-select"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category.name}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <input
                type="text"
                className="form-control my-3"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="quantity"
              />
              <div>
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  className="form-control my-3"
                  required
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  placeholder="file"
                />
                <div>
                  {photo ? (
                    <img
                      alt=""
                      width={100}
                      height={100}
                      src={URL.createObjectURL(photo)}
                    />
                  ) : (
                    <img
                      alt=""
                      width={100}
                      height={100}
                      src={`${process.env.REACT_APP_API}/api/product/product-photo/${id}`}
                    />
                  )}
                </div>
              </div>
              <Select
                bordered={false}
                placeholder="Select Shipping"
                showSearch
                className="form-select"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleDelete}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
