import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin-category"
          className="list-group-item list-group-item-action "
          aria-current="true"
        >
          Ceate Categoy
        </NavLink>

        <NavLink
          className="list-group-item list-group-item-action"
          to="/dashboard/admin"
        >
          admin
        </NavLink>

        <NavLink
          to="/dashboard/admin-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
