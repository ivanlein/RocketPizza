import React from "react";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty<span>🛒</span>
      </h2>
      <p>
        You probably haven't added pizza yet.
        <br />
        To add pizza, go to the main page
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
        alt="Empty cart"
      />
      <Link to="/" className="button button--black">
        <span>Back to main page</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
