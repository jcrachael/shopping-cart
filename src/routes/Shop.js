// Custom components
import ShopItem from "../components/ShopItem";
import LoadingSpinner from "../components/LoadingSpinner";
// CSS styles
import "../styles/Shop.css";
// Assets
import searchIcon from "../assets/search.svg";
import NotificationModal from "../components/NotificationModal";

export default function Shop({
  data,
  error,
  loading,
  addToCart,
  notificationMessage,
  showModal,
  closeModal,
}) {
  // addToCart event listener
  function handleAddToCart(e) {
    let id = e.target.parentElement.parentElement.id;
    let quantity = parseInt(e.target.getAttribute("datacount"));
    addToCart(id, quantity);
  }

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
          handleAddToCart={handleAddToCart}
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
      return <LoadingSpinner />;
    } else {
      return getList();
    }
  }

  // Simple mini components of the page

  // const search = (
  //   <div className="search">
  //     <input type="text"></input>
  //     <img src={searchIcon} alt="search" />
  //   </div>
  // );
  const errorNotif = <div className="error">Error! {error}</div>;

  return (
    <div className="Shop">
      <NotificationModal
        message={notificationMessage}
        show={showModal}
        closeModal={closeModal}
      />
      <div className="title">
        <h1>Shop</h1>
      </div>

      <div className="item-container">{renderDisplay()}</div>
    </div>
  );
}
