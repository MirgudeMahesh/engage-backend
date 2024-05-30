import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Inboxbar from "./Inboxbar";
import Userdisplay from "./Userdisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPhone, faVideo, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import message from "../mess.png";
import send from '../sen.png';
import { useParams, useLocation } from 'react-router-dom';

export default function Inbox() {

  const showprofile = (name, mail) => {
    navigate(`/profile/${name}`, { state: { mail } });
  };

  const navigate = useNavigate();
  const [normal, setNormal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const { name,mail } = useParams();
  const location = useLocation();
  const { state } = location;
  const mail1 = state && state.mail ? state.mail : '';
  const name1 = state && state.name ? state.name : '';
  const messaging = () => {
    setNormal(true);
    
    setMessageInput(''); 
  };

  return (
    <div>
      <div className="page-home">
        <Inboxbar />
        <Userdisplay messaging={messaging} />
        <div className="right-page-home3">

          {!name1 ? (
            <div>
              <img style={{ marginTop: '300px', marginLeft: '550px', width: "80px", height: '80px' }} src={message} />
              <div style={{ marginLeft: '525px', marginTop: '15px' }}> <button type="button" style={{ backgroundColor: '#007bff', borderRadius: '15px', border: 'none', color: 'white', paddingLeft: '16px', paddingRight: '16px', paddingTop: '6px', paddingBottom: '6px', fontWeight: '500' }}>send message</button></div>
              <p style={{ marginLeft: '420px', marginTop: '10px', fontSize: "14px" }}>Send private photos and messages to a friend or group</p>
            </div>

           ) : (
          <div>
             <div style={{ display: "flex", borderBottom: "1px solid white", height: "100px", paddingTop: "10px", paddingBottom: "10px", alignItems: "center" }}>
               <div>
                 {" "}
                 <img style={{ marginLeft: "30px", borderRadius: "65px", width: "50px", height: "50px" }} src={selectedUser?.image || "https://imgs.search.brave.com/F0IO9LFLyXvs_pkLYzYcha6hQwOquvNyTrH0kmbeNXk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMjIyNS8xMjIy/NTc3My5wbmc"} />
               </div>
               <div>
                 {" "}
                 <button className="no-btn11" onClick={() => showprofile(name1,mail1)}>
                 <p style={{ marginLeft: "15px", fontWeight: "500", marginTop: "10px" ,color:'white'}}>
                  <b className="underline"> {name1}</b>
                 </p></button>
               </div>
               <div style={{ marginLeft: "auto", paddingRight: "30px", display: 'flex' }}>
                 <div style={{ marginLeft: '30px' }}>
                   <FontAwesomeIcon icon={faInfo} />
                 </div>{" "}
                 <div style={{ marginLeft: '30px' }}>
                   <FontAwesomeIcon icon={faVideo} />
                 </div>
                 <div style={{ marginLeft: '30px' }}>
                   <FontAwesomeIcon icon={faPhone} />
                 </div>
               </div>
             </div>
             <div style={{ height: '570px', width: '100%',borderTop:'1px solid white',marginBottom:'10px',padding:'25px' }}>
               <div >
               {/* style={{display:"flex",flexDirection:'column'}} */}
               <div className=" side right"> Helo
                 </div>
                 <div className=" side left">Hii
                   </div>
                   <div className=" side right"> How are you
                 </div>
                   </div>
             </div>
             <div style={{ position: 'relative', display: 'inline-block' }}>
               <input
                 style={{ height: '40px', width: '970px', marginLeft: '30px', borderRadius: '25px', background: 'none', border: '1px solid white', paddingLeft: '25px', fontWeight: '500', backgroundColor: 'rgb(58, 55, 55)', color: 'white' }}
                 placeholder="Message.."
                 value={messageInput}
                 onChange={(e) => setMessageInput(e.target.value)}
               />
               <FontAwesomeIcon icon={faMicrophone} style={{ position: 'absolute', top: '50%', left: '960px', transform: 'translateY(-50%)', color: 'white' }} />
               <img src={send} style={{ width: '22px', height: '22px', position: 'absolute', top: '50%', left: '1020px', transform: 'translateY(-50%)' }} />
             </div>
          </div>
           )} 
        </div>
      </div>
    </div>
  );
}
