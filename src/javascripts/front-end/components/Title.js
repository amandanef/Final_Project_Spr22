import React from 'react'
import logo from '../../../images/My Usual Logo Transparent.png'
import addLogo from '../../../images/My Usual Add Meal.png'
import { Route, BrowserRouter as Router} from "react-router-dom";

export function Title() {
    return(
        <>
        <Router>
            <Route exact path="/meals/new">
            <div className="logo text-center mt-3">
                <img src={addLogo} alt="My Usual Add New Meal Icon" width="150"/>           
            </div>            
            </Route>
            <Route exact path="/meals/home">
            <div className="logo text-center mt-3">
                <img src={logo} alt="My Usual Logo" width="150"/>           
            </div>
            </Route>
            <Route exact path="/meals">
            <div className="logo text-center mt-3">
                <img src={logo} alt="My Usual Logo" width="150"/>           
            </div>
            </Route>
        </Router>
        </>
    )
}