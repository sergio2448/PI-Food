const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_RECIPES_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_RECIPES_BY_DIET":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_RECIPES_BY_ID":
      console.log(action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTER_BY_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allRecipes.filter((db) => db.createdInDb)
          : state.allRecipes.filter((db) => !db.createdInDb);
      return {
        ...state,
        recipes: createdFilter,
      };
    case "ORDER_BY_TITLE":
      console.log("allRecipesOrderByTitle", state.allRecipes);
      const sortedArr =
        action.payload === "asc"
          ? state.allRecipes.sort(function (a, b) {
              console.log("a", a.title);
              console.log("b", b.title);
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      console.log("sortedArr", sortedArr);
      return {
        ...state,
        recipes: sortedArr,
      };
    case "ORDER_BY_SCORE":
      const recipesByScore =
        action.payload === "sr"
          ? state.allRecipes.sort((a, b) => {
              if (a.spoonacularScore - b.spoonacularScore < 0) return 1;
              else return -1;
            })
          : state.allRecipes.sort((a, b) => {
              if (a.healthScore - b.healthScore < 0) return 1;
              else return -1;
            });
      return {
        ...state,
        recipes: recipesByScore,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;
