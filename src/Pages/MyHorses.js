import favoriteClicked from "../icons/favoriteClicked.svg";
import { NavBar } from "../Components/NavBar";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../icons/BackButton.svg";
import { FilterDropdown } from "../Components/Filter";
import { SortByDropdown } from "../Components/SortBy";
import { useState, useEffect } from "react";
import Axios from "axios";
import HideShowPass from "../icons/HideShowPass.svg";
import HideVisibility from "../icons/HideVisibility.svg";
import Edit from "../icons/Edit.svg";
import Trash from "../icons/Trash.svg";
import { Footer } from "../Components/Footer";

export function MyHorses() {
  let navigate = useNavigate();

  const redirectAdd = () => {
    navigate("/add-horse");
  };

  const [showEmpty, setShowEmpty] = useState(false);
  const [flag, setFlag] = useState(true);

  let [myHorses, setMyHorses] = useState([]);
  let myHorsesArr = [];

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate("/login");
    }
    Axios.get(`${process.env.REACT_APP_API_URL}allhorses`).then((response) => {
      setMyHorses(response.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  let id = localStorage.getItem("id");

  for (let i = 0; i < myHorses.length; i++) {
    // eslint-disable-next-line
    if (id == myHorses[i].ID) {
      myHorsesArr.push(myHorses[i]);
      //  setFlag(false);
    }
  }

  const back = (event) => {
    event.stopPropagation();
    navigate(-1);
  };

  return (
    <div className="myHorses">
      <NavBar />
      <div className="myHorses_cont_master">
        <div className="myHorses_cont_master_header">
          <h2 className="myHorses_title">My Horses</h2>
          <Button
            title="Add Horse +"
            className="myHorses_cont_master_btn"
            onClick={redirectAdd}
          />
        </div>
        <div className="myHorses_cont_master_inner">
          <div className="myHorses_cont">
            <div className="myHorses_cont_header">
              <div className="myHorses_cont_header_back">
                <img
                  src={BackButton}
                  alt="Back to Main Page"
                  className="myHorses_cont_header_icon"
                />
                <p className="myHorses_cont_header_text" onClick={back}>
                  Back
                </p>
              </div>
              <div className="myHorses_cont_header_assets">
                <FilterDropdown />
                <SortByDropdown />
              </div>
            </div>
            {/* {showEmpty && (
              <h1>TESTING</h1>
            )} */}
            <div className="myHorses_cont_content">
              <MyHorsesCard myHorse={myHorsesArr} />
            </div>
          </div>
        </div>

        {!myHorsesArr.length && (
          <>
            <h1 className="showEmpty_header1">Nothing Here Yet</h1>
            <h2 className="showEmpty_header_sub1">
              What about adding something here?
            </h2>
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}

export function MyHorsesCard({ myHorse }) {
  let navigate = useNavigate();

  const editHorse = (horse) => {
    navigate("/edit-horse", {
      state: {
        horse: horse,
      },
    });
  };

  const deleteHorse = (id) => {
    Axios.post(`${process.env.REACT_APP_API_URL}deletehorse`, {
      id: id,
    });
    window.location.reload();
  };

  const showHorse = (horseID) => {
    Axios.post(`${process.env.REACT_APP_API_URL}horseVisibility`, {
      horseID: horseID,
      showInfo: 1,
    });
    window.location.reload();
  };

  const hideHorse = (horseID) => {
    Axios.post(`${process.env.REACT_APP_API_URL}horseVisibility`, {
      horseID: horseID,
      showInfo: 0,
    });
    window.location.reload();
  };

  return (
    <>
      {myHorse.map((horse, i) => (
        <div key={i} className="horseCard_myHorses">
          <div className="horseCard_myHorses_cont">
            <div className="horseCard_myHorses_cont_images">
              <img src={horse.thumbnail} alt="" />
              <div className="horseCard_myHorses_cont_images_favorite">
                <img src={favoriteClicked} alt="" />
                <p>{horse.likeNumbers}</p>
              </div>
            </div>
            <div className="horseCard_myHorses_cont_details">
              <h3 id="horseCard_myHorses_cont_details_name">
                {horse.horseName}
              </h3>
              <div className="horseCard_myHorses_cont_details_label">
                <h4 id="horseCard_myHorses_cont_details_labels">
                  {horse.breed.charAt(0).toUpperCase() + horse.breed.slice(1)} |{" "}
                  {horse.gender.charAt(0).toUpperCase() + horse.gender.slice(1)}{" "}
                  | {horse.horseAge} yr(s) old{" "}
                </h4>
              </div>
              <div className="horseCard_myHorses_cont_images_visibility">
                {!horse.showInfo && (
                  <div>
                    <img
                      src={HideShowPass}
                      alt="Show Horse"
                      id="show"
                      onClick={() => {
                        showHorse(horse.horseID);
                      }}
                    />
                  </div>
                )}
                {// eslint-disable-next-line
                  horse.showInfo == 1 && (
                    <div>
                      <img
                        src={HideVisibility}
                        alt="Hide Horse"
                        id="hide"
                        onClick={() => {
                          hideHorse(horse.horseID);
                        }}
                      />
                    </div>
                  )}
              </div>
              <div className="horseCard_myHorses_cont_details_btns">
                <button
                  id="horseCard_myHorses_cont_details_editBtn"
                  type="button"
                  onClick={() => {
                    editHorse(horse);
                  }}
                >
                  EDIT
                  <img src={Edit} alt="" />
                </button>
                <button
                  id="horseCard_myHorses_cont_details_deleteBtn"
                  type="button"
                  onClick={() => {
                    deleteHorse(horse.horseID);
                  }}
                >
                  DELETE
                  <img src={Trash} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
