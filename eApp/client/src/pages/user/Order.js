import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/UserMenu";
import moment from "moment";

import axios from "axios";
import { UseAuth } from "../../context/auth";

const Order = () => {
  const [orders, serorders] = useState([]);
  const [auth, setAuth] = UseAuth();

  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/orders`
      );
      serorders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  return (
    <>
      <Layout title={"Order"}>
        <div className="row">
          <div className="col-3">
            <UserMenu />
          </div>
          <div className="col-9">
            <div className="card w-50 p-3">
              {orders?.map((o, i) => {
                return (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Order</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Falied"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Order;
