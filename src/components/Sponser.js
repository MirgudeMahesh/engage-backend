import React from 'react'
import logooo from './logooo.JPG';

import offf from '../abc.png'
import { useNavigate } from 'react-router'
import hoome from "../hom.png";
import cod from "../inf.png";
import celebrity from "../spon.png";
import user from "../prof.png";
import message from '../mess.png'
export default function Sponser() {
    const navigate=useNavigate();
    const logoutapp = () => {
      const save = prompt("enter yes to logout");
      if (save === "yes") {
        localStorage.clear();
        navigate("/");
      }
    };
  return (
    <div>
     <div className='page-home'>
        <div className='left-page-home'>
        <button className="no-btn1" onClick={()=>navigate('/')}> <div className='image-fit'><img className='image-home' src={logooo} alt="logo" /></div></button>
          <div className='navbar'></div>
        <ul className="button-list">
       <div className='manage'> <li><a><button  className="text-button" onClick={()=>{navigate('/')}}><img className='image-home1' src={hoome} alt="logo" />Home</button></a></li></div>
       <div className='manage'> <li><a><button  className="text-button" onClick={()=>{navigate('/Sponser')}}><img className='image-home1' src={cod} alt="logo" />Sponser</button></a></li></div>
       <div className='manage'> <li><a><button  className="text-button" onClick={()=>{navigate('/Influencer')}}><img className='image-home1' src={celebrity} alt="logo" />Influencer</button></a></li></div>
       <div className='manage'> <li> <a><button className="text-button" onClick={() => { navigate('/inbox') }}><img className='image-home1' src={message} alt="logo" />messages</button></a></li></div>
       <div className='manage'> <li> <a><button  className="text-button" onClick={()=>{navigate('/Myprofile')}}><img className='image-home1' src={user} alt="logo" />My profile</button></a></li></div>
      
  
  </ul>
        </div>
        
        <div className='right-page-home'>
          <p style={{marginTop:'350px',marginLeft:'450px',fontSize:'30px',fontWeight:'bold'}}>no ads yet</p> </div>
      </div>
    
    </div>
  )
}
