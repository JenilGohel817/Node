import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [fetchPost, SetfetchPost] = useState([]);

  const onChangePicture = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("content", content);
      productData.append("image", image);

      const { data } = await axios.post(
        `http://localhost:8080/api/v1/post/postCreate`,
        productData
      );

      if (data.success) {
        console.log("product Add");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/post/postDelete/${id}`
      );
      fetchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetch = async (id) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/post/postFetchSingle/${id}`
    );
    setTitle(data.fetch.title);
    setContent(data.fetch.content);
    setImage(data.fetch.image);
  };

  const fetchData = async (e) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/post/postFetch`
      );

      SetfetchPost(data?.find);
    } catch (error) {
      console.log(error);
    }
  };
  const handleupdate = async (id) => {
    try {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("content", content);
      productData.append("image", image);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/post/postUpdate/${id}`,
        productData
      );
      fetchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const imageCss = {
    witdh: 100,
    height: 100,
  };

  return (
    <>
      <div className="row">
        <div className="col-9">
          <form
            action="POST"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              required
              className="form-control my-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="text"
              required
              className="form-control my-3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
            />
            <input
              type="file"
              required
              className="form-control my-3"
              onChange={onChangePicture}
              placeholder="File"
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
      <div style={{ margin: "25px", border: "1px solid" }}>
        {fetchPost.length > 0 && (
          <ul>
            {fetchPost.map((user) => (
              <ul key={user._id}>
                <li>{user.title}</li>
                <li>{user.content}</li>
                <li>
                  <img
                    alt={user.title}
                    style={imageCss}
                    src={`http://localhost:8080/api/v1/post/post-photo/${user._id}`}
                  />
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      handleFetch(user._id);
                    }}
                  >
                    fetch
                  </button>
                  <button
                    onClick={() => {
                      handleupdate(user._id);
                    }}
                  >
                    update
                  </button>
                </li>
                <li>
                  <span>
                    <Link to={`/postFetchSingle/${user._id}`}>
                      Link {user.title}
                    </Link>
                  </span>
                </li>
              </ul>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CreateProduct;
