import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import spoonacular from "../../assets/spoonacular-sp.png";

function NavBar() {
  return (
    <div className="navigation">
      <div className="contimg">
        <div>
          <img
            src={spoonacular}
            alt="image not found"
            height="50px"
            width="50px"
          />
        </div>
      </div>
      <div>
        <Link to="/">
          <button>Inicio</button>
        </Link>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/form">
          <button>Crear receta</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
