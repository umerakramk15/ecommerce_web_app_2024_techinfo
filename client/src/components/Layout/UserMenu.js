import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <div className="text-center">
      <div className="list-group">
        <h3>
          <NavLink to="/" className="btn btn-success w-100 p-4">
            Dashboard
          </NavLink>
        </h3>
        <NavLink
          to="/dashboard/user/Profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
}

export default UserMenu;
