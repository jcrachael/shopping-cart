// Custom components
import ShopItem from "../components/ShopItem";
import LoadingSpinner from "../components/LoadingSpinner";
// CSS styles
import "../styles/Shop.css";
// Assets
import Search from "../components/Search";
import NotificationModal from "../components/NotificationModal";
import { useState } from "react";

export default function Shop({
  data,
  error,
  loading,
  addToCart,
  notificationMessage,
  showModal,
  closeModal,
  searchProducts,
  displayProducts,
}) {
  // addToCart event listener
  function handleAddToCart(e) {
    let id = e.target.parentElement.parentElement.id;
    let quantity = parseInt(e.target.getAttribute("datacount"));
    addToCart(id, quantity);
  }

  // get list of products in cart and render as JSX elements
  function getList(data) {
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
          handleAddToCart={handleAddToCart}
        />
      );
    });
    return list;
  }

  // Get the display
  function renderDisplay(arr) {
    if (error) {
      return <div className="error">Error! {error}</div>;
    } else if (loading) {
      return <LoadingSpinner />;
    } else if (arr !== null && arr !== undefined) {
      return getList(arr);
    } else {
      return getList(data);
    }
  }

  return (
    <div className="Shop">
      <NotificationModal
        message={notificationMessage}
        show={showModal}
        closeModal={closeModal}
      />
      <div className="title">
        <h1>Shop</h1>
        <Search searchProducts={searchProducts} />
      </div>

      <div className="item-container">{renderDisplay(displayProducts)}</div>
    </div>
  );
}
