import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/header/header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const IndexPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [photo, setPhoto] = useState([]);
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dataFetch, setDataFetch] = useState("");
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
      fromdata.append("password", password);
      fromdata.append("gender", gender);

      const data = await axios.post(
        "http://localhost:8080/userApi/v1/userUpdate",
        fromdata
      );

      if (data) {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingle = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/userApi/v1/userFindOne/${id.id}`
      );

      setDataFetch(data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingle();
    // eslint-disable-next-line
  }, []);

  console.log(dataFetch);

  return (
    <>
      <HeaderComponent />
      <form onSubmit={handleSubmit} className="w25">
        <div className="form-group">
          <input
            type="text"
            value={dataFetch.name}
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
            value={dataFetch.email}
            className="form-control mt-3"
            id="exampleInputEmail1"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <input
            type="password"
            value={dataFetch.password}
            className="form-control mt-3"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
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
            value={dataFetch.number}
            className="form-control mt-3"
            id="Number"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            placeholder="Number"
          />
          <select
            value={dataFetch.gender}
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
