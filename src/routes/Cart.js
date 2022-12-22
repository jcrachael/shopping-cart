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
  emptyCart,
}) {
  // get list of products from the productIds in the cart object
  function getProductList() {
    let list;
    if (data) {
      list = cart.map(function (product) {
        let prod = data.filter((item) => item.id == product.productId);

        return { product: prod, quantity: product.quantity };
      });
    } else {
      list = null;
    }
    return list;
  }
  let cartItems = getProductList();

  // Event listeners
  function handleRemoveProduct(e) {
    const productId = e.target.parentElement.parentElement.id;
    removeProduct(productId);
  }

  // Gets the list of items in JSX and prices and total price
  function getListAndPrices() {
    let list;
    let prices;
    let total;
    if (cartItems) {
      // render a JSX list of the items in cartItems
      list = cartItems.map(function (item, index) {
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
      prices = cartItems.map(function (item) {
        return item.product[0].price * item.quantity;
      });
      // get the total of all the prices
      total = prices.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    } else {
      list = null;
      prices = null;
      total = null;
    }
    return [list, total];
  }
  const zero = 0;
  const listAndPrices = getListAndPrices();
  const list = listAndPrices[0];
  const total = listAndPrices[1];

  // get the total price of all products in cart

  return (
    <div className="Cart">
      <div className="title">
        <h1>Cart</h1>
        <button type="button" id="emptyCartBtn" onClick={emptyCart}>
          Empty cart
        </button>
      </div>

      <div className="cart-container">
        {loading ? <LoadingSpinner /> : list}
      </div>

      <div className="totals">
        <span>{list ? list.length : zero} items</span>
        <span>TOTAL ${total ? total.toFixed(2) : zero.toFixed(2)}</span>
      </div>

      <div className="checkout">
        <Link to="/" state={{ data: data, error: error, loading: loading }}>
          <div className="button">
            <span>Checkout</span>
          </div>{" "}
        </Link>
      </div>
    </div>
  );
}
