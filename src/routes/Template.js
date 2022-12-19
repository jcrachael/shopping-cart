import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../styles/Template.css";
import logo from "../assets/shop.png";

function Template() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Get products

  async function fetchProducts() {
    let url = "https://fakestoreapi.com/products?limit=10";
    const response = await fetch(url);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

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
                to="/shopping-cart/"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                state={{ data: products, error: error, loading: loading }}
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
                state={{ data: products, error: error, loading: loading }}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shopping-cart/cart"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                state={{ data: products, error: error, loading: loading }}
              >
                Cart
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="Outlet">
        <Outlet products={products} error={error} loading={loading} />
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
