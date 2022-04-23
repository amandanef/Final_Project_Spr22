import passport from 'passport'
import {Profile, User} from '../models/user'

// GET /signin
export const signInPage = (req, res, next) => {
  res.render('signin')
}

// GET /signup
export const signUpPage = (req, res, next) => {
  res.render('signup')
}

// GET /profile
export const profilePage = (req, res, next) => {
  res.render('profile')
}

// POST /api/users/profile
export const currentUserProfileAPI = (req, res, next) => {
  Profile.findOne({user: req.user._id}).populate('user').exec().then(profile=> {
    let results = {
      username: profile.user.username,
      displayName: profile.displayName,
      email: profile.user.email
    }
    res.write(JSON.stringify(results))
    res.end()
  }).catch(err => {
    res.json({success: false, message: "Query failed"})
    res.end()
  })

}

// POST /api/users/signup
export const signUserUpAPI = (req, res, next) => {
  let user = new User ({
    username: req.body.username,
    email: req.body.email
  }) 

  User.register(user, req.body.password, async function(err, user) { 
    if (err) { 
      res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
    }else{ 
      await new Profile({
        user,
        displayName: `${req.body.lastName}, ${req.body.firstName}`,
        provider: 'local',
        name: { family: req.body.lastName, given: req.body.firstName }
      }).save()

      res.json({success: true, message: "Your account was successfully created"}) 
    } 

    res.end()
  })
}

// POST /api/users/signin
export const signUserInAPI = (req, res, next) => {
  passport.authenticate('local',  (err, user, info) => {
    if(err) res.status(500)
    else if(!user) res.status(404)
    req.logIn(user, function(err) {
      if (err) res.status(401)
      else res.status(200)
    })

    res.end()
  }
  )(req, res, next)
}

// DELETE /api/users/signout
export const signUserOutAPI = (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.end()
}
