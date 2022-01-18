import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDiets, postRecipe } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";

function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "Se requiere un título";
  } else if (!input.summary) {
    errors.summary = "Se requiere un resumen";
  } else if (input.spoonacularScore > 100 || input.spoonacularScore < 0) {
    errors.spoonacularScore = "Se requiere un puntaje entre 0 y 100";
  } else if (input.healthScore > 100 || input.healthScore < 0) {
    errors.healthScore = "Se requiere un puntaje entre 0 y 100";
  }
  return errors;
}

const Form = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    steps: "",
    image: "",
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Receta creada con éxito");
    setInput({
      title: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      steps: "",
      image: "",
      diets: [],
    });
    history("/home");
  }

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  return (
    <div className="divForm">
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crear receta</h1>
      <form className="form-register" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Título: </label>
          <input
            className="controls"
            type="text"
            value={input.title}
            name="title"
            onChange={handleChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label>Resumen: </label>
          <input
            className="controls"
            type="text"
            value={input.summary}
            name="summary"
            onChange={handleChange}
          />
          {errors.summary && <p className="error">{errors.summary}</p>}
        </div>
        <div>
          <label>Puntaje receta: </label>
          <input
            className="controls"
            type="text"
            value={input.spoonacularScore}
            name="spoonacularScore"
            onChange={handleChange}
          />
          {errors.spoonacularScore && (
            <p className="error">{errors.spoonacularScore}</p>
          )}
        </div>
        <div>
          <label>Puntaje saludable: </label>
          <input
            className="controls"
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={handleChange}
          />
          {errors.healthScore && <p className="error">{errors.healthScore}</p>}
        </div>
        <div>
          <label>Imagen: </label>
          <input
            className="controls"
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <select className="select" onChange={(e) => handleSelect(e)}>
          {diets.map((diet) => (
            <option value={diet.diets}>{diet.diets}</option>
          ))}
        </select>
        <ul>
          <li>{input.diets.map((e) => e + ", ")}</li>
        </ul>
        <br />
        <button type="submit">Crear receta</button>
      </form>
    </div>
  );
};

export default Form;
