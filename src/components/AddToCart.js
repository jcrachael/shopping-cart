import "../styles/AddToCart.css";

export default function AddToCart({
  handleAddToCart,
  counter,
  incrementCounter,
  decrementCounter,
  handleCounterChange,
}) {
  return (
    <div className="AddToCart">
      <div className="counter-container">
        <button type="button" className="minus" onClick={decrementCounter}>
          -
        </button>

        <input
          type="number"
          value={counter}
          id="counter"
          onChange={handleCounterChange}
          min="1"
        ></input>

        <button type="button" className="plus" onClick={incrementCounter}>
          +
        </button>
      </div>
      <button
        type="button"
        className="add"
        onClick={handleAddToCart}
        datacount={counter}
      >
        Add to cart
      </button>
    </div>
  );
}
