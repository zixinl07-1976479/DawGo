import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div id="logo" className="col col-4 col-lg-3">
      <Link className="navbar-brand" to="/home">
        <img
          src="../img/shopping-cart.png"
          width="30"
          height="30"
          className="d-inline-block"
          alt="DawGo Logo"
        />
        DawGo
      </Link>
    </div>
  );
}
