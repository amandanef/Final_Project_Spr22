import mongoose from 'mongoose'

const Schema = mongoose.Schema

let mealsSchema = new Schema({
  mealTitle: String,
  restaurant: String,
  dateAdded: Date,
  description: String,
  picture: String,
  rating: Number

})

mealsSchema.virtual('id').get(function(){
  return this._id.toHexString()
})

mealsSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret.__v
    delete ret._id
  }
})

export let Meal = mongoose.model("Meal", mealsSchema)