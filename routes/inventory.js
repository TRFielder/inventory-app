const express = require("express");
const router = express.Router();

//Require controller modules
const recipe_controller = require("../controllers/recipeController");
const ingredient_controller = require("../controllers/ingredientController");

// ------------------------      RECIPE ROUTES      ----------------------

//GET catalog home page
router.get("/", recipe_controller.index);

// GET request for creating a recipe. NOTE this must come before routes that display Recipe (uses id)
router.get("/recipe/create", recipe_controller.recipe_create_get);

// POST request for creating Recipe
router.post("/recipe/create", recipe_controller.recipe_create_post);

// GET request for a single recipe detail
router.get("/recipe/:id", recipe_controller.recipe_detail);

// GET request for list of all Recipe items.
router.get("/recipes", recipe_controller.recipe_list);

// GET request to update recipe
router.get("/recipe/:id/update", recipe_controller.recipe_update_get);

// POST request to update recipe
router.post("/recipe/:id/update", recipe_controller.recipe_update_post);

// GET request to delete recipe
router.get("/recipe/:id/delete", recipe_controller.recipe_delete_get);

// POST request to delete recipe
router.post("/recipe/:id/delete", recipe_controller.recipe_delete_post);

// ------------------------      INGREDIENT ROUTES      ----------------------

// GET request for creating an ingredient. NOTE this must come before routes that display ingredient (uses id)
router.get("/ingredient/create", ingredient_controller.ingredient_create_get);

// POST request for creating ingredient
router.post("/ingredient/create", ingredient_controller.ingredient_create_post);

// GET request for a single ingredient detail
router.get("/ingredient/:id", ingredient_controller.ingredient_detail);

// GET request for list of all ingredient items.
router.get("/ingredients", ingredient_controller.ingredient_list);

// GET request to update ingredient
router.get(
  "/ingredient/:id/update",
  ingredient_controller.ingredient_update_get
);

// POST request to update ingredient
router.post(
  "/ingredient/:id/update",
  ingredient_controller.ingredient_update_post
);

// GET request to delete ingredient
router.get(
  "/ingredient/:id/delete",
  ingredient_controller.ingredient_delete_get
);

// POST request to delete ingredient
router.post(
  "/ingredient/:id/delete",
  ingredient_controller.ingredient_delete_post
);

module.exports = router;
