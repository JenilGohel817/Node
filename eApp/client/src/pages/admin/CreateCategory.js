import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/adminMenu";
import axios from "axios";
import CategoryForm from "../../components/form/categoryForm.js";
import { Modal } from "antd";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, SetUpdateName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/category/create-category`,
        {
          name,
        }
      );

      if (data?.success) {
        console.log(data);
        getCategory();
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/category/get-all`
      );

      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/category/update-category/${selected._id}`,
        { name: updateName }
      );

      if (data.success) {
        setSelected(null);
        SetUpdateName("");
        setVisible(false);
        getCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/category/delete-category/${pid}`
      );

      if (data.success) {
        getCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <Layout title={"CreateCategory"}>
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {category?.map((c) => (
                  <Fragment key={c._id}>
                    <tr>
                      <td value={c._id}>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() => {
                            setVisible(true);
                            SetUpdateName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Dalete
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updateName}
              setValue={SetUpdateName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
