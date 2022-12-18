import { useState, useEffect } from "react";
// Custom components
import ShopItem from "../components/ShopItem";
// CSS styles
import "../styles/Shop.css";
// Assets
import searchIcon from "../assets/search_FILL0_wght400_GRAD0_opsz48.svg";

export default function Shop() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Get products

  async function fetchProducts() {
    let url = "https://fakestoreapi.com/products?limit=10";
    const response = await fetch(url);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

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
