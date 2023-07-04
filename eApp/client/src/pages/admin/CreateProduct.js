import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/adminMenu";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/product/create-product`,
        productData
      );

      if (data.success) {
        console.log("product Add");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"CreateProduct"}>
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <form action="POST" onSubmit={handleSubmit}>
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
                  {photo && (
                    <img
                      alt=""
                      width={100}
                      height={100}
                      src={URL.createObjectURL(photo)}
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
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
