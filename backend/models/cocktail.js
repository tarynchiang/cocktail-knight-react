import mongoose from "mongoose";

const cocktailSchema = mongoose.Schema({
  name: String,
  ingredients: Array,
  instruction: String,
  img: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Cocktail = mongoose.model("Cocktail", cocktailSchema);

export default Cocktail;
