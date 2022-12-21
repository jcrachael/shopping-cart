import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/Cart.css";

export default function Cart({
  data,
  error,
  loading,
  cart,
  removeProduct,
  cartItems,
}) {
  // Event listeners
  function handleRemoveProduct(e) {
    const productId = e.target.parentElement.parentElement.id;
    removeProduct(productId);
  }

  // Cart

  // render a JSX list of the items in cartItems
  const list = cartItems.map(function (item, index) {
    return (
      <CartItem
        key={index}
        id={item.product[0].id}
        title={item.product[0].title}
        price={item.product[0].price}
        img={item.product[0].image}
        quantity={item.quantity}
        handleRemoveProduct={handleRemoveProduct}
      />
    );
  });

  // get a list of the prices of items in cart
  const prices = cartItems.map(function (item) {
    return item.product[0].price * item.quantity;
  });

  // get the total price of all products in cart
  const total = prices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <div className="Cart">
      <div className="title">
        <h1>Cart</h1>
      </div>

      <div className="cart-container">
        {loading ? <LoadingSpinner /> : list}
      </div>

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
