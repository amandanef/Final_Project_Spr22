"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureRoutes = configureRoutes;

var _express = _interopRequireDefault(require("express"));

var _index = require("./controllers/index");

var _users = require("./controllers/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

function isSignedIn(req) {
  return req.isAuthenticated && req.isAuthenticated();
}

function requireSignIn(req, res, next) {
  if (isSignedIn(req)) {
    next();
  } else {
    res.status(401).json("unauthorized request");
    res.end();
  }
}

function configureRoutes(app) {
  app.all('*', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              app.locals.signedIn = isSignedIn(req);

              if (!isSignedIn(req)) {
                _context.next = 7;
                break;
              }

              if (req.session.user_profile) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return Profile.findOne({
                user: req.user
              }).exec();

            case 5:
              req.session.user_profile = _context.sent;

            case 6:
              //You can only use await if you also include async in the call
              //This displays the name of the person signed in
              app.locals.displayName = req.session.user_profile.displayName;

            case 7:
              res.cookie("authenticated", app.locals.signedIn);
              next();

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  /*****************************************************************************
  * Section 1-2: Rendered pages & API
  ****************************************************************************/

  router.get('', function (req, res) {
    return res.redirect(301, '/meals');
  });
  router.get('/', _index.indexPage);
  router.get('/meals*', _index.indexPage);
  router.get('/api/meals', _index.allMealsAPI, requireSignIn);
  router.post('/api/meals/new', _index.createMeal, requireSignIn);
  router.put('/api/meals/:id/edit', _index.editMeal, requireSignIn);
  router["delete"]('/api/meals/:id', _index.deleteMeal, requireSignIn); // Users

  router.post('/api/users/signup', _users.signUserUpAPI);
  router.post('/api/users/signin', _users.signUserInAPI);
  router["delete"]('/api/users/signout', _users.signUserOutAPI);
  router.get('/api/users/profile', requireSignIn, _users.currentUserProfileAPI);
  router.get('/signin', _users.signInPage);
  router.get('/signup', _users.signUpPage);
  router.get('/profile', _users.profilePage);
  app.use('/', router);
}