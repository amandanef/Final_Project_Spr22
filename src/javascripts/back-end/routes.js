//TODO
import express from 'express'
import {allMealsAPI, createMeal, deleteMeal, editMeal, indexPage} from './controllers/index'
import {signInPage, signUpPage, signUserUpAPI, signUserInAPI, signUserOutAPI, profilePage, currentUserProfileAPI} from './controllers/users'
let router = express.Router()

function isSignedIn(req){
  return req.isAuthenticated && req.isAuthenticated()
}

function requireSignIn(req, res, next) {
  if(isSignedIn(req)){
    next()
  }else{
    res.status(401).json("unauthorized request")
    res.end()
  }
}

export function configureRoutes(app){
  app.all('*', async (req, res, next)=>{
    app.locals.signedIn = isSignedIn(req)
    if(isSignedIn(req)){
      //If the user profile isn't created, then create one
      if(!req.session.user_profile){
        req.session.user_profile = await Profile.findOne({user: req.user}).exec()
      }
      //You can only use await if you also include async in the call
      //This displays the name of the person signed in
      app.locals.displayName = req.session.user_profile.displayName
    }
    res.cookie("authenticated", app.locals.signedIn)
    next()
  })
   /*****************************************************************************
   * Section 1-2: Rendered pages & API
   ****************************************************************************/
  router.get('', (req, res) => res.redirect(301, '/meals'))
  router.get('/', indexPage)
  router.get('/meals*', indexPage)

  router.get('/api/meals', allMealsAPI, requireSignIn)
  
  router.post('/api/meals/new', createMeal, requireSignIn)
  router.put('/api/meals/:id/edit', editMeal, requireSignIn)
  router.delete('/api/meals/:id', deleteMeal, requireSignIn)

  // Users
  router.post('/api/users/signup', signUserUpAPI)
  router.post('/api/users/signin', signUserInAPI)
  router.delete('/api/users/signout', signUserOutAPI)
  router.get('/api/users/profile', requireSignIn, currentUserProfileAPI)

  router.get('/signin', signInPage)
  router.get('/signup', signUpPage)
  router.get('/profile', profilePage)

  app.use('/', router)
}