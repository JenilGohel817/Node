import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../context/auth.js";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setanswer] = useState("");
  const [auth, setAuth] = UseAuth([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/forget-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data || res.data.message);
        navigate("/login");
      } else {
        toast.error("user not login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={"Forget"}>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
        <div>
          <form action="POST" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={newPassword}
              required
              onChange={(e) => setnewPassword(e.target.value)}
              placeholder="Password"
            />
            <input
              type="text"
              value={answer}
              required
              onChange={(e) => setanswer(e.target.value)}
              placeholder="answer"
            />
            <button type="submit">Reset</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgetPassword;
