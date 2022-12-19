// Custom components
import ShopItem from "../components/ShopItem";
// CSS styles
import "../styles/Shop.css";
// Assets
import searchIcon from "../assets/search.svg";
import { useLocation } from "react-router-dom";

export default function Shop() {
  const location = useLocation();
  const data = location.state.data;
  const error = location.state.error;
  const loading = location.state.loading;

  console.log(data);

  // get list
  function getList() {
    const list = Object.values(data).map(function (item) {
      return (
        <ShopItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          img={item.image}
          description={item.description}
          category={item.category}
        />
      );
    });
    return list;
  }

  // Error display
  function renderDisplay() {
    if (error) {
      return errorNotif;
    } else if (loading) {
      return loadingNotif;
    } else {
      return getList();
    }
  }

  // Simple mini components of the page
  const search = (
    <div className="search">
      <input type="text"></input>
      <img src={searchIcon} alt="search" />
    </div>
  );
  const errorNotif = <div className="error">Error! {error}</div>;
  const loadingNotif = <div className="loading">Loading...</div>;

  return (
    <div className="Shop">
      <div className="title">
        <h1>Shop</h1>
      </div>

      <div className="item-container">{renderDisplay()}</div>
    </div>
  );
}
