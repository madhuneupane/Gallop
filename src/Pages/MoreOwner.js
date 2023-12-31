import "../styles/pgs/Favourites.scss";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { FilterDropdown } from "../Components/Filter";
import { SortByDropdown } from "../Components/SortBy";
// import { HorseCard } from "../Components/HorseCard";
import BackButton from "../icons/BackButton.svg";
import GreenPhone from "../icons/GreenPhone.svg";
import Email from "../icons/Email.svg";
import Location from "../icons/Location.svg";
import Link from "../icons/Link.svg";

import "../styles/pgs/MoreOwner.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
// import { MyHorsesCard } from "./MyHorses";
import { MoreOwnerCards } from "../Components/MoreOwnerCards";



export function MoreOwner() {
  let navigate = useNavigate();

  let location = useLocation();

  let [horses, setMyHorses] = useState([]);

  let userData = location.state.ownerInfo;

  let horse = location.state.horses;

  const goBack = (event) => {
    event.stopPropagation();
    navigate(-1, {
      state: {
        horse: horse,
      }
    });
  };

  let myHorsesArr = [];

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate("/login");
    }
    Axios.get(`${process.env.REACT_APP_API_URL}allhorses`).then((response) => {
      setMyHorses(response.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  for (let i = 0; i < horses.length; i++) {
    // eslint-disable-next-line
    if (userData.ID == horses[i].ID) {
      myHorsesArr.push(horses[i]);
    }
  }

  return (
    <div className="moreOwner_master">
      <NavBar />
      <div className="moreOwner">
        <h2>More from {userData.firstName}</h2>
        <div className="moreOwner_cont">
          <div className="moreOwner_cont_header">
            <div className="moreOwner_cont_header_backButton">
              <img alt="Back to previous page" src={BackButton}></img>
              <p onClick={goBack}>Back</p>
            </div>
            <img
              className="moreOwner_cont_header_background"
              src={userData.backgroundPhoto}
              alt="Owner's profile"
            />
            <div className="moreOwner_cont_header_content">
              <img
                className="moreOwner_cont_header_content_img"
                src={userData.userPhoto}
                height="150px"
                width="150px"
                alt="Owner's profile"
              ></img>
              <div className="moreOwner_cont_header_content_fullname">
                <h1>{userData.firstName} {userData.lastName}</h1>
              </div>
              <div className="moreOwner_cont_header_content_locationAndWebAdd">
                <div className="moreOwner_cont_header_content_location">
                  <img
                    src={Location}
                    height="15px"
                    width="15px"
                    alt="Location Icon"
                  />
                  <p>{userData.address}</p>
                </div>
                <div className="moreOwner_cont_header_content_webpage">
                  <img src={Link} height="25px" width="25px" alt="WebPage Icon" />
                  <a href={userData.website}>{userData.website}</a>
                </div>
              </div>
              <div className="moreOwner_cont_header_content_bio">
                <p>{userData.bio}</p>
              </div>
              <div className="moreOwner_cont_header_content_buttons">
                <a href={"tel: +1" + userData.phoneNumber}>
                  <img alt="Contact owner through phone" src={GreenPhone}></img>
                </a>
                <a href={"mailto:" + userData.email}>
                  <img alt="Contact owner through email" src={Email}></img>
                </a>
              </div>
            </div>
          </div>
          <div className="moreOwner_cont_content">
            <div className="moreOwner_cont_content_head">
              <h2 className="moreOwner_cont_content_title">{userData.firstName}'s Horses</h2>
              <div className="moreOwner_cont_filterAndSort">
                <FilterDropdown />
                <SortByDropdown />
              </div>
            </div>

            <div className="moreOwner_cont_cards"><MoreOwnerCards myHorse={myHorsesArr} /></div>
          </div>
        </div>
        <div className="moreOwner_master_inner">
          <Footer />
        </div>
      </div>
    </div>
  );
}
