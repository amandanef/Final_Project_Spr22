"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Meal = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var mealsSchema = new Schema({
  mealTitle: String,
  restaurant: String,
  dateAdded: Date,
  description: String,
  picture: String,
  rating: Number
});
mealsSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
mealsSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(doc, ret, options) {
    delete ret.__v;
    delete ret._id;
  }
});

var Meal = _mongoose["default"].model("Meal", mealsSchema);

exports.Meal = Meal;