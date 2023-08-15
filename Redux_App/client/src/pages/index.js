import React, { useState } from "react";
import axios from "axios";
import { addRedux } from "../redux/reduxSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const input = {
    width: "70%",
    background: "transparent",
    border: "1px solid #606164",
    padding: "25px",
    fontSize: "18px",
    outline: "none",
    marginBottom: "35px",
    borderRadius: "100px",
  };

  const btnStyle = {
    background: "#202124",
    padding: "25px 50px",
    color: "#606164",
    textDecoration: "none",
    borderRadius: "100px",
    fontSize: "18px",
    outline: "none",
    border: "none",
    margin: "0 25px",
    marginBottom: "35px",
  };

  const fromStyle = {
    fontSize: "18px",
    width: "70%",
    textAlign: "center",
    margin: "0 auto",
    padding: "100px 20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("photo", photo);

    const post = await axios.post(
      "http://localhost:8080/redux/reduxCreate",
      formData
    );
    
    dispatch(addRedux(post));
    navigate("/details");
  };

  return (
    <>
      <form
        style={fromStyle}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          style={input}
          placeholder="Enter Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
        />
        <input
          style={input}
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
        />
        <input
          style={input}
          placeholder="Upload Image"
          onChange={handlePhoto}
          type="file"
        />
        <input style={btnStyle} type="submit" value="Submit" />
        <Link to={"/details"} style={btnStyle}>
          Details Page
        </Link>
      </form>
    </>
  );
};

export default Index;
