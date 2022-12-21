// This is the root of the App
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
  // State for Shop and Cart routes
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Initialise a cart object
  const initCart = [
    { productId: 1, quantity: 1 },
    { productId: 4, quantity: 2 },
  ];
  const [cart, setCart] = useState(initCart);

  // Cart items
  function getProductListFromCart() {
    if (products) {
      // get list of products from the productIds in the cart object
      const cartItems = cart.map(function (product) {
        let prod = products.filter((item) => item.id == product.productId);

        return { product: prod, quantity: product.quantity };
      });
      return cartItems;
    }
  }
  let cartItems = getProductListFromCart();

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

  // Fetch products from fakestoreAPI
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

  // removes 1 product from the cart
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
    cartItems = getProductListFromCart();
    setCart(updatedCart);
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
                cartItems={cartItems}
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
