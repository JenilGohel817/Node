import React from "react";
import { UseAuth } from "../../context/auth";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/adminMenu";

const Admin = () => {
  const [auth, setAuth] = UseAuth();

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <div className="card w-50 p-3">
              <h6>Name = {auth?.user?.name}</h6>
              <h6>Email = {auth?.user?.email}</h6>
              <h6>Phone = {auth?.user?.phone}</h6>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Admin;
