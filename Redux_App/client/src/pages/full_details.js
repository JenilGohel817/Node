import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullDetails = () => {
  const btnStyle = {
    background: "#202124",
    padding: "25px 50px",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "100px",
    fontSize: "18px",
    outline: "none",
    border: "none",
    margin: "0 25px",
    marginBottom: "35px",
  };

  const boxStyle = {
    background: "#202124",
    width: "450px",
    margin: "0 auto",
    textAlign: "center",
    marginBottom: "30px",
    height: "590px",
    padding: "40px",
    border: "5px solid #fff",
    borderRadius: "10%",
  };

  const mainBox = {
    height: "100vh",
    width: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 auto",
  };

  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

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

  return (
    <>
      <div style={mainBox}>
        <div style={boxStyle}>
          <h3 style={{ color: "#fff", fontSize: "48px", margin: 0 }}>{name}</h3>
          <h4 style={{ color: "#fff", fontSize: "24px" }}>{email}</h4>
          <img
            src={`http://localhost:8080/uploads/${photo}`}
            style={{
              height: 450,
              width: 450,
              borderRadius: "10%",
              objectFit: "cover",
            }}
          />
        </div>
        <Link to={"/details"} style={btnStyle}>
          Back To Details
        </Link>
      </div>
    </>
  );
};

export default FullDetails;
