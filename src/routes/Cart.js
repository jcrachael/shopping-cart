import { Link, useLocation } from "react-router-dom";
import CartItem from "../components/CartItem";
import "../styles/Cart.css";

export default function Cart() {
  const location = useLocation();
  const data = location.state.data;
  const error = location.state.error;
  const loading = location.state.loading;

  // Gets the current the date and stores a JSON and string version
  function getDate() {
    const dateJSON = new Date().toJSON();
    const dateString = dateJSON.slice(0, 10);

    return [dateJSON, dateString];
  }

  // makes a list of products in cart with their quantity
  function getCartProducts() {
    const prods = cart.products.map((product) => {
      return { product: data[product.productId], quantity: product.quantity };
    });
    return prods;
  }

  // Cart
  const date = getDate(); // an array: [dateJSON, dateString]
  const cart = {
    userId: 0,
    date: date[1], // dateJSON is at date[0]; dateString is at date[1]
    products: [
      { productId: 0, quantity: 1 },
      { productId: 1, quantity: 2 },
    ],
  };
  const cartItems = getCartProducts();
  // list of items in cart
  const list = cartItems.map(function (item) {
    return (
      <CartItem
        key={item.product.id}
        id={item.product.id}
        title={item.product.title}
        price={item.product.price}
        img={item.product.image}
        quantity={item.quantity}
      />
    );
  });
  // prices of items in cart
  const prices = cartItems.map(function (item) {
    return item.product.price * item.quantity;
  });
  // total price of all products in cart
  const total = prices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <div className="Cart">
      <div className="title">
        <h1>Cart</h1>
      </div>

      <div className="cart-container">{list}</div>

      <div className="totals">
        <span>{list.length} items</span>
        <span>TOTAL ${total.toFixed(2)}</span>
      </div>

      <div className="checkout">
        <Link
          to="/shopping-cart/"
          state={{ data: data, error: error, loading: loading }}
        >
          <div className="button">
            <span>Checkout</span>
          </div>{" "}
        </Link>
      </div>
    </div>
  );
}
