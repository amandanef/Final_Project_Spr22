import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";

export function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-danger">
        <div className="container-fluid">
          <a className="navbar-brand mx-3" href="/meals/home">
            My Usual
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <a className="nav-link" href="/meals">
                  View Meals
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="/meals/new">
                  Add New Meal
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
