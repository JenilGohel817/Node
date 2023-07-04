import React from "react";
import Layout from "../../components/layout/Layout.js";
import UserMenu from "../../components/UserMenu";
import { UseAuth } from "../../context/auth.js";

const Dashboard = () => {
  const [auth, setAuth] = UseAuth();

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-3">
            <UserMenu />
          </div>
          <div className="col-9">
            <div className="card w-50 p-3">{auth?.user?.name}</div>
            <div className="card w-50 p-3">{auth?.user?.role}</div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
