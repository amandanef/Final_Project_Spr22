import React, { useContext, useState } from "react";
import { MealContext, MealList } from "./MealList";
import { useParams } from "react-router-dom";
import {
  FaQuestionCircle,
  FaRegSmileBeam,
  FaRegMeh,
  FaRegFrown,
} from "react-icons/fa";
import Modal from "react-modal";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
toast.configure();
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  content: {
    width: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export function VHelp({ message }) {
  return <p className="help text-danger">{message}</p>;
}
const validationSchema = yup.object({
  mealTitle: yup.string().required(),
  restaurant: yup.string().required(),
  description: yup.string().required(),
  picture: yup.string(),
  rating: yup.number().required().max(3).min(1),
  dateAdded: yup.date().required(),
});

export default function MealForm() {
  let { meals, setMeals } = useContext(MealContext);
  let { mid } = useParams();
  let [modalOpen, setModalOpen] = useState(false);

  let meal = mid ? meals.find((m) => m.id == mid) : {};
  let is_new = mid === undefined;
  let { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik(
    {
      initialValues: {
        mealTitle: "",
        restaurant: "",
        dateAdded: "",
        //Change so this starts with today's date
        description: "",
        picture: "",
        rating: 0,
      },
      validationSchema,
      onSubmit(values) {
        fetch("/api/meals/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(values),
        })
          .then(() => {
            toast("Successfully submitted", {
              onClose: () => {
                document.location = "/meals";
              },
            });
          })
          .catch((error) => {
            toast("Failed to submit", {
              onClose: () => {
                document.location = "/meals";
              },
            });
          });
      },
    }
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-3">
        {/* Group left */}
        <hr className="bg-danger mb-3" />
        <div className="row">
          <h3 className="text-center mb-2">Meal Description</h3>
          <div className="col-lg-6 col-sm-12">
            <div className="field">
              <label htmlFor="mealTitle">Meal Title</label>
              <div className="control">
                <input
                  type="text"
                  name="mealTitle"
                  value={values.mealTitle}
                  onChange={handleChange}
                  className="w-100"
                />
                <VHelp message={errors.mealTitle} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="restaurant">Restaurant</label>
              <div className="control">
                <input
                  type="text"
                  name="restaurant"
                  value={values.restaurant}
                  onChange={handleChange}
                  className="w-100"
                />
                <VHelp message={errors.restaurant} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="dateAdded">Date Added</label>
              <div className="control">
                <DatePicker
                  name="dateAdded"
                  selected={values.dateAdded}
                  onChange={(date) => setFieldValue("dateAdded", date)}
                  className="w-100"
                />
                <VHelp message={errors.dateAdded} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="picture">Picture</label>
              <div className="control">
                <input
                  type="URL"
                  name="picture"
                  value={values.picture}
                  onChange={handleChange}
                  className="w-100"
                />
                <a onClick={() => setModalOpen(true)} className="help-icon-div">
                  <FaQuestionCircle
                    color={"grey"}
                    className="help-icon"
                    size={20}
                  ></FaQuestionCircle>
                </a>
                <VHelp message={errors.picture} />
              </div>
            </div>
          </div>

          {/* Group Right */}
          <div className="col-lg-6 col-sm-12 h-100 d-inline-block">
            <div className="field">
              <label htmlFor="description">Description</label>
              <div className="control">
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="w-100 h-100 descriptionBox"
                />
                <VHelp message={errors.description} />
              </div>
            </div>
          </div>
        </div>

        {/* Group bottom */}
        <div className="row">
          <h3 className="text-center mb-2">How would you rate this meal?</h3>
          <div className="row text-center">
            <div className="col-lg-4 text-center">
              <FaRegFrown color="red" size={50} />
              <br />
              <h4 className="text-center">1. Bad</h4>
            </div>
            <div className="col-lg-4 text-center">
              <FaRegMeh color="yellow" size={50} />
              <br />
              <h4 className="text-center">2. Alright</h4>
            </div>
            <div className="col-lg-4 text-center">
              <FaRegSmileBeam color="green" size={50} />
              <br />
              <h4 className="text-center">3. Great!</h4>
            </div>
          </div>

          <div className="field">
            <label htmlFor="rating">Rating</label>
            <div className="control">
              <input
                type="number"
                name="rating"
                value={values.rating}
                onChange={handleChange}
                className="w-100"
              />
              <VHelp message={errors.rating} />
            </div>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="danger btn btn-danger">Submit</button>
            <button
              className="secondary btn btn-secondary mx-3"
              onClick={() => (document.location = "/meals")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        contentLabel="How to Upload an Image"
      >
        <h2 className="text-center">How to Upload an Image</h2>
        <div className="w-70 text-center">
          <img
            src="../../images/ImageURLuploadTutorial.png"
            className="help-image-example"
            alt="Example of how to upload an image to the form"
          ></img>
        </div>
        <p>
          To upload an image to your entry, find a photo you want to use and{" "}
          <strong>right click</strong> on the image. Select the{" "}
          <strong>"copy image address"</strong> option and it will generate a
          URL for that specific image. Simply
          <strong> copy and paste</strong> your url into the "Picture" input
          field and you are done!
        </p>

        <button className="btn btn-danger" onClick={() => setModalOpen(false)}>
          Ok
        </button>
      </Modal>
    </>
  );
}
