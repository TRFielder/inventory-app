const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Meat", "Carbohydrates", "Seasoning", "Dairy", "Drink"],
  },
  unit_price: { type: Number, required: true },
  description: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Ingredient", IngredientSchema);
