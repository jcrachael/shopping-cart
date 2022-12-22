import "../styles/AddToCart.css";

export default function AddToCart({
  handleAddToCart,
  counter,
  incrementCounter,
  decrementCounter,
}) {
  return (
    <div className="AddToCart">
      <div className="counter-container">
        <button type="button" className="minus" onClick={decrementCounter}>
          -
        </button>

        <div className="counter" id="counter">
          {counter}
        </div>

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
