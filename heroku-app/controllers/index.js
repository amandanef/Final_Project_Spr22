"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexPage = exports.editMeal = exports.deleteMeal = exports.createMeal = exports.allMealsAPI = void 0;

var _meals = require("../models/meals");

//GET /
var indexPage = function indexPage(req, res, next) {
  res.render('index');
}; // GET /api/meals


exports.indexPage = indexPage;

var allMealsAPI = function allMealsAPI(req, res, next) {
  _meals.Meal.find().select().exec(function (err, meals) {
    if (err) {
      res.json({
        success: false,
        message: "Query failed"
      });
      red.end();
    } else {
      res.write(JSON.stringify(meals));
      res.end();
    }
  });
}; // POST /api/meals/new
// router.post('/api/meals/new', createMeal)


exports.allMealsAPI = allMealsAPI;

var createMeal = function createMeal(req, res, next) {
  console.log("Create meal was called");
  var meal = new _meals.Meal({
    mealTitle: req.body.mealTitle,
    restaurant: req.body.restaurant,
    rating: req.body.rating,
    description: req.body.description,
    picture: req.body.picture,
    dateAdded: req.body.dateAdded
  });
  meal.save(function (err) {
    if (err) {
      res.json({
        success: false,
        message: "There was an error in creating your meal."
      });
      res.end();
    } else {
      res.end();
    }
  });
}; // PUT /api/meals/:id/edit
// router.put('/api/meals/:id/edit', editMeal)


exports.createMeal = createMeal;

var editMeal = function editMeal(req, res, next) {
  console.log("Edit meal has been called");

  _meals.Meal.findOne({
    _id: req.params.mid
  }).exec(function (err, meal) {
    if (err) {
      res.json({
        success: false,
        message: "Unable to update"
      });
      res.end();
    } else {
      Object.assign(meal, req.body);
      console.log;
      meal.save(function (err) {
        if (err) {
          res.json({
            success: false,
            message: "Unable to update meal"
          });
          res.end();
        } else {
          res.end();
        }
      });
    }
  });
}; // DELETE /api/meals/:id
// router.delete('/api/meals/:id', deleteMeal)


exports.editMeal = editMeal;

var deleteMeal = function deleteMeal(req, res, next) {
  _meals.Meal.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.json({
        success: false,
        message: "Unable to delete meal"
      });
      res.end();
    } else {
      res.end();
    }
  });
};

exports.deleteMeal = deleteMeal;