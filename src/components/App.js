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
  // State for products (data fetched from fakestoreAPI), and loading and
  // error states
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState([]);
  // notification dialog message
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(products);

  // close the modal
  function closeModal() {
    setNotificationMessage("");
    setShowModal(false);
  }

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

  // Search products

  function searchProducts(q) {
    if (q !== null) {
      const filteredData = products.filter((item) => {
        if (item.title.toLowerCase().includes(q.toLowerCase())) {
          return true;
        } else if (item.category.toLowerCase().includes(q.toLowerCase())) {
          return true;
        }
        return false;
      });

      setDisplayProducts(filteredData);
      return;
    }
    setDisplayProducts(products);
    return;
  }

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
    let product = products.filter((item) => item.id == productId);

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
    setNotificationMessage(`1 ${product[0].title} removed from cart`);
    setShowModal(true);
  }

  // Remove all products of one type from cart
  function removeAllProducts(id) {
    const productId = parseInt(id);
    let product = products.filter((item) => item.id === productId);
    let newCart = cart.filter((item) => {
      if (item.productId === productId) {
        return false;
      }
      return true;
    });
    setNotificationMessage(`All ${product[0].title} removed from cart`);
    setShowModal(true);
    setCart(newCart);
  }

  // Adds an item to the Cart
  function addToCart(productId, productQuantity) {
    let product = products.filter((item) => item.id == productId);
    let match = checkMatch(productId);
    let quantity = parseInt(productQuantity);
    let newCart;
    if (match === true) {
      newCart = cart.map((item) => {
        if (item.productId == productId) {
          return {
            productId: item.productId,
            quantity: item.quantity + quantity,
          };
        } else {
          return item;
        }
      });
    } else if (match === false) {
      newCart = [
        ...cart,
        { productId: parseInt(productId), quantity: quantity },
      ];
    }
    setCart(newCart);
    setNotificationMessage(`${quantity} ${product[0].title} added to cart`);
    setShowModal(true);
  }

  // Empty the cart
  function emptyCart() {
    if (cart.length > 0) {
      setNotificationMessage(`Cart emptied`);
      setShowModal(true);
    }
    setCart([]);
  }

  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Template cart={cart} />}
        errorElement={<ErrorPage />}
      >
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route
            path="/shop"
            element={
              <Shop
                data={products}
                error={error}
                loading={loading}
                cart={cart}
                addToCart={addToCart}
                notificationMessage={notificationMessage}
                showModal={showModal}
                closeModal={closeModal}
                searchProducts={searchProducts}
                displayProducts={displayProducts}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                data={products}
                error={error}
                loading={loading}
                cart={cart}
                removeProduct={removeProduct}
                emptyCart={emptyCart}
                notificationMessage={notificationMessage}
                showModal={showModal}
                closeModal={closeModal}
                removeAllProducts={removeAllProducts}
              />
            }
          />
        </Route>
      </Route>
    ),
    {
      basename: "/shopping-cart",
    }
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
