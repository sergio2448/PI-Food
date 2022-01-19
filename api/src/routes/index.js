const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch${API_KEY}&addRecipeInformation=true&number=12`
  );
  const apiInfo = await apiUrl.data.results.map((element) => {
    return {
      id: element.id,
      title: element.title,
      summary: element.summary,
      image: element.image,
      spoonacularScore: element.spoonacularScore,
      healthScore: element.healthScore,
      steps: element.analyzedInstructions.map((arraySteps) => arraySteps.steps),
      diets: element.diets,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  console.log('entrando a getDbInfo')
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["diets"],
      /* through: {
        attributes: [],
      } */
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/recipes", async (req, res) => {
  const title = req.query.title;
  let recipesTotal = await getAllRecipes();
  if (title) {
    let recipeName = recipesTotal.filter((recipe) =>
      recipe.title.toLowerCase().includes(title.toLowerCase())
    );
    recipeName.length
      ? res.status(200).send(recipeName)
      : res.status(404).send("La receta no existe");
  } else {
    res.status(200).send(recipesTotal);
  }
});

router.get("/types", async (req, res) => {
  const dietsApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch${API_KEY}&addRecipeInformation=true&number=12`
  );
  const diets = dietsApi.data.results.map((element) => element.diets);
  const dietEach = diets.flat();
  console.log("dietEach", dietEach);
  const dietUnique = new Set(dietEach);
  const backtoarray = [...dietUnique];
  console.log("backtoarray", backtoarray);
  if (backtoarray.length) {
    console.log("Entra al if");
    backtoarray.forEach((e) => {
      console.log("e", e);
      Diet.findOrCreate({
        where: { diets: e },
      });
    });
  } else {
    [
      "gluten free",
      "ketogenic",
      "vegetarian",
      "lacto vegetarian",
      "ovo vegetarian",
      "vegan",
      "pescetarian",
      "paleo",
      "primal",
      "low fodmap",
      "whole30",
    ].forEach(async (element) => await Diet.create({ diets: element }));
    console.log("Tipos de dieta pre-cargadas");
  }

  const allDiets = await Diet.findAll();
  res.send(allDiets);
});

router.get("/filteredDiets/:diet", async (req, res) => {
  const diet = req.params.diet;
  const recipesAll = await getAllRecipes();
  if (diet) {
    /* let recipeName = recipesAll.filter((recipe) =>
      recipe.diets.find((e) => e === diet)
    ); */
    let recipeName = recipesAll.filter((recipe) =>
    recipe.diets.includes(diet) || recipe.diets.map((e) => e.diets).includes(diet)
  );
    //console.log("recipeName", recipesAll);
    recipeName.length
      ? res.status(200).send(recipeName)
      : res.status(404).send("No existe tal receta");
  } else {
    res.status(200).send(recipesAll);
  }
});

router.post("/recipe", async (req, res) => {
  let {
    title,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    image,
    createdInDb,
    diets,
  } = req.body;

  let recipeCreated = await Recipe.create({
    title,
    summary,
    spoonacularScore,
    healthScore,
    steps,
    image,
    diets,
    createdInDb,
  });
  console.log("recipeCreated", recipeCreated);
  let dietDb = await Diet.findAll({ where: { diets: diets } });
  console.log("dietDb", dietDb);
  recipeCreated.addDiet(dietDb);
  res.send("Receta creada con éxito");
});

router.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  //const {id} = req.params;
  const recipesTotal = await getAllRecipes();
  //console.log('recipesTotal', recipesTotal);
 
  if (id) {
    console.log('entrando al id');
    
    var recipeId = recipesTotal.filter((el) => el.id == id);
    
    /* if(id.includes('-')) {
      console.log('recipePrueba1', recipeId[0].diets); 
      //console.log('first', recipeId[0].diets);
       recipeId[0].diets = recipeId[0].diets.map((diet) => diet.diets)
       console.log('recipePrueba2', recipeId[0].diets);
       console.log('recipePrueba3', recipeId[0]);
    } */ 
     
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(400).send("No se encontró la receta");
  }
}); 

module.exports = router;
