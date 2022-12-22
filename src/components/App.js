// App.js
// This is the root component of the app, called App

// React
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
// Routes
import Template from "../routes/Template";
import ErrorPage from "../routes/ErrorPage";
import Home from "../routes/Home";
import Shop from "../routes/Shop";
import Cart from "../routes/Cart";

export default function App() {
  // State for products (data fetched from fakestoreAPI), and loading and error states
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState([]);

  // async function to fetch products from fakestoreAPI
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

  // useEffect to fetch products from fakestoreAPI and store in state as products
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

  // Checks if the productId matches the productId of any item in the cart
  function checkMatch(productId) {
    let productIds = cart.map((item) => {
      return item.productId;
    });
    let match = false;
    for (let i = 0; i < productIds.length; i++) {
      if (productId == productIds[i]) {
        match = true;
      }
    }
    return match;
  }

  // Removes 1 product from the cart and updates the state and cartItems
  function removeProduct(productId) {
    let cartWithQuantityReduced = cart.map((item) => {
      if (item.productId == productId) {
        return { productId: item.productId, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    let updatedCart = cartWithQuantityReduced.filter(
      (item) => item.quantity > 0
    );
    setCart(updatedCart);
  }

  // Adds an item to the Cart
  function addToCart(productId) {
    let match = checkMatch(productId);
    let newCart;
    if (match === true) {
      newCart = cart.map((item) => {
        if (item.productId == productId) {
          return { productId: item.productId, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    } else if (match === false) {
      newCart = [...cart, { productId: parseInt(productId), quantity: 1 }];
    }
    setCart(newCart);
  }

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
            element={
              <Shop
                data={products}
                error={error}
                loading={loading}
                cart={cart}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/shopping-cart/cart"
            element={
              <Cart
                data={products}
                error={error}
                loading={loading}
                cart={cart}
                removeProduct={removeProduct}
              />
            }
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
