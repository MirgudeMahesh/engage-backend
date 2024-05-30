import React,{useEffect, useState} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import logooo from "./logooo.JPG";

import { useNavigate } from 'react-router';

import message from '../mess.png'
import hoome from "../hom.png";
import cod from "../inf.png";
import celebrity from "../spon.png";
import user from "../prof.png";
import location1 from "../loca.png"
import camera from '../cam.png'


export default function U123() {
   const navigate=useNavigate()
   const newpage = (name, mail) => {
    console.log(`/inbox/${name}`, { state: { name ,mail } });
  
    navigate(`/inbox/${name}`, { state: { name, mail } });
  }; 

  
useEffect(()=>{
    fetchData()
    totalconnections()
})

  const { name } = useParams();
  const location = useLocation();
  const { state } = location;
  const mail1 = state && state.mail ? state.mail : '';
  const[name1,setName]=useState('')
  const[followers,setFollowers]=useState('')
  const[city,setCity]=useState('')
  const[cpp,setCpp]=useState('')
  const[imageSrc,setImageSrc]=useState('')
  const[connected,setConnected]=useState(0)
const[request,setRequest]=useState('connect')
  const totalconnections = () => {
    fetch("http://localhost:8000/successful-connections")
      .then((response) => response.json())
      .then((result) => function7(result));

    function function7(result) {
     
      result.forEach((x) => {
     
        if (x.key === mail1) {
          return setConnected(x.values.length);
        }
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-info-data");
      const data = await response.json();
    
      const found = data.some((x) => x.mail === mail1);
      data.forEach((element) => {
        if (element.mail === mail1) {
          setName(element.name);
          setFollowers(element.followers);
          setCity(element.city);
          setCpp(element.cpp);
          
         setImageSrc(element.image || 'https://imgs.search.brave.com/F0IO9LFLyXvs_pkLYzYcha6hQwOquvNyTrH0kmbeNXk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMjIyNS8xMjIy/NTc3My5wbmc')
         
        }
      });
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const acknowledge = (x) => {
      
    fetch('http://localhost:8000/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(x),
    }).then(response => response.text).then(result => console.log(result));
};

  const connectionx= () => {
    const y = localStorage.getItem('name9');
    const x = { receiver: mail1, sender: y };
    acknowledge(x);
    setRequest('requested')
    
};

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
                        <div className='manage'> <li> <a><button className="text-button" onClick={() => { navigate('/inbox') }}><img className='image-home1' src={message} alt="logo" />messages</button></a></li></div>
                        <div className="manage">
                            <li>
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

        <div className="right-page-home">
        <div style={{ display: "flex", marginLeft: "400px" ,marginTop:'80px'}}>
                <p
                  style={{
                    marginTop: "px",
                    paddingRight: "28px",
                    fontSize: "24px",
                  }}
                >
                  {name1}_{name1.length}
                </p>
                <div className="button-container">
                
                  
                    <button className="edit-profile" onClick={connectionx}>
                      <p style={{ marginLeft: "20px" }}>{request}</p>
                    </button>
                
                </div>
                <div>
                <button className="edit-profile" onClick={()=>newpage(name1,mail1)} >
                      <p style={{ marginLeft: "20px" }}>message</p>
                    </button>
                
                </div>
                
                
              </div>
        <div className="row-info1">
                <div>
                  <img
                    className="card-image5" 
               
                  src={imageSrc}
                    alt="influencer"
                  />
                  

                  <p
                    style={{
                      marginLeft: "180px",
                      color:'white'
                    
                    }}
                  >
                    {name}
                  </p>

            

                  <p
                    style={{
                      color: "white",
                      marginBottom: "0px",
                      marginTop: "20px",
                      marginLeft: "180px",
                 
                    }}
                  >
                    <img className="location" src={location1} /> {city}
                  </p>
                </div>

                <div className="followers">
                  <p>{followers}  followers</p>
                </div>
                <div className="connections">
                  <p> {connected}  connections</p>
                </div>
              </div>
            <div style={{width:'900px',height:'1px',border:"0.5px solid white",marginLeft:'70px',marginTop:'50px'}}></div>
            <div style={{padding:"20px",borderRadius:'100px',border:'0.7px solid white',width:'100px',height:'100px',marginLeft:'500px',marginTop:'100px'}}> <img  className="no-posts" src={camera}/></div>
            <p style={{marginLeft:'490px',marginTop:'8px',fontWeight:'bold',fontSize:'20px'}}>No posts yet</p>
           
             </div>
      </div>
    </div>
  )
}
