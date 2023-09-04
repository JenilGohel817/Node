import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function UserUpdate() {
  const [username, setUsername] = useState("");
  const [id, setid] = useState("");
  const userId = useParams();
  const navigate = useNavigate();

  const userSingle = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/spinApi/v1/userSingle/${userId.id}`
      );
      setUsername(data?.user?.username);
      setid(data?.user?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userSingle();
    // eslint-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: username,
      };
      const { data } = await axios.put(
        `http://localhost:8080/spinApi/v1/userUpdate/${id}`,
        userData
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="MainForm">
        <form className="posRel" method="POST" onSubmit={handleUpdate}>
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
              <span className="txt-a">Update User</span>
              <span className="txt-b">Submit</span>
            </span>
          </button>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default UserUpdate;
