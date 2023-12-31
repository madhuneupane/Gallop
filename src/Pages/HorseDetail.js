import Phone from "../icons/Phone.svg";
// import ProfilePic from "../icons/ProfilePic.svg";
import Favorite from "../icons/FavoriteHorse.svg";
import BackButton from "../icons/BackButton.svg";
import Location from "../icons/Location.svg";
import Link from "../icons/Link.svg";
import Email from "../icons/Email.svg";
import "../styles/pgs/AddHorse.scss";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { CarouselHorseDetail } from "../Components/CarouselHorseDetail";
import FavoriteIcon from "../icons/FavoriteIcon.svg";
import FavoriteClicked from "../icons/favoriteClicked.svg";

export function HorseDetail() {
  const [toggle, setToggle] = useState(false);
  let navigate = useNavigate();

  let location = useLocation();

  const goBack = (event) => {
    event.stopPropagation();
    navigate(-1);
  };

  async function addFavOnClick(horse) {
    try {
      await Axios.get(`${process.env.REACT_APP_API_URL}favhorses`).then(
        async (response) => {
          const favHorses = response.data;
          let flag = true;
          for (let i = 0; i < favHorses.length; i++) {
            // eslint-disable-next-line
            if (horse.horseID == favHorses[i].horseID) {
              // eslint-disable-next-line
              if (favHorses[i].ID == localStorage.getItem("id")) {
                flag = false;
                setToggle(true);
                await Axios.post(`${process.env.REACT_APP_API_URL}deletefav`, {
                  id: favHorses[i].favoriteid,
                });
              }
            }
          }
          if (flag) {
            setToggle(false);
            await Axios.post(`${process.env.REACT_APP_API_URL}addfavorite`, {
              horseid: horse.horseID,
              uid: localStorage.getItem("id"),
            });
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  const HorseObj = location.state.horse;
  let [userData, setUserData] = useState([]);
  const moreClick = () => {
    navigate("/more-owner", {
      state: {
        ownerInfo: userData,
        horses: HorseObj,
      },
    });
  };
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      navigate("/login");
    }
    Axios.get(`${process.env.REACT_APP_API_URL}get`).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        // eslint-disable-next-line
        if (response.data[i].ID == location.state.horse.ID)
          setUserData(response.data[i]);
      }
    });

    Axios.get(`${process.env.REACT_APP_API_URL}favhorses`).then(
      async (response) => {
        const favHorses = response.data;
        let flag = true;
        for (let i = 0; i < favHorses.length; i++) {
          // eslint-disable-next-line
          if (HorseObj.horseID == favHorses[i].horseID) {
            // eslint-disable-next-line
            if (favHorses[i].ID == localStorage.getItem("id")) {
              setToggle(false);
              // setPhoto(FavoriteIcon);
              flag = false;
              // setPhoto(FavoriteClicked);

              // imageElement.src = FavoriteIcon;
            }
          }
        }
        if (flag) {
          // document.getElementById("favoriteIcon").classList.add("favClicked");
          setToggle(true);
          //check = true;
          //setPhoto(FavoriteIcon);
          //imageElement.src = FavoriteClicked;
        }
      }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="horseDetail_master">
      <NavBar />
      <div className="horseDetail">
        <h2 className="horseDetail_title">Horse Detail</h2>
        <div className="horseDetail_master_inner">
          <div className="horseDetail_cont">
            <p className="horseDetail_cont_backButton" onClick={goBack}>
              <img src={BackButton} height="30px" width="30px" alt="Go Back" />
              Back
            </p>
            <div className="horseDetail_cont_one">
              <div className="horseDetail_cont_image">
                <CarouselHorseDetail HorseObj={HorseObj} />
                {/* <img
                  src={HorseObj.img}
                  height="400px"
                  width="400px"
                  alt="Selected horse"
                /> */}
              </div>
              <div className="horseDetail_cont_information">
                <div className="horseDetail_cont_information_heading">
                  <div className="horseDetail_cont_information_heading_title">
                    <h1>
                      {HorseObj.horseName.charAt(0).toUpperCase() +
                        HorseObj.horseName.slice(1)}
                    </h1>
                    <div className="horseDetail_cont_information_heading_title_buttons">
                      <a 
                        className='horseDetail_cont_information_heading_title_buttons_phoneCont'
                        href={"tel: +1" + userData.phoneNumber}>
                        <img
                          src={Phone}
                          alt="button phone"
                        ></img>
                      </a>
                      {/* <img
                        src={Favorite}
                        height="50px"
                        width="50px"
                        alt="button favorite"
                        onClick={() => {
                          addFavOnClick(HorseObj);
                        }}
                      ></img> */}

                      {/* <div
                        id="favIcon"
                        onClick={() => {
                          addFavOnClick(HorseObj);
                        }}
                      > */}
                      {toggle === false && HorseObj.showInfo ? (
                        <a
                          className="horseDetail_cont_information_heading_title_buttons_favCont"
                        >
                          <img
                            src={FavoriteClicked}
                            alt=""
                            onClick={() => {
                              addFavOnClick(HorseObj);
                            }}
                          />
                        </a>
                        
                      ) : (
                        <a 
                          className="horseDetail_cont_information_heading_title_buttons_favCont"
                        >
                          <img
                            src={FavoriteIcon}
                            alt=""
                            onClick={() => {
                              addFavOnClick(HorseObj);
                            }}
                          />
                        </a>
                        
                      )}
                      {/* <img src={photoKun} alt="" /> */}
                    </div>
                  </div>
                  <div className="horseDetail_cont_information_heading_locationAndPrice">
                    <img
                      src={Location}
                      height="10px"
                      width="10px"
                      alt="Location"
                    />
                    <p className="horseDetail_cont_information_heading_locationAndPrice_location">
                      {HorseObj.location}
                    </p>
                    <p className="horseDetail_cont_information_heading_locationAndPrice_price">
                      ${HorseObj.price}
                    </p>
                  </div>
                </div>
                <div className="horseDetail_cont_information_body">
                  <div className="horseDetail_height_age_cont">
                    <div className="horseDetail_cont_information_body_height">
                      <label>Height</label>
                      <p>{HorseObj.height + " cm"}</p>
                    </div>
                    <div className="horseDetail_cont_information_body_age">
                      <label>Age</label>
                      <p>{HorseObj.horseAge + " years"}</p>
                    </div>
                  </div>

                  <div className="horseDetail_height_color_gender">
                    <div className="horseDetail_cont_information_body_color">
                      <label>Color</label>
                      <p>{HorseObj.color}</p>
                    </div>
                    <div className="horseDetail_cont_information_body_gender">
                      <label>Gender</label>
                      <p>{HorseObj.gender}</p>
                    </div>
                  </div>

                  <div className="horseDetail_height_breedingMethod_disciplines">
                    <div className="horseDetail_cont_information_body_breedingMethod">
                      <label>Breeding Method</label>
                      <p>{HorseObj.breedingMethod}</p>
                    </div>
                    <div className="horseDetail_cont_information_body_disciplines">
                      <label>Disciplines</label>
                      <p>{HorseObj.skills}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="horseDetail_cont_two">
              <div className="horseDetail_cont_description">
                <h4>Horse Description</h4>
                <p>{HorseObj.description}</p>
              </div>
            </div>
            <div className="horseDetail_cont_three">
              <div className="horseDetail_cont_contactInfo_heading">
                <h4>Contact</h4>
              </div>
              <div className="horseDetail_cont_contactInfo_heading_content">
                <div className="horseDetail_cont_contactInfo_heading_content_infoCont">
                  <img
                    className="horseDetail_cont_contactInfo_img"
                    src={userData.userPhoto}
                    alt="Owner's profile"
                  ></img>

                  <div className="horseDetail_contactInfo_owner_forms_container">
                    <div className="horseDetail_cont_contactInfo_owner">
                      <h4>{userData.firstName + " " + userData.lastName}</h4>
                      <div className="horseDetail_cont_contactInfo_owner_location">
                        <img
                          src={Location}
                          height="15px"
                          width="15px"
                          alt="Location Icon"
                        />
                        <p>{userData.address}</p>
                      </div>
                      <div className="horseDetail_cont_contactInfo_owner_webpage">
                        <img
                          src={Link}
                          height="25px"
                          width="25px"
                          alt="WebPage Icon"
                        />
                        <a href={userData.website}>{userData.website}</a>
                      </div>
                    </div>
                    <div className="horseDetail_cont_contactInfo_contactForms">
                      <a href={"mailto:" + userData.email}>
                        <img
                          className="horseDetail_cont_contactInfo_contactForms_email"
                          src={Email}
                          height="50px"
                          width="50px"
                          alt="Email Button"
                        ></img>
                      </a>
                      <a href={"tel: +1" + userData.phoneNumber}>
                        <img
                          className="horseDetail_cont_contactInfo_contactForms_phone"
                          src={Phone}
                          height="50px"
                          width="50px"
                          alt="Phone Button"
                        ></img>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="horseDetail_cont_contactInfo_moreFromOwner">
                  <button
                    className="horseDetail_cont_contactInfo_moreFromOwner_btn"
                    onClick={moreClick}
                  >
                    Show More From Owner
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
