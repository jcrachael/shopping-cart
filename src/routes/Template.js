import { Outlet, NavLink } from "react-router-dom";
import "../styles/Template.css";
import logo from "../assets/shop.png";

function Template() {
  return (
    <div className="Template">
      <header>
        <div className="header-left">
          <div className="logo">
            <img src={logo} alt="Shop logo" />
          </div>
          <h2 className="title">E-Commerce App</h2>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Cart
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="Outlet">
        <Outlet />
      </div>

      <footer>
        <p>
          Copyright © Rachael Cole 2022. This project is{" "}
          <a href="https://github.com/jcrachael/shopping-cart/">open source</a>.
        </p>
      </footer>
    </div>
  );
}

export default Template;
