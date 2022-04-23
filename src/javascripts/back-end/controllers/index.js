import { Meal } from '../models/meals'

//GET /
export const indexPage = (req, res, next) => {
    res.render('index')
}
// GET /api/meals
export const allMealsAPI = (req, res, next) => {
    Meal.find().select().exec((err, meals) =>{
        if(err){
            res.json({success: false, message: "Query failed"})
            red.end()
        }else{
            res.write(JSON.stringify(meals))
            res.end()
        }
    })
}  

// POST /api/meals/new
// router.post('/api/meals/new', createMeal)
export const createMeal = (req, res, next) => {
    console.log("Create meal was called")
        let meal = new Meal({
            mealTitle: req.body.mealTitle,
            restaurant: req.body.restaurant,
            rating: req.body.rating,
            description: req.body.description,
            picture: req.body.picture,
            dateAdded: req.body.dateAdded,
        })
        meal.save(err=> {
            if(err){
                    res.json({success: false, message: "There was an error in creating your meal."})
                    res.end()
                }else{
                        res.end()
                    }
                    })
                }



// PUT /api/meals/:id/edit
// router.put('/api/meals/:id/edit', editMeal)
export const editMeal = (req, res, next) => {
    console.log("Edit meal has been called")
    Meal.findOne({_id: req.params.mid}).exec((err, meal) =>{
        if(err){
            res.json({success: false, message: "Unable to update"})
            res.end()
          }
          else{
            Object.assign(meal, req.body)
            console.log
            meal.save(err=> {
              if(err){
                res.json({success: false, message: "Unable to update meal"})
                res.end()
              }else{
                res.end()
              }
            })
          }
    })
}



// DELETE /api/meals/:id
// router.delete('/api/meals/:id', deleteMeal)
export const deleteMeal = (req, res, next) => {
    Meal.findByIdAndDelete(req.params.id, err=> {
      if(err){
        res.json({success: false, message: "Unable to delete meal"})
        res.end()
      }else{
        res.end()
      }
    })
  }