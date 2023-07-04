import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/adminMenu";

const User = () => {
  return (
    <>
      <Layout title={"User"}>
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <div className="card w-50 p-3">All User</div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default User;
