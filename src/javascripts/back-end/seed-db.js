let path = require("path");
require("dotenv").config();

// Connect to the database
import mongoose from "mongoose";
import { Meal } from "./models/meals";

console.log(process.env.DB_URL);
mongoose
  .connect(process.env.DB_URL)
  .then((db) => {
    console.log(`Connected to ${db.connections[0].name}`);
  })
  .catch((err) => {
    console.log(err);
  });

// Seed Database with quotes from starter-quotes.js
import { meals } from "../../starter-meals"
for(let m of meals){
  let meal = new Meal({
    "mealTitle": m.mealTitle,
    "restaurant": m.restaurant,
    "dateAdded": m.dateAdded,
    "description": m.description,
    "picture": m.picture,
    "rating": m.rating
  })
  await meal.save()
}
console.log("........ DONE SEEDING DATABASE")