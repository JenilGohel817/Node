import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRedux, removeRedux } from "../redux/reduxSlice";
import { Link } from "react-router-dom";

const Details = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const fetchRedux = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/redux/reduxFetch"
      );
      dispatch(getRedux(data?.fetch));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRedux();
  }, []);

  const deleteRedux = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/redux/reduxDelete/${id}`
      );
      dispatch(removeRedux(data));
      fetchRedux();
    } catch (error) {
      console.log(error);
    }
  };

  const thStyle = {
    padding: "0px 15px",
    width: "20%",
  };

  const imageStyle = {
    width: "300px",
    height: "300px",
    borderRadius: "100%",
    objectFit: "cover",
  };

  const tableStyle = {
    padding: "50px",
    fontSize: "18px",
    width: "100%",
    color: "#606164",
  };

  const btnStyle = {
    background: "#202124",
    padding: "25px 50px",
    width: "20%",
    color: "#606164",
    textDecoration: "none",
    borderRadius: "100px",
  };

  const borderStyle = {
    paddingBottom: "60px",
  };

  return (
    <>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={borderStyle}>Image</th>
            <th style={borderStyle}>Name</th>
            <th style={borderStyle}>Email</th>
            <th style={borderStyle}>Edit</th>
            <th style={borderStyle}>Delete</th>
            <th style={borderStyle}>Link</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((e) => (
            <tr style={{ border: "5px solid #fff" }} key={e}>
              <th style={thStyle}>
                <img
                  style={imageStyle}
                  alt={e.name}
                  src={`http://localhost:8080/uploads/${e.photo}`}
                />
              </th>
              <th style={thStyle}>{e.name}</th>
              <th style={thStyle}>{e.email}</th>
              <th style={thStyle}>
                <Link style={btnStyle} id={e.id} to={`${e.id}`}>
                  Edit
                </Link>
              </th>
              <th style={thStyle}>
                <Link
                  style={btnStyle}
                  id={e.id}
                  onClick={() => {
                    deleteRedux(e.id);
                  }}
                >
                  Delete
                </Link>
              </th>
              <th style={thStyle}>
                <Link style={btnStyle} to={`/detailsFull/${e.id}`}>
                  Link
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Details;
