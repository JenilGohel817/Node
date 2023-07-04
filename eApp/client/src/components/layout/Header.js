import React from "react";
import { Link, NavLink } from "react-router-dom";
import { UseAuth } from "../../context/auth";
import { toast } from "react-toastify";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { CartAuth } from "../../context/cart";
import { Avatar, Badge } from "antd";
const Header = () => {
  const [auth, setAuth] = UseAuth();
  const [cart] = CartAuth();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout !");
  };

  return (
    <>
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <SearchInput />
        </li>
        <li>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </li>
        <li className="nav-item">
          <Badge count={cart?.length} showZero>
            <NavLink to="/cart" className="nav-link">
              <Avatar shape="square" size="large" />
            </NavLink>
          </Badge>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            categories
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to={`/categories`}>
                All categories
              </Link>
            </li>
            {categories?.map((e) => (
              <Link className="dropdown-item" to={`/category/${e.slug}`}>
                {e.name}
              </Link>
            ))}
          </ul>
        </li>
        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                style={{ border: "none" }}
              >
                {auth?.user?.name}
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Header;
