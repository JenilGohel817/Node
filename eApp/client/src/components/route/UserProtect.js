import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner";
import { UseAuth } from "../../context/auth";

export default function UserRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = UseAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
