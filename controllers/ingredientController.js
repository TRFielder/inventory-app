const { body, validationResult } = require("express-validator");
const { mongoose } = require("mongoose");
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
  res.render("ingredient_form", { title: "Add new ingredient" });
};

//Handle ingredient create on POST
exports.ingredient_create_post = [
  // validate and sanitise name field
  body("name", "Ingredient name required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantity", "Quantity must be a non-zero integer")
    .isInt({ min: 0 })
    .escape(),
  body("unit_price", "Unit price must be a non zero value").isFloat({
    min: 0.01,
  }),

  //Process request after validation and sanitisation
  (req, res, next) => {
    //Extract the validation errors from a request
    const errors = validationResult(req);

    //Create an ingredient object with escaped and trimmed data
    let ingredient = new Ingredient({
      name: req.body.name,
      quantity: req.body.quantity,
      type: req.body.type,
      unit_price: req.body.unit_price,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      //There are errors. Render the form again with sanitised values/error messages.
      res.render("ingredient_form", {
        title: "Add new ingredient",
        ingredient: ingredient,
        errors: errors.array(),
      });
      return;
    } else {
      //Data from form is valid
      //Check if ingredient with same name already exists
      Ingredient.findOne({ name: req.body.name }).exec(function (
        err,
        found_ingredient
      ) {
        if (err) {
          return next(err);
        }

        if (found_ingredient) {
          //Ingredient exists, redirect to its detail page
          res.redirect(found_ingredient.url);
        } else {
          ingredient.save(function (err) {
            if (err) {
              return next(err);
            }
            // Ingredient saved. Redirect to ingredient detail page.
            res.redirect(ingredient.url);
          });
        }
      });
    }
  },
];

//Display detail page for a specific ingredient
exports.ingredient_detail = function (req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.redirect("../ingredients");
  }
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
  Ingredient.findById(req.params.id, function (err, ingredient) {
    if (err) {
      return next(err);
    }
    if (ingredient == null) {
      //No results
      let err = new Error("Ingredient not found");
      err.status = 404;
      return next(err);
    }
    //Successful, so render
    res.render("ingredient_form", {
      title: "Update ingredient",
      ingredient: ingredient,
    });
  });
};

//Handle ingredient update on POST
exports.ingredient_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Ingredient update POST");
};

//Display ingredient delete form on GET
exports.ingredient_delete_get = function (req, res) {
  Ingredient.findById(req.params.id, function (err, ingredient) {
    if (err) {
      return next(err);
    }
    if (ingredient == null) {
      //No results
      let err = new Error("Ingredient not found");
      err.status = 404;
      return next(err);
    }
    //Successful, so render
    res.render("ingredient_delete", {
      title: "Delete ingredient",
      ingredient: ingredient,
    });
  });
};

//Handle ingredient delete form on POST
exports.ingredient_delete_post = function (req, res) {
  //Assume valid ingredient ID if we've got to this point
  Ingredient.findByIdAndRemove(req.body.id, function deleteIngredient(err) {
    if (err) {
      return next(err);
    }
    // Success, so redirect to the ingredient list
    res.redirect("/inventory/ingredients");
  });
};
