const express = require("express");
const router = express.Router();

//Require controller modules
const recipe_controller = require("../controllers/recipeController");
const ingredient_controller = require("../controllers/ingredientController");

// RECIPE ROUTES

//GET catalog home page
router.get("/", recipe_controller.index);

// GET request for creating a recipe. NOTE this must come before routes that display Recipe (uses id)
router.get("/recipe/create", recipe_controller.recipe_create_get);

// POST request for creating Recipe
router.post("/recipe/create", recipe_controller.recipe_create_post);

// GET request for list of all Recipe items.
router.get("/recipes", recipe_controller.recipe_list);

// INGREDIENT ROUTES

// GET request for creating an ingredient. NOTE this must come before routes that display Recipe (uses id)
router.get("/ingredient/create", ingredient_controller.ingredient_create_get);

// POST request for creating Ingredient
router.post("/ingredient/create", ingredient_controller.ingredient_create_post);

// GET request for list of all Ingredient items
router.get("/ingredients", ingredient_controller.ingredient_list);

module.exports = router;
