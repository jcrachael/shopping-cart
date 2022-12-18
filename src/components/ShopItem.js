import "../styles/ShopItem.css";

export default function ShopItem({ id, title, price, img }) {
  return (
    <div className="ShopItem" id={`item-` + id}>
      <img src={img} alt={title}></img>
      <span className="caption">
        <h3 className="item-title">{title}</h3>
        <p className="price">${price.toFixed(2)}</p>
      </span>

      <p className="add">Add to cart</p>
    </div>
  );
}
