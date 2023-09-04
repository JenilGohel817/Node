import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function UserAdd() {
  const [username, setUsername] = useState("");
  const [apiUser, setapiUser] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataUser = {
        username: username,
      };
      const { data } = await axios.post(
        `http://localhost:8080/spinApi/v1/userAdd`,
        dataUser
      );
      if (data.success) {
        console.log("User Add");
        fetch();
        navigate("/");
      }
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetch = async () => {
    try {
      const data = await axios.get("http://localhost:8080/spinApi/v1/userFind");
      setapiUser(data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/spinApi/v1/userDelete/${id}`
      );
      fetch(data);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="MainForm">
        <form className="posRel" method="POST" onSubmit={handleSubmit}>
          <input
            className="inputTag"
            required
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-abs pos-rel">
            <span className="btn-inr">
              <span className="txt-a">Add User</span>
              <span className="txt-b">Submit</span>
            </span>
          </button>
        </form>
        <div className="Table-Field">
          <table className="tab-wtd-cen">
            <thead>
              <tr>
                <th className="tab-wtd wtd-title">User List</th>
                <th className="tab-wtd wtd-title">Edit</th>
                <th className="tab-wtd wtd-title">Delete</th>
              </tr>
            </thead>
            <tbody>
              {apiUser?.map((e, index) => (
                <>
                  <tr key={e._id}>
                    <td className="tab-wtd">
                      {index} - {e.username}
                    </td>
                    <td className="tab-wtd">
                      <button className="Edit-Update-Button">
                        <Link to={`/update/${e._id}`}>Edit</Link>
                      </button>
                    </td>
                    <td className="tab-wtd">
                      <button
                        className="Edit-Update-Button"
                        onClick={() => {
                          handleDelete(e._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default UserAdd;
