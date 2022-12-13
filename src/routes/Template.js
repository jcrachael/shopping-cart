import { Outlet, NavLink } from "react-router-dom";
import "../styles/Template.css";

function Template() {
  return (
    <div className="Template">
      <header>
        <h1>E-Commerce App</h1>
      </header>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/shopping-cart/"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shopping-cart/shop"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="Outlet">
        <Outlet />
      </div>

      <footer>
        <p>
          Copyright © Rachael Cole 2022. This project is{" "}
          <a href="https://jcrachael.github.io/shopping-cart/">open source</a>.
        </p>
      </footer>
    </div>
  );
}

export default Template;
