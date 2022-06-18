const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//ingredients are in an array because a recipe can (probably does!) have multiple ingredients

const RecipeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  ingredients: [
    { type: Schema.Types, objectID, ref: "Ingredient", required: true },
  ], //Reference to the associated ingredients
});

// Virtual for Recipe's overall price, sums all ingredient unit_price values with Array.reduce()
RecipeSchema.virtual("price").get(function () {
  return this.ingredients.reduce(function (prev, curr) {
    return prev + curr.unit_price;
  }, 0);
});

module.exports = mongoose.model("Recipe", RecipeSchema);
