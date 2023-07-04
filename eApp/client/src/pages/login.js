import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { UseAuth } from "../context/auth.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = UseAuth([]);
  const navigate = useNavigate();
  const loaction = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data || res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(loaction.state || "/");
      } else {
        toast.error("user not login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={"login"}>
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
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="submit"
              onClick={() => {
                navigate("/forgetPassword");
              }}
            >
              forgetPassword
            </button>
            <button type="submit">login</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
