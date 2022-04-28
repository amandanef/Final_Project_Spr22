import express from "express";
import {
  allMealsAPI,
  createMeal,
  deleteMeal,
  editMeal,
  indexPage,
} from "./controllers/index";
let router = express.Router();
export function configureRoutes(app) {
  
  /*****************************************************************************
   * Section 1-2: Rendered pages & API
   ****************************************************************************/
  router.get("", (req, res) => res.redirect(301, "/meals/home"));
  router.get("/", indexPage);
  router.get("/meals*", indexPage);

  router.get("/api/meals", allMealsAPI);

  router.post("/api/meals/new", createMeal);
  router.put("/api/meals/:id/edit", editMeal);
  router.delete("/api/meals/:id", deleteMeal);

  app.use("/", router);
}
