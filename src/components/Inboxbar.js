import React from 'react'
import logooo from "./logooo.JPG";
import hoome from "../hom.png";
import cod from "../inf.png";
import celebrity from "../spon.png";
import user from "../prof.png";
import { useNavigate } from "react-router";
import offf from "../abc.png";
import message from "../mess.png";
export default function Inboxbar() {
    const navigate=useNavigate()
    const logoutapp = () => {
        const save = prompt("enter yes to logout");
        if (save === "yes") {
          localStorage.clear();
          navigate("/");
        }
      };
  return (

      <div className="left-page-home1">
          <div className="image-fit1">
          <button className="no-btn1" onClick={()=>navigate('/')}><img className="image-home7" src={logooo} alt="logo" /></button>
          </div>
          <div className="navbar"></div>

          <ul className="button-list1">
            <div className="manage1">
              {" "}

              <li>
                <a>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <img className="image-home3" src={hoome} alt="logo" />
                  </button>
                </a>
              </li>
            </div>
            <div className="manage1">
              {" "}
              <li>
                <a>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("/Sponser");
                    }}
                  >
                    <img className="image-home3" src={cod} alt="logo" />
                  </button>
                </a>
              </li>
            </div>
            <div className="manage1">
              {" "}
              <li>
                <a>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("/Influencer");
                    }}
                  >
                    <img className="image-home3" src={celebrity} alt="logo" />
                  </button>
                </a>
              </li>
            </div>
            <div className="manage1">
              {" "}
              <li>
                {" "}
                <a>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("/inbox");
                    }}
                  >
                    <img className="image-home3" src={message} alt="logo" />
                  </button>
                </a>
              </li>
            </div>
            <div className="manage1">
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
                    <img className="image-home3" src={user} alt="logo" />
                  </button>
                </a>
              </li>
            </div>
            <button
              onClick={() => logoutapp()}
              style={{
                border: "none",
                padding: "0",
                background: "none",
              }}
            >
              <img
                style={{ width: "36px", height: "36px", marginTop: "40px",marginLeft:'6px' }}
                src={offf}
              />
            </button>
          </ul>
        </div>
       
  )
}
