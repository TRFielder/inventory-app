const { nextTick } = require("async");
const Ingredient = require("../models/ingredient");

exports.index = function (req, res) {
  res.render("index", { title: "Dashi" });
};

// Display list of all ingredients
exports.ingredient_list = function (req, res) {
  Ingredient.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_ingredients) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("ingredient_list", {
        title: "Ingredient List",
        ingredient_list: list_ingredients,
      });
    });
};

//Display ingredient create form on GET
exports.ingredient_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Ingredient create GET");
};

//Handle ingredient create on POST
exports.ingredient_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Ingredient create POST");
};

//Display detail page for a specific ingredient
exports.ingredient_detail = function (req, res) {
  Ingredient.findById(req.params.id).exec(function (err, ingredient) {
    if (err) {
      return next(err);
    }
    if (ingredient == null) {
      // No results
      let err = new Error("Ingredient not found");
      err.status = 404;
      return next(err);
    }
    // Successful, so render.
    res.render("ingredient_detail", { ingredient: ingredient });
  });
};

//Display ingredient update form on GET
exports.ingredient_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Ingredient update GET");
};

//Handle ingredient update on POST
exports.ingredient_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Ingredient update POST");
};

//Display ingredient delete form on GET
exports.ingredient_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Ingredient delete GET");
};

//Handle ingredient delete on form on POST
exports.ingredient_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Ingredient delete POST");
};
