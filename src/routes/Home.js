import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const location = useLocation();
  const data = location.state.data;
  const error = location.state.error;
  const loading = location.state.loading;

  return (
    <div className="Home">
      <section className="hero">
        <div className="content">
          <h1>Your one-stop fake shop.</h1>
          <Link
            to="/shopping-cart/shop"
            state={{ data: data, error: error, loading: loading }}
          >
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
