const Ingredient = require("../models/ingredient");
const Recipe = require("../models/recipe");
const async = require("async");
const { mongoose } = require("mongoose");

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
  res.send("NOT IMPLEMENTED: Recipe create GET");
};

//Handle recipe create on POST
exports.recipe_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Recipe create POST");
};

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
    //Successful, so render
    res.render("recipe_form", { title: "Update recipe", recipe: recipe });
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
  res.send("NOT IMPLEMENTED: recipe delete POST");
};
