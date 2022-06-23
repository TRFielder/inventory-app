const Ingredient = require("../models/ingredient");
const Recipe = require("../models/recipe");
const async = require("async");
const { mongoose } = require("mongoose");
const { body, validationResult } = require("express-validator");

exports.index = function (req, res) {
  async.parallel(
    {
      recipe_count: function (callback) {
        Recipe.countDocuments({}, callback); //Empty object as match condition -> finds all documents in collection
      },
      ingredient_count: function (callback) {
        Ingredient.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Dashi",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all recipes
exports.recipe_list = function (req, res) {
  Recipe.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_recipes) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("recipe_list", {
        title: "Recipe List",
        recipe_list: list_recipes,
      });
    });
};

//Display recipe create form on GET
exports.recipe_create_get = function (req, res) {
  // We will only allow creation of recipes based on existing ingredients
  //Get the full list of ingredients which the user can select from
  Ingredient.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_ingredients) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("recipe_form", {
        title: "Add new recipe",
        ingredient_list: list_ingredients,
      });
    });
};

//Handle recipe create on POST
exports.recipe_create_post = [
  //Validate and sanitise name and description fields
  body("name", "Recipe name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("ingredients.*", "There must be at least one ingredient.").exists(),

  //Process request after validation and sanitisation
  (req, res, next) => {
    //Extract the validation errors from a result
    const errors = validationResult(req);

    let recipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
    });

    if (!errors.isEmpty()) {
      //There are errors. Render the form again with sanitised values/error messages.
      Ingredient.find()
        .sort([["name", "ascending"]])
        .exec(function (err, list_ingredients) {
          if (err) {
            return next(err);
          }
          //Successful, so render
          res.render("recipe_form", {
            title: "Add new recipe",
            ingredient_list: list_ingredients,
          });
        });
      return;
    } else {
      //Data from form is valid
      //Check if recipe with same name already exists
      Recipe.findOne({ name: req.body.name }).exec(function (
        err,
        found_recipe
      ) {
        if (err) {
          return next(err);
        }
        if (found_recipe) {
          //Recipe exists, redirect to its detail page
          res.redirect(found_recipe.url);
        } else {
          recipe.save(function (err) {
            if (err) {
              return next(err);
            }
            //Recipe saved. Redirect to recipe detail page
            res.redirect(recipe.url);
          });
        }
      });
    }
  },
];

//Display detail page for a specific recipe
exports.recipe_detail = function (req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.redirect("../recipes");
  }
  async.parallel(
    {
      recipe: function (callback) {
        Recipe.findById(req.params.id).populate("ingredients").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.recipe == null) {
        // No results
        let err = new Error("Recipe not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("recipe_detail", {
        title: results.recipe.name,
        description: results.recipe.description,
        ingredients: results.recipe.ingredients,
        recipe: results.recipe,
      });
    }
  );
};

//Display ingredient update form on GET
exports.recipe_update_get = function (req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) {
      return next(err);
    }
    if (recipe == null) {
      //No results
      let err = new Error("Recipe not found");
      err.status = 404;
      return next(err);
    }
    Ingredient.find()
      .sort([["name", "ascending"]])
      .exec(function (err, list_ingredients) {
        if (err) {
          return next(err);
        }
        //Successful, so render
        res.render("recipe_form", {
          title: "Add new recipe",
          ingredient_list: list_ingredients,
          recipe: recipe,
        });
      });
  });
};

//Handle recipe update on POST
exports.recipe_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: recipe update POST");
};

//Display recipe delete form on GET
exports.recipe_delete_get = function (req, res) {
  async.parallel(
    {
      recipe: function (callback) {
        Recipe.findById(req.params.id).populate("ingredients").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.recipe == null) {
        // No results
        let err = new Error("Recipe not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("recipe_delete", {
        title: "Delete recipe",
        description: results.recipe.description,
        ingredients: results.recipe.ingredients,
        recipe: results.recipe,
      });
    }
  );
};

//Handle recipe delete on form on POST
exports.recipe_delete_post = function (req, res) {
  //Assume valid recipe ID if we've got to this point
  Recipe.findByIdAndRemove(req.body.id, function deleteRecipe(err) {
    if (err) {
      return next(err);
    }
    // Success, so redirect to the recipe list
    res.redirect("/inventory/recipes");
  });
};
