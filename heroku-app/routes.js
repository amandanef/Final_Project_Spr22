"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureRoutes = configureRoutes;

var _express = _interopRequireDefault(require("express"));

var _index = require("./controllers/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

function configureRoutes(app) {
  /*****************************************************************************
   * Section 1-2: Rendered pages & API
   ****************************************************************************/
  router.get("", function (req, res) {
    return res.redirect(301, "/meals/home");
  });
  router.get("/", _index.indexPage);
  router.get("/meals*", _index.indexPage);
  router.get("/api/meals", _index.allMealsAPI);
  router.post("/api/meals/new", _index.createMeal);
  router.put("/api/meals/:id/edit", _index.editMeal);
  router["delete"]("/api/meals/:id", _index.deleteMeal);
  app.use("/", router);
}