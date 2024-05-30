import React, { useEffect } from "react";
import logooo from "./logooo.JPG";
import hoome from "../home.png";
import cod from "../cod.png";
import celebrity from "../celebrity.png";
import user from "../user.png";
import { useNavigate } from "react-router";
export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = () => {
      localStorage.clear();
    };

    window.addEventListener("popstate", handleBack);
  });
  localStorage.getItem("name9");

  return (
    <div>
      <div className="page-home">
        <div className="left-page-home">
          <div className="image-fit">
            <img className="image-home" src={logooo} alt="logo" />
          </div>
          <div className="navbar"></div>
          <ul className="button-list">
            <div className="manage">
              {" "}
              <li>
                <a>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <img className="image-home1" src={hoome} alt="logo" />
                    Home
                  </button>
                </a>
              </li>
            </div>
            <div className="manage">
              {" "}
              <li>
                <a>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("/Sponser");
                    }}
                  >
                    <img className="image-home1" src={cod} alt="logo" />
                    Sponser
                  </button>
                </a>
              </li>
            </div>
            <div className="manage">
              {" "}
              <li>
                <a>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("/Influencer");
                    }}
                  >
                    <img className="image-home1" src={celebrity} alt="logo" />
                    Influencer
                  </button>
                </a>
              </li>
            </div>
            <div className="manage">
              {" "}
              <li>
                {" "}
                <a>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("/Myprofile");
                    }}
                  >
                    <img className="image-home1" src={user} alt="logo" />
                    My profile
                  </button>
                </a>
              </li>
            </div>
          </ul>
        </div>

        <div className="right-page-home"> </div>
      </div>
    </div>
  );
}
