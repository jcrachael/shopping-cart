import { Form } from "react-router-dom";
import "../styles/Search.css";

export default function Search({ q, searchProducts, updateSearchValue }) {
  return (
    <div className="search">
      <Form id="search-form" role="search" method="get" action="/shop">
        <input
          type="search"
          placeholder="Search"
          aria-label="Search products"
          onChange={(e) => {
            searchProducts(e.target.value);
          }}
          name="q"
          defaultValue={q}
          id="q"
        ></input>
      </Form>
    </div>
  );
}
