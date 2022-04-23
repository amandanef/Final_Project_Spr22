import React from "react";

export default function Home() {
  return (
    <>
      <div className="mx-5">
        <div>
          <h1 className="text-center">Welcome to My Usual!</h1>
          <p>
            Keep track of your favorite meals and (and least-favorite meals)
            with this application! Tap or click any of the buttons below to get
            started.
          </p>
        </div>
        <hr className="text-center bg-danger" />
        <div className="mb-3 row">
          <div className="col-sm-12 col-lg-6">
            <button
              className="text-center btn btn-danger mb-2 w-100"
              onClick={() => {
                document.location = "/meals";
              }}
            >
              View All Meals
            </button>
          </div>
          <div className="col-sm-12 col-lg-6">
            <button
              className="text-center btn btn-danger mb-2 w-100"
              onClick={() => {
                document.location = "/meals/new";
              }}
            >
              Add a New Meal
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
