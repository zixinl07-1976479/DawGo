import React from "react";
import NewsLine from "./newsLine";
import Logo from "./logo";
import NavLinks from "./navlinks";

export function Banner() {
  return (
    <div className="row">
      <h1 id="banner">
        Save Money & Save The Earth{" "}
        <img className="icon" src="./img/icons/earth.png" />
      </h1>
    </div>
  );
}

export function NavBar(props) {
  return (
    <div className="container-fluid">
      <div id="navbar" className="row justify-content-between">
        <Logo />
        <NewsLine />
        <NavLinks />
      </div>
    </div>
  );
}
