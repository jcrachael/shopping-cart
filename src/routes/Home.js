import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="Home">
      <section className="hero">
        <div className="content">
          <h1>Your one-stop fake shop.</h1>
          <Link to="/shopping-cart/shop">
            <div className="button">
              <span>Shop now</span>
            </div>{" "}
          </Link>
        </div>
        <div className="img"></div>
      </section>
    </div>
  );
}
