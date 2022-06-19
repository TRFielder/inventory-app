const Recipe = require("../models/recipe");

exports.index = function (req, res) {
  res.render("index", {
    title: "Dashi",
  });
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
exports.recipe_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Recipe detail GET");
};

//Display ingredient update form on GET
exports.recipe_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: recipe update GET");
};

//Handle recipe update on POST
exports.recipe_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: recipe update POST");
};

//Display recipe delete form on GET
exports.recipe_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: recipe delete GET");
};

//Handle recipe delete on form on POST
exports.recipe_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: recipe delete POST");
};
