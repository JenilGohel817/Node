import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/header/header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const IndexPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [photo, setPhoto] = useState([]);
  const [gender, setGender] = useState("");
  const id = useParams();

  const navigate = useNavigate();

  const handleFile = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fromdata = new FormData();
      fromdata.append("name", name);
      fromdata.append("email", email);
      fromdata.append("number", number);
      fromdata.append("photo", photo);
      fromdata.append("gender", gender);

      const data = await axios.post(
        "http://localhost:8080/userApi/v1/userCreate",
        fromdata
      );

      if (data) {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderComponent />
      <form onSubmit={handleSubmit} className="w25">
        <div className="form-group">
          <input
            type="text"
            className="form-control mt-3"
            id="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            aria-describedby="Name"
            placeholder="Enter Name"
          />
          <input
            type="email"
            className="form-control mt-3"
            id="exampleInputEmail1"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <input
            type="file"
            className="form-control mt-3"
            id="photo"
            onChange={handleFile}
            placeholder="photo"
          />
          <input
            type="number"
            className="form-control mt-3"
            id="Number"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            placeholder="Number"
          />
          <select
            className="form-control mt-3"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Other"}>Other</option>
          </select>
        </div>
        <button type="submit" className="btn  btn-primary mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default IndexPage;
