const mongoose = require("mongoose");
const { populate } = require("./ingredient");

const Schema = mongoose.Schema;

//ingredients are in an array because a recipe can (probably does!) have multiple ingredients

const RecipeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }], //Reference to the associated ingredients
  description: { type: String, required: true },
});

/* Virtual for Recipe's overall price, sums all ingredient unit_price values with Array.reduce().
 Note: Not currently working so disabled!
RecipeSchema.virtual("price").get(function () {
  return this.ingredients.reduce(function (prev, curr) {
    console.log(curr);
    return prev + curr.unit_price;
  }, 0);
});
*/

RecipeSchema.virtual("url").get(function () {
  return "/inventory/recipe/" + this._id;
});

module.exports = mongoose.model("Recipe", RecipeSchema);
