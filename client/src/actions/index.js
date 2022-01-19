import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    try {
      var json_r = await axios.get("http://localhost:3001/recipes");
      return dispatch({
        type: "GET_RECIPES",
        payload: json_r.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesByName(title) {
  return async function (dispatch) {
    try {
      var json_w = await axios.get(
        "http://localhost:3001/recipes?title=" + title
      );
      return dispatch({
        type: "GET_RECIPES_BY_NAME",
        payload: json_w.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesByDiet(diet) {
  console.log('diet', diet)
  return async function (dispatch) {
    try {
      var json_f = await axios.get(
        `http://localhost:3001/filteredDiets/${diet}`
      );
      return dispatch({
        type: "GET_RECIPES_BY_DIET",
        payload: json_f.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesById(id) {
  return async function (dispatch) {
    try {
      let detail = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: "GET_RECIPES_BY_ID",
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload
  }
}

export function orderByTitle(payload) {
  return {
    type: "ORDER_BY_TITLE",
    payload
  }
}

export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload
  }
}

export function getDiets() {
  return async function(dispatch) {
    var info = await axios("http://localhost:3001/types", {});
    return dispatch({ type: "GET_DIETS", payload: info.data });
  }
}

export function postRecipe(payload) {
  return async function(dispatch) {
    const response = await axios.post("http://localhost:3001/recipe", payload)
    return response;
  }
}
