import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductFetch = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [datadata, setDataData] = useState("");

  const getSingle = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/post/postFetchSingle/${id}`
      );
      setTitle(data.fetch.title);
      setContent(data.fetch.content);
      setImage(data.fetch.image.filename);
      setId(data.fetch._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingle();
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("image", image);
    formdata.append("content", content);

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/post/postFetchSingle/${id}`,
      formdata
    );

    setDataData(data);
    console.log(datadata);
  };
  return (
    <div>
      <>
        <div className="row">
          <div className="col-9">
            <form action="POST">
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
              {image ? image.name : "Upload Photo"}
              <input
                type="file"
                required
                className="form-control my-3"
                placeholder="File"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                update
              </button>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductFetch;
