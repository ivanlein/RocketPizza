import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  // demo for testing useParams

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://66e7ec24b17821a9d9da8d61.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("error 400! pizza not found");
        // redirect to the main page
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return "loading...";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="container"
    >
      <div
        style={{
          backgroundColor: "#ffe0b2",
          width: "320px",
          height: "480px",
          padding: "20px",
          borderRadius: "20px",
        }}
        className="pizza-block"
      >
        <img
          style={{ width: "280px", height: "280px" }}
          src={pizza.src}
          alt="pizza"
        />
        <h2>{pizza.title}</h2>
        <h4>от {pizza.price} ₽</h4>
        <h5 style={{ marginTop: "10px" }}>rating: {pizza.rating}/10</h5>
        <Link to="/">
          <button
            style={{ marginTop: "30px" }}
            className="button button--black"
          >
            Back to main page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
