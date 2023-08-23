import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";

const UserPage = () => {
  const [products, Setproducts] = useState([]);

  const getProduct = async (e) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/userApi/v1/userFind`
      );
      Setproducts(data?.findUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  style={{ width: 100, height: 100 }}
                  src={"http://localhost:8080/uploads/" + p.photo}
                />
              </td>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.number}</td>
              <td>{p.gender}</td>
              <td>
                <Link to={p._id}>Edit</Link>
              </td>
              <td>
                <Link to={p._id}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserPage;
