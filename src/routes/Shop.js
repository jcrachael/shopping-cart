import searchIcon from "../assets/search_FILL0_wght400_GRAD0_opsz48.svg";
import ShopItem from "../components/ShopItem";
import "../styles/Shop.css";

import backpack from "../assets/backpack.png";
import phoneCase from "../assets/phonecase.png";

export default function Shop() {
  const items = [
    { id: 0, title: "Backpack", price: "$39.50", img: backpack },
    { id: 1, title: "Phone case", price: "$12.50", img: phoneCase },
  ];

  const list = items.map(function (item) {
    return (
      <ShopItem
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        img={item.img}
      />
    );
  });

  return (
    <div className="Shop">
      <div className="title">
        <h1>Shop</h1>
        <div className="search">
          <input type="text"></input>
          <img src={searchIcon} alt="search" />
        </div>
      </div>

      <div className="item-container">{list}</div>
    </div>
  );
}
