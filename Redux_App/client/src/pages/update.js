import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
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

  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const navigate = useNavigate();

  const fetchRedux = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/redux/reduxUpdate/${id}`
      );

      setName(data.user.name);
      setEmail(data.user.email);
      setPhoto(data.user.photo);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRedux();
  }, []);
  const dispatch = useDispatch();

  const handlePhoto = (e) => {
    e.preventDefault();
    setNewPhoto(e.target.files[0]);
    console.log("============================>", e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("photo", newPhoto);
      const data = await axios.put(
        `http://localhost:8080/redux/reduxUpdate/${id}`,
        formData
      );

      navigate("/details");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        style={fromStyle}
        onSubmit={handleUpdate}
        encType="multipart/form-data"
      >
        <input
          style={input}
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
        />
        <input
          style={input}
          placeholder="Enter Email"
          value={email}
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
        <img
          src={`http://localhost:8080/uploads/${photo}`}
          style={{ maxHeight: 100 }}
        />
        <input style={btnStyle} type="submit" value="update" />
        <Link style={btnStyle} to={"/details"}>
          Back To Details Page
        </Link>
      </form>
    </>
  );
};

export default Update;
