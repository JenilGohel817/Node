import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { CartAuth } from "../context/cart";
import { UseAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  const [cart, setCart] = CartAuth();
  const [auth, setAuth] = UseAuth();
  const [clientToken, setclientToken] = useState("");
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
        return total;
      });
      total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/braintree/token`
      );
      setclientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let myIndex = myCart.findIndex((item) => item._id === pid);
      myCart.splice(myIndex, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  const HandlePlayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user-order");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <Layout>
          <h1>{auth?.token && auth?.user?.name}</h1>
          <div>
            {cart?.length > 1
              ? `You Have ${cart.length} item in cart ${
                  auth?.token ? "" : "pleace Login"
                }`
              : "Your Cart Is Empty"}
          </div>
          <div className="row">
            <div className="col-md-9">
              {cart?.map((p) => (
                <div className="row p-5">
                  <div className="col-md-3">
                    <img
                      src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-9">
                    <p>{p.name}</p>
                    <p>{p.description}</p>
                    <p>{p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-3">total : {totalPrice()}</div>
            {auth?.user?.address ? (
              <>
                <h4>{auth?.user?.address}</h4>
                <button onClick={() => navigate("/dashboard/user-profile")}>
                  Update Address
                </button>
              </>
            ) : (
              <>
                {auth?.token ? (
                  <button onClick={() => navigate("/dashboard/user-profile")}>
                    Update Address
                  </button>
                ) : (
                  <button onClick={() => navigate("/login")}>
                    Pleace Login Checkout
                  </button>
                )}
              </>
            )}
            {!clientToken || !cart?.length ? (
              <div>
                <h1>Loading...</h1>
              </div>
            ) : (
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
            )}
            <div>
              <button
                className="btn btn-primary"
                onClick={HandlePlayment}
                disabled={!clientToken || !instance || !auth?.user?.address}
              >
                Make Payment
              </button>
            </div>
          </div>
        </Layout>
      </>
    </div>
  );
};

export default CartPage;
