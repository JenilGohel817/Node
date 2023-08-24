import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/header/header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [newphoto, setNewPhoto] = useState(null);
  const [gender, setGender] = useState("");
  const id = useParams();

  const navigate = useNavigate();

  const handleFile = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fromdata = new FormData();
      fromdata.append("name", name);
      fromdata.append("email", email);
      fromdata.append("number", number);
      fromdata.append("photo", newphoto);
      fromdata.append("gender", gender);

      console.log(id);

      const data = await axios.put(
        `http://localhost:8080/userApi/v1/userUpdate/${id.id}`,
        fromdata
      );

      console.log(data);

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

      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setGender(data?.user?.gender);
      setNumber(data?.user?.number);
      setPhoto(data?.user?.photo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingle();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeaderComponent />
      <form onSubmit={handleSubmit} className="w25">
        <div className="form-group">
          <input
            type="text"
            value={name}
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
            value={email}
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
          <div>
            <img
              style={{ height: 100, width: 100 }}
              src={"http://localhost:8080/uploads/" + photo}
              alt="Data"
            />
          </div>
          <input
            type="number"
            value={number}
            className="form-control mt-3"
            id="Number"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            placeholder="Number"
          />
          <select
            value={gender}
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

export default UpdatePage;
