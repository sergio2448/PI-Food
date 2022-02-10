import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import spoonacular from "../../assets/spoonacular-sp.png";

function NavBar() {
  return (
    <div>
      <nav>
        <ul className="nav-list">
          <li className='nav-item'>
            <a href='/'>Inicio</a>
          </li>
          <li className='nav-item'>
            <a href='/home'>Recetas</a>
          </li>
          <li className='nav-item'>
            <Link to="/form">
              <button className='btn-primary'>Crear receta</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
