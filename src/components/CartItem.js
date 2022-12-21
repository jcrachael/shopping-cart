import "../styles/CartItem.css";

export default function CartItem({
  id,
  title,
  price,
  img,
  quantity,
  handleRemoveProduct,
}) {
  return (
    <div className="CartItem" id={id}>
      <img src={img} alt={title}></img>

      <span className="info">
        <h3 className="cart-title">{title}</h3>
        <p className="subtitle" id="quantity">
          Quantity: {quantity}
        </p>
        <p className="subtitle" id="price">
          Price: {`$` + price.toFixed(2)}
        </p>
        <p className="subtitle" id="total">
          Total: {"$" + (quantity * price).toFixed(2)}
        </p>
      </span>
      <span className="links">
        <button type="button" className="remove" onClick={handleRemoveProduct}>
          Remove
        </button>
      </span>
    </div>
  );
}
