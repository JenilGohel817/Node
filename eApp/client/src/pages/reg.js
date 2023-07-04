import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Reg = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error("user not register");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Register"}>
      <div>
        <form action="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
          />
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <button type="submit">register</button>
        </form>
      </div>
    </Layout>
  );
};

export default Reg;
