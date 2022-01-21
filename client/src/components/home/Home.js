import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipesByDiet,
  getRecipesByName,
  getRecipes,
  filterCreated,
  orderByTitle,
  orderByScore,
} from "../../actions";
import img4 from "../../assets/404-error.jpg";
import "./Home.css";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import "./Home.css";
import NavBar from "../navBar/NavBar";

const Home = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [orden, setOrden] = useState("");
  const recipesAll = useSelector((state) => state.recipes);
  console.log("recipesAll", recipesAll);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipesAll.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handleFilterByName(e) {
    e.preventDefault();
    dispatch(getRecipesByName(title));
  }

  function handleFilterByDiets(e) {
    e.preventDefault();
    console.log("handleFilterDiets", e.target.value);
    dispatch(getRecipesByDiet(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleOrderByTitle(e) {
    e.preventDefault();
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <NavBar></NavBar>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Recetas por título..."
        value={title}
      />
      <button onClick={(e) => handleFilterByName(e)}>Buscar</button>

      <div className="option">
        <div className="filter">
          <select
            defaultValue="Filtro por fuente"
            onChange={(e) => handleFilterCreated(e)}
          >
            <option disabled>Filtro por fuente</option>
            <option value="All">All</option>
            <option value="created">DB</option>
            <option value="api">API</option>
          </select>
        </div>

        <div className="filter">
          <select
            defaultValue="Filtro por tipo de dieta"
            onChange={(e) => handleFilterByDiets(e)}
          >
            <option disabled>Filtro por tipo de dieta</option>
            <option value="gluten free">gluten free</option>
            <option value="ketogenic">ketogenic</option>
            <option value="vegetarian">vegetarian</option>
            <option value="primal">primal</option>
            <option value="lacto vegetarian">lacto vegetarian</option>
            <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
            <option value="ovo vegetarian">ovo vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="pescetarian">pescetarian</option>
            <option value="paleo">paleo</option>
            <option value="low fodmap">low fodmap</option>
            <option value="whole30">whole30</option>
          </select>
        </div>

        <div className="filter">
          <select
            defaultValue="Orden alfabetico"
            onChange={(e) => handleOrderByTitle(e)}
          >
            <option disabled>Orden alfabetico</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>

        <div className="filter">
          <select
            defaultValue="Orden por puntaje"
            onChange={(e) => handleOrderByScore(e)}
          >
            <option disabled>Orden por puntaje</option>
            <option value="sr">Puntaje de la receta</option>
            <option value="sh">Puntaje saludable</option>
          </select>
        </div>
      </div>

      <div>
        {currentRecipes.length ? (
          currentRecipes.map((e, index) => (
            <div className="cards" key={index}>
              <Card
                image={e.image}
                key={e.id}
                id1={e.id}
                title={e.title}
                diets={e.diets}
              />
            </div>
          ))
        ) : (
          <img src={img4} width="900px" height="500px" alt="not found" />
        )}
      </div>

      {recipesAll.length > 9 ? (
        <div className="pagination">
          <Pagination
            recipesAll={recipesAll.length}
            recipesPerPage={recipesPerPage}
            pagination={pagination}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
