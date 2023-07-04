import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/UserMenu";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProfileDA = () => {
  const [auth, setAuth] = UseAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { name, email, password, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
    setPassword(password);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/userProfile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        setAuth({ ...auth, user: data?.update });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.update;
        localStorage.setItem("auth", JSON.stringify(ls));
        navigate("");
        alert("Updated");
      } else {
        toast.error("user not register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Order"}>
        <div className="row">
          <div className="col-3">
            <UserMenu />
          </div>
          <div className="col-9">
            <div className="card w-50 p-3">
              <form action="POST" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  disabled
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProfileDA;
