import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h1 className="footer-heading">DawGo</h1>
            <p>
              DawGo App functions as a software application that is designed for
              UW students to buy or sell items in a convenient, safe, and
              inexpensive way. By requiring students to create accounts using
              their UW email addresses, we can build a secure marketplace in
              which students know who they are trading with.
            </p>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-menu">
              <h1 className="footer-heading">Navigation</h1>
              <ul>
                <li>
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/personal">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/savedItems">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/support">
                    Help
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/post">
                    Post Items
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-menu">
              <h1 className="footer-heading">Categories</h1>
              <ul>
                <li>
                  <Link to="/home">Furniture</Link>
                </li>
                <li>
                  <Link to="/home">Beauty</Link>
                </li>
                <li>
                  <Link to="/home">
                    <nobr>Pet Supplies</nobr>
                  </Link>
                </li>
                <li>
                  <Link to="/home">Books</Link>
                </li>
                <li>
                  <Link to="/home">Electronics</Link>
                </li>
                <li>
                  <Link to="/home">Fashion</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="footer-sub">
              <h1 className="footer-heading">Subscribe</h1>
              <p>Subscribe to DawGo to receive notifications on new items</p>
              <div className="sub-form">
                <form action="#">
                  <label htmlFor="email">Email:</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    placeholder="Type your email"
                  />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="copyright">
                <p>&copy; 2022 DawGo. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
