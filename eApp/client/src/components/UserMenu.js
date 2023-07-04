import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/user-profile"
          className="list-group-item list-group-item-action "
          aria-current="true"
        >
          profile
        </NavLink>

        <NavLink
          to="/dashboard/user-order"
          className="list-group-item list-group-item-action"
        >
          order
        </NavLink>
      </div>
    </>
  );
};

export default UserMenu;
