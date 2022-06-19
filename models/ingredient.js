const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Meat", "Carbohydrates", "Plant", "Seasoning", "Dairy", "Drink"],
  },
  unit_price: { type: Number, required: true },
  description: { type: String, required: true },
});

// Virtual for ingredient's price in GBP
IngredientSchema.virtual("priceGBP").get(function () {
  return (Math.round(this.unit_price * 100) / 100).toFixed(2);
});

// Virtual for ingredient's URL
IngredientSchema.virtual("url").get(function () {
  return "/inventory/ingredient/" + this._id;
});

//Export model
module.exports = mongoose.model("Ingredient", IngredientSchema);
