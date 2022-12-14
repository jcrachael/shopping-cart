import { Link } from "react-router-dom";
import backpack from "../assets/backpack.png";
import phoneCase from "../assets/phonecase.png";
import CartItem from "../components/CartItem";
import "../styles/Cart.css";

export default function Cart() {
  const cart = [
    { id: 0, title: "Backpack", price: 39.5, img: backpack, quantity: 1 },
    {
      id: 1,
      title: "Phone case",
      price: 12.5,
      img: phoneCase,
      quantity: 1,
    },
  ];

  const prices = cart.map(function (item) {
    return item.price;
  });

  const initialValue = 0;
  const sumwithInitial = prices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const list = cart.map(function (item) {
    return (
      <CartItem
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        img={item.img}
        quantity={item.quantity}
      />
    );
  });

  return (
    <div className="Cart">
      <div className="title">
        <h1>Cart</h1>
      </div>

      <div className="cart-container">{list}</div>

      <div className="totals">
        <span>{list.length} items</span>
        <span>TOTAL ${sumwithInitial.toFixed(2)}</span>
      </div>

      <div className="checkout">
        <div className="button">
          <Link to="/shopping-cart/">
            <span>Checkout</span>
          </Link>
        </div>{" "}
      </div>
    </div>
  );
}
