import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="Home">
      <section className="hero">
        <div className="col">
          <h1>Your one-stop fake shop.</h1>
          <Link to="/shopping-cart/shop">
            <button type="button">Shop now</button>{" "}
          </Link>
        </div>

        <img src={heroImg} alt="Product" className="hero-img col" />
      </section>
    </div>
  );
}
