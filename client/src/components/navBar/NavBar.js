import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import spoonacular from "../../assets/spoonacular-sp.png";

function NavBar() {
  return (
    <header>
          <img
            className="logo"
            src={spoonacular}
            alt="logo"
            height="50px"
            width="50px"
          />
      <nav>
        <ul class="nav__links">
          <li>
            <Link to="/">
              <button>Inicio</button>
            </Link>
          </li>
          <li>
            <Link to="/home">
              <button>Recetas</button>
            </Link>
          </li>
          <li>
            <Link to="/form">
              <button>Crear receta</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
