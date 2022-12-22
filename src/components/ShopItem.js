import "../styles/ShopItem.css";
import AddToCart from "./AddToCart";
import { useState } from "react";

export default function ShopItem({
  id,
  title,
  price,
  img,
  // description,
  // category,
  handleAddToCart,
}) {
  // Counter for item quantities
  const [counter, setCounter] = useState(1);

  function incrementCounter() {
    let newCounter = parseInt(counter) + 1;
    setCounter(newCounter);
  }

  function decrementCounter() {
    let newCounter = parseInt(counter) - 1;
    if (newCounter < 1) {
      newCounter = 1;
    }
    setCounter(newCounter);
  }

  function handleCounterChange(e) {
    setCounter(e.target.value);
  }

  function handleClick(e) {
    handleAddToCart(e);
    setCounter(1);
  }

  return (
    <div className="ShopItem" id={id}>
      <img src={img} alt={title}></img>

      <span className="caption">
        <h3 className="item-title">{title}</h3>
        <p className="price">${price.toFixed(2)}</p>
      </span>

      <AddToCart
        handleAddToCart={handleClick}
        counter={counter}
        incrementCounter={incrementCounter}
        decrementCounter={decrementCounter}
        handleCounterChange={handleCounterChange}
      />
    </div>
  );
}
