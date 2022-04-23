import React, { useContext, useState } from "react";
import { format, getDate } from "date-fns";
import moment from "moment";
import {
  FaTrash,
  FaRegSmileBeam,
  FaRegMeh,
  FaRegFrown,
  FaPencilAlt,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { MealContext } from "./MealList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Meal(props, i) {
  let { meals, setMeals } = useContext(MealContext);
  let [modalOpen, setModalOpen] = useState(false);
  // const onLike = props.onLike;
  const m = props.meal;
  const history = useHistory();

  const deleteMeal = () => {
    console.log("Delete meal was called");
    fetch(`/api/meals/${m.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(() => {
        toast("Successfully deleted", {
          onClose: () => {
            document.location = "/meals";
          },
        });

        setModalOpen(false);
      })
      .catch((error) => {
        toast("Failed to submit", {
          onClose: () => {
            document.location = "/meals";
          },
        });
      });
  };

  const ratingIcon = () => {
    if (m.rating === 3) {
      return <FaRegSmileBeam color="green" size={50} />;
    } else if (m.rating === 2) {
      return <FaRegMeh color="yellow" size={50} />;
    } else if (m.rating === 1) {
      return <FaRegFrown color="red" size={50} />;
    }
  };
  const getDate = (date) => {
    let formattedDate = moment(date).utc().format("MM-DD-YYYY");
    return formattedDate;
  };

  return (
    <>
      <div className="card mb-5 myCard w-100">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-2 col-sm-12 text-center align-items-center">
              <div className="row">
                <div className="text-center w-100 mb-3">
                  <img src={m.picture} alt={m.mealTitle} className="w-100" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-2"></div>
                <div className="col-4">
                  <FaTrash color="grey" onClick={() => setModalOpen(true)} />
                </div>
                <div className="col-4">
                  <FaPencilAlt
                    color="grey"
                    onClick={() => history.push(`/meals/${m.id}/edit`)}
                  />
                </div>
                <div className="col-2"></div>
              </div>
            </div>
            <div className="col-lg-10 col-sm-12 px-5">
              <div className="row">
                <div className="col-8">
                  <h5 className="cart-title">{m.mealTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-danger">
                    {m.restaurant}
                  </h6>
                  <p className="text-muted">{getDate(m.rating)}</p>
                </div>
                <div className="col-4 ">
                  <div className="w-100 float-right">{ratingIcon()}</div>
                </div>
              </div>
              <hr />
              <div className="row">
                <p>{m.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        contentLabel="Are you sure?"
      >
        <p>Are you sure you want to delete this quote?</p>
        <button className="btn btn-danger" onClick={deleteMeal}>
          Confirm Delete
        </button>
        <button
          className="btn btn-secondary mx-3"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </button>
      </Modal>
    </>
  );
}
