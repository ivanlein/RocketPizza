import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    src: string;
    title: string;
    price: number;
    rating: number;
  }>();
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
        window.scrollTo(0, 90)
      } catch (error) {
        alert("error 400! pizza not found");
        // redirect to the main page
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <ColorRing
    visible={true}
    height="300"
    width="300"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#ffe0b2', '#f6f6f6', '#fe5f1e', '#f39c12', '#232323']}
    />
    </div>;
  }

  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="container"
    >
      <div
        style={{
          backgroundColor: "#ffe0b2",
          width: "320px",
          height: "420px",
          padding: "20px",
          borderRadius: "20px",
          marginBottom: "40px",
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
      </div>
      <Link style={{display: "flex", alignItems: 'center', justifyContent: 'center'}} to="/">
          <button
            style={{ width: '220px', height: '50px', fontSize: '18px' }}
            className="button button--black"
          >
            Back to main page
          </button>
        </Link>
    </div>
  );
};

export default FullPizza;
