// This is the root of the App
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Template from "../routes/Template";
import ErrorPage from "../routes/ErrorPage";
import Home from "../routes/Home";
import Shop from "../routes/Shop";
import Cart from "../routes/Cart";

export default function App() {
  // State for Shop and Cart routes
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

  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/shopping-cart/"
        element={<Template />}
        errorElement={<ErrorPage />}
      >
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route
            path="/shopping-cart/shop"
            element={<Shop data={products} error={error} loading={loading} />}
          />
          <Route
            path="/shopping-cart/cart"
            element={<Cart data={products} error={error} loading={loading} />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
