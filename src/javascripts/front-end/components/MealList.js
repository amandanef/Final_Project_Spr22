import React, { useState, createContext, useEffect } from "react";
import Meal from "./Meal";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MealForm from "./MealForm";
import Home from "./Home";
import { useCookies } from "react-cookie";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { Profile } from "./Profile";

export const MealContext = createContext();
export function MealList(props) {
  const [meals, setMeals] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["authenticated"]);
  let [authenticated, setAuthenticated] = useState(
    cookies.authenticated === "true"
  );
  const history = useHistory();

  let sortingField = "";
  const sortBy = (field) => {
    if (field === "dateAdded") {
      // Date descendingly
      // meals.sort((a, b) => b[field].toISOString().localeCompare(a[field].toISOString()))
      meals.sort((a, b) => a.dateAdded - b.dateAdded)
      console.log("Sorting by date...");
    } else if (field === "rating") {
      // Number
      meals.sort((a, b) => b[field] - a[field]);
    } else if (field === "mealTitle" || field === "restaurant") {
      // String
      meals.sort((a, b) => a[field].localeCompare(b[field]));
    }
    setMeals([...meals]);
  };

  useEffect(() => {
    fetch("/api/meals", {
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMeals(data);
      })
      .catch(console.error);
  }, []);

  if (!meals) return <p>Loading...</p>;

  return (
    <MealContext.Provider value={{ meals, setMeals }}>
      <Router>
        <div className="p-5">
          <div className="pull-content-right mb-3">
            <Route exact path="/meals">
            <h2 className="text-center mb-3">All Meals</h2>
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-danger bg-danger"
                    onClick={() => {
                      document.location = "/meals/new";
                    }}
                  >
                    Add a new meal
                  </button>
                </div>
                <div className="col-6">
                  <select
                    className="form-select w-50 float-end"
                    onChange={(e) => sortBy(e.target.value)}
                  >
                    <option defaultValue="">Sort by:</option>
                    <option value="mealTitle">Meal Title</option>
                    <option value="dateAdded">Date Added</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </Route>
          </div>
          <main className="w-100">
            <Switch>
              <Route exact path="/meals">
                {meals.map((m, i) => {
                  return <Meal key={m.id} meal={m} index={i} />;
                })}
              </Route>
              <Route path="/meals/new">
                <>
                  <h2 className="mx-3 text-center">Add a New Meal</h2>
                  <MealForm />
                </>
              </Route>
              <Route path="/meals/:id/edit">
                <>
                  <h2 className="mx-3 text-center">Edit a Meal</h2>
                  <MealForm />
                </>
              </Route>
              <Route path="/meals/home">
                <Home />
              </Route>
              <Route exact path="/signup" element={<SignUpForm />} />
              <Route path="/signin">
                <SignInForm />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </MealContext.Provider>
  );
}
