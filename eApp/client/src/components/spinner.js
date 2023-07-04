import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setcount] = useState(5);
  const navigate = useNavigate();
  const loaction = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setcount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: loaction.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, loaction, path]);

  return (
    <>
      <div>spinner {count}</div>
    </>
  );
};

export default Spinner;
