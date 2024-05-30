import React, { useEffect, useState } from "react";
import logooo from "./logooo.JPG";
import hoome from "../hom.png";
import axios from "axios";
import cod from "../inf.png";
import cross from "../cros.png";
import celebrity from "../spon.png";
import user from "../prof.png";
import pinpoint from "../pinpoint.png";
import { useNavigate } from "react-router";
import offf from "../off.png";
import message from '../mess.png'
import location from "../loca.png";
import { connection } from "mongoose";
import yes from "../yes.png";
import no from "../no.png";
import edit from "../edit.png";
import confirm from "../confirmed.png";
import rejected from "../reject.png";
import deletee from "../delete.png";
import searchw from "../searc.png";
export default function Myprofile() {
  const [accepted, setAccepted] = useState(true);
  const name7 = localStorage.getItem("name7");
  const [title, setTitle] = useState(false);
  const[showtitle,setShowtitle]=useState(false)
  const [warning, setWarning] = useState("");
  const [va, setva] = useState(false);
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [cpp, setCpp] = useState();

  const [check, setCheck] = useState(null); // Initialize as null
  const [createprofile, setcreateprofile] = useState("loading..");
  const [click, setClick] = useState(true);
  const [submit, setSubmit] = useState("submit");
  const [Connection, setConnection] = useState([]);
  const [reqresult, setreqresult] = useState([]);
  const [followers, setFollowers] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const [editedText, setEditedText] = useState("");
  const [editedText1, setEditedText1] = useState("");
  const [connected, setConnected] = useState(0);
  const [reject, setReject] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [load, showLoad] = useState(false);
  const [list1, showList] = useState(false);
  const[photo,setPhoto]=useState(false)
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleInputlocation = (event) => {
    setEditedText1(event.target.value);
  };

  const [imageSrc, setImageSrc] = useState("");

  const handleFileInputChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleUpload = () => {
    const abp = localStorage.getItem("name9");

    fetch("http://localhost:8000/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Origin": "*",
      },
      body: JSON.stringify({
        base64: imageSrc,
        mail: abp, // Sending abp variable in the request body
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    showLoad(false);
  };

  const delete1 = () => {
    console.log("helo");
    const key1 = localStorage.getItem("name9");
    const resy = { mail: key1 };

    fetch("http://localhost:8000/delete-image", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON",
      },
      body: JSON.stringify(resy),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
      setPhoto(false)
  };
  const [confirmedRejectRequests, setConfirmedRejectRequests] = useState([]);
  ///
  const rejectfollower = (mail) => {
    setConfirmedRejectRequests([...confirmedRejectRequests, mail]);
    const key1 = localStorage.getItem("name9");
    const ress = { key: key1, value: mail };

    setAccepted(false);
    setReject(false);

    const rest = { receiver: key1, sender: mail };
    fetch("http://localhost:8000/delete-request", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON",
      },
      body: JSON.stringify(rest),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  const [followerlist, setFollowerlist] = useState([]);
  

  const totalconnections = () => {
    fetch("http://localhost:8000/successful-connections")
      .then((response) => response.json())
      .then((result) => function7(result));

    function function7(result) {
      const yyy = localStorage.getItem("name9");
      result.forEach((x) => {
        if (x.key === yyy) {
          console.log(x.values)
          setFollowerlist(x.values);
          return setConnected(x.values.length);
        }
      });
    }
  };
  const [info, setInfo] = useState([]);

  const getfollowerlist = () => {
    fetch("http://localhost:8000/get-info-data")
      .then((response) => response.json())
      .then((result) => setInfo(result));
  };
  ///
  ///
  const [confirmedRequests, setConfirmedRequests] = useState([]);
  const confirmfollower = (mail) => {
    setConfirmedRequests([...confirmedRequests, mail]);

    const key1 = localStorage.getItem("name9");
    const ress = { key: key1, value: mail };

    setAccepted(false);

    fetch("http://localhost:8000/addKeyValues", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON",
      },
      body: JSON.stringify(ress),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
    //
    
    const ress1 = { key: mail, value: key1 };

    setAccepted(false);

    fetch("http://localhost:8000/addKeyValues1", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON",
      },
      body: JSON.stringify(ress1),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
//
    const resx = { key: mail, value: key1 };

  
    const rest = { receiver: key1, sender: mail };
    fetch("http://localhost:8000/delete-request", {
      method: "POST",
      headers: {
        "Content-type": "application/JSON",
      },
      body: JSON.stringify(rest),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
    //
  };

  ///
  const handleSaveClick = () => {
    setName(editedText);
    setCity(editedText1);

    const xc = localStorage.getItem("name9");
    const pdx = { mail: xc, name: editedText, city: editedText1 };

    fetch("http://localhost:8000/edit-save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdx),
    })
      .then((response) => response.json())
      .then((result) => console.log("yess"));

    setIsEditing(false);
  };

  const getConnections = () => {
    const abcd = localStorage.getItem("name9");
    const pdd = { receiver: abcd };

    fetch("http://localhost:8000/getrequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdd),
    })
      .then((response) => response.json())
      .then((result) => function1(result));

    function function1(data) {
      let arr = [];
      data.forEach((x) => {
        arr.push(x.sender);
      });

      if (arr.length !== 0) {
        setva(true);
      }
      setConnection(arr);
    }
  };

  const logoutapp = () => {
    const save = prompt("enter yes to logout");
    if (save === "yes") {
      localStorage.clear();
      navigate("/");
    }
  };

  const getrequestdata = () => {
    fetch("http://localhost:8000/get-info-data")
      .then((response) => response.json())
      .then((result) => function2(result));

    function function2(result) {
      let arr1 = [];
      result.forEach((x) => {
        if (Connection.includes(x.mail)) {
          var l = {
            name: x.name,
            followers: x.followers,
            cpp: x.cpp,
            city: x.city,
            mail: x.mail,
          };
          arr1.push(l);
        }
      });
   setShowtitle(true)
      setreqresult(arr1);
      
  
    }
  };
  

  useEffect(() => {
    fetchData();
    getConnections();
    totalconnections();
    getfollowerlist();

   
   

    // getdata()
  }, []);
  const insertbiodata = () => {
    const user = document.getElementById("name-form").value;
    const foll = document.getElementById("followers-form").value;

    const citi = document.getElementById("city-form").value;
    const cost = document.getElementById("cpp-form").value;
    const bioo = document.getElementById("bio-form").value;
    if (user === "" || foll === "" || citi === "" || cost === "") {
      alert("Fill in all the details");
    } else if (!/^\d+$/.test(cost) || !/^\d+$/.test(foll)) {
      setWarning(" cost per photo and followers  should be integer");

      setTimeout(() => {
        setWarning("");
      }, 3000);
    } else {
      const xxx = localStorage.getItem("name9");
      const pd = {
        name: user,
        followers: foll,
        city: citi,
        cpp: cost,
        bio: bioo,
        mail: xxx,
      };

      fetch("http://localhost:8000/insert-inf-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pd),
      })
        .then((response) => response.text())
        .then((result) => console.log(result))

        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-info-data");
      const data = await response.json();
      const ele = localStorage.getItem("name9");
      const found = data.some((x) => x.mail === ele);
      data.forEach((element) => {
        if (element.mail === ele) {
          setName(element.name);
          setFollowers(element.followers);
          setCity(element.city);
          setCpp(element.cpp);

          setImageSrc(element.image || "");
        }
      });
      setCheck(found);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = () => {
    setSubmit("submitted");
    insertbiodata();
  };

  const openprofile = () => {
    setClick(false);
  };

  const navigate = useNavigate();

  //   const getdata = () => {
  //     const xq = localStorage.getItem('name9');
  //     fetch(`http://localhost:8000/images/${xq}`).then(response=>response.text()).then(data=>setImageSrc(data))

  //       .catch(error => {
  //         console.error('Error fetching image:', error);

  //       });
  // };
  const showprofile = (name, mail) => {
    navigate(`/profile/${name}`, { state: { mail } });
  };
  
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (event) => {
    setSearchValue(event.target.value);
};
const filtered = info.filter(entry => entry.name.includes(searchValue));
  return (
    <div>
      <div className="page-home">
        <div className="left-page-home">
          <div className="image-fit">
           <button className="no-btn1" onClick={()=>navigate('/')}> <img className="image-home" src={logooo} alt="logo" /></button>
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
            <div className='manage'> <li> <a><button className="text-button" onClick={() => { navigate('/inbox') }}><img className='image-home1' src={message} alt="logo" />messages</button></a></li></div>
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
        <div
          style={{
            borderLeft:'1px solid white',
            width: " 1050px",
            backgroundColor: "black",
            backdropFilter: list1 || photo ? "blur(10px)" : "none", // Conditionally apply blur filter
  filter: list1 || photo ? "brightness(0.4)" : "none", // Conditionally apply brightness filter
  pointerEvents: list1 || photo ? "none" : "auto" // Conditionally disable pointer events
          }}
        >
          {check === null ? ( // Show "Loading.." if check is null
            <p
              style={{
                marginTop: "350px",
                marginLeft: "450px",
                fontSize: "20px",
                color: "white",
              }}
            >
              Loading...
            </p>
          ) : check ? ( // Show "hello" if check is true
            <div className="bio-data">
              <div style={{ display: "flex", marginLeft: "400px" }}>
                <p
                  style={{
                    marginTop: "px",
                    paddingRight: "28px",
                    fontSize: "24px",
                    
                  }}
                >
                  {name7}
                </p>
                <div className="button-container">
                  {" "}
                  {!isEditing ? (
                    <button className="edit-profile" onClick={handleEditClick}>
                      <p style={{ marginLeft: "20px" }}>edit profile</p>
                    </button>
                  ) : (
                    <button className="edit-profile" onClick={handleSaveClick}>
                      <p style={{ marginLeft: "20px" }}>save</p>
                    </button>
                  )}
                </div>
                <div className="button-container">
                  <button className="edit-profile" onClick={getrequestdata}>
                    {{ va } && (
                      <div
                        style={{
                          marginLeft: "12px",
                          marginRight: "-10px",
                          marginTop: "4px",
                          paddingLeft: "5px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "20px",
                          
                        }}
                      >
                    {Connection.length > 0 &&  <p
                          style={{
                            color: "black",
                            marginRight: "10px",
                            marginTop: "-2px",
                            backgroundColor:'white',
                            width:'20px',
                            borderRadius:'25px',
                            
                            fontSize:'13.5px',
                            marginTop:
                            '0.1px'
                          }}
                        >
                          {Connection.length}
                        </p> }
                      </div> 
                    )}{" "}
                    {Connection.length > 0 ?(
                    <p style={{ marginLeft: "20px" }}>requests</p>):(<p style={{ marginLeft: "5px" }}>requests</p>)}
                  </button>
                </div>
                <button
                  onClick={logoutapp}
                  style={{
                    border: "none",
                    padding: "0",
                    background: "none",
                    marginLeft: "20px",
                    marginBottom: "25px",
                  }}
                >
             <img src={offf} />
                </button>
              </div>
              <div className="row-info">
                <div>
           
                  <div
                    style={{ position: "relative", display: "inline-block",marginLeft:'150PX' }}
                  >
                  <button className="no-btn1"> <img
                      className="card-image6"
                      src={
                        imageSrc
                          ? imageSrc
                          : "https://www.shutterstock.com/image-vector/vector-add-user-icon-plus-600nw-164452175.jpg"
                      }
                      alt="influencer"   onClick={()=>setPhoto(true)}  />
                      
                   </button>    

                  </div>

                  <p
                    style={{
                      marginLeft: "180px",
                      marginTop: "15px",
                      visibility: !isEditing ? "visible" : "hidden",
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
                      visibility: !isEditing ? "visible" : "hidden",
                    }}
                  >
                    <img className="location" src={location} /> {city}
                  </p>
                </div>

                <div className="followers">
                  <p>{followers} followers</p>
                </div>
                <div className="connections">
                  <button className="no-btn1" onClick={() => showList(true)}>
                    <p style={{ fontWeight: "500" ,color:'white'}}>{connected} connections</p>
                  </button>
                </div>
              </div>
              <div
                style={{
                  width: "900px",
                  border: "1px solid white",
                  marginTop: "35px",
                  marginLeft: "40px",
                }}
              ></div>

              <div>
                {" "}
                <button className="Advertisement">Advertisment</button>
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                {load ? (
                  <button
                    style={{ marginLeft: "473px", marginTop: "50px" }}
                    type="button"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                ) : (
                  <p></p>
                )}
              </div>

              {isEditing ? (
                <div
                  style={{
                    marginTop: "30px",
                    width: "500px",
                    height: "150px",
                    border: "2px solid black",
                    marginLeft: "250px",
                    borderRadius: "20px",
                    padding: "20px",
                    backgroundColor: "#292b2d",
                  }}
                >
                  <p style={{ marginLeft: "200px", marginTop: "-15px" }}>
                    <b>editing</b>
                    <img className="edit-image" src={edit} />
                  </p>
                  <input
                    style={{
                      marginLeft: "50px",
                      borderRadius: "20px",
                      marginLeft: "150px",
                    }}
                    value={editedText !== "" ? editedText : name} // Reflect the edited text properly
                    onChange={handleInputChange}
                  />
                  <input
                    style={{
                      marginLeft: "50px",
                      marginTop: "20px",
                      borderRadius: "20px",
                      marginLeft: "150px",
                    }}
                    value={editedText1 !== "" ? editedText1 : city} // Reflect the edited text properly
                    onChange={handleInputlocation}
                  />
                </div>
              ) : (
                <p></p>
              )}
            </div>
          ) : !click ? ( // Show profile form if click is false
            <div className="my-profile">
              <div>
                <input
                  className="usernamex"
                  name="email"
                  placeholder="Name"
                  id="name-form"
                  required
                />
              </div>
              <div>
                <input
                  className="usernamex"
                  name="email"
                  placeholder="followers"
                  id="followers-form"
                  required
                />
              </div>
              <div>
                <input
                  className="usernamex"
                  name="email"
                  placeholder="City"
                  id="city-form"
                  required
                />
              </div>
              <div>
                <input
                  className="usernamex"
                  name="email"
                  placeholder="cost per story"
                  id="cpp-form"
                  required
                />
              </div>
              <div>
                <input
                  className="usernamex"
                  name="email"
                  placeholder="Bio"
                  id="bio-form"
                  required
                />
              </div>
              <button className="profile-submit" onClick={onSubmit}>
                {submit}
              </button>
              <p>{warning}</p>
            </div>
          ) : (
            <button className="profile-button" onClick={openprofile}>
              {check ? "Loading.." : "createprofile"}
            </button> // Show button accordingly
          )}
        </div>
       


          <div className="request-section">
            {showtitle &&
            <div
              style={{
                marginLeft: "40px",
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
             {Connection.length>0 ?(<b>my requests</b>):(<b>no requests</b>)}
            </div>}

            {reqresult.map((x, index) => (
              
             
              <div className="request-member" key={index}>
                <div className="upper-part">
                  <img
                    className="card-image3"
                    src={x.image||"https://imgs.search.brave.com/F0IO9LFLyXvs_pkLYzYcha6hQwOquvNyTrH0kmbeNXk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMjIyNS8xMjIy/NTc3My5wbmc"}
                    alt="influencer"
                  />

                  <div>
                    {" "}
                    {/* <p style={{ marginLeft: "15px",fontWeight:'700',fontSize:'15px' }}>
                      {x.name}
                    </p> */}
                    <button
                          className="no-btn11"
                          onClick={() => showprofile(x.name, x.mail)}
                        >
                          {/* <b className="underline">{x.name}</b> */}
                          <p style={{ marginLeft: "15px",fontWeight:'700',fontSize:'15px' }}>
                     <b className="underline"> {x.name}</b>
                    </p>
                        </button>
                    <p
                      style={{
                        fontSize: "12px",
                        marginTop: "-15px",
                        marginLeft: "17px",
                      }}
                    >
                      {" "}
                      followers: {x.followers}
                    </p>
                  </div>
                </div>

                {/* {accepted ?( */}
                  <div className="lower-part">
                    <button
                      className="yesbutton"
                      onClick={() => confirmfollower(x.mail)}
                      disabled={confirmedRequests.includes(x.mail)}
                    >
                      <img className="yesb" src={yes} alt="Yes" />
                    </button>
                    <button
                      className="nobutton"
                       onClick={() =>rejectfollower(x.mail)}
                       disabled={confirmedRejectRequests.includes(x.mail)}
                    >
                      <img className="nob" src={no} alt="No" />
                    </button>
                  </div>
                {/* ) : reject ? (
                  <div style={{ marginLeft: "90px", marginTop: "-10px" }}>
                    <img className="confirm" src={confirm} alt="Confirm" />
                  </div>
                ) : (
                  <div style={{ marginLeft: "90px", marginTop: "-10px" }}>
                    <img className="confirm" src={rejected} alt="Confirm" />{" "}
                  </div>
                )} */}

              </div>
              
            ))}
          </div>
        

        {list1 && (
          <div
            style={{
              width: "300px",
              height: "350px",
              border: "2px solid black",
              position: "fixed",
              top: "30%",
              left: "40%",
              backgroundColor: "#211f1f",
              borderRadius: "15px",
            }}
          >
            <div style={{ display: "flex" }}>
              <p
                style={{
                  color: "white",
                  marginTop: "10px",
                  fontWeight: "bold",
                  marginLeft: "90px",
                  fontSize: "17px",
                }}
              >
                connections
              </p>
              <button className="no-btn2" onClick={() => showList(false)}>
                <img
                  style={{ width: "20px", height: "20px", marginBottom: "5px" }}
                  src={cross}
                />
              </button>
            </div>
            <div
              style={{
                width: "297px",
                borderTop: "0.1px solid white",
                height: "1px",
                paddingTop: "2px",
              }}
            ></div>
            <div
              style={{ display: "flex", backgroundColor: "rgb(48, 48, 48)" }}
            >
              <div style={{ position: "relative", display: "flex" }}>
                <input
                  type="text"
                  style={{
                    borderRight: "1px solid black",
                    background: "none",
                    padding: "none",
                    backgroundColor: "#211f1f",
                    margin: "none",
                    width: "298px",
                    color: "white",
                    fontWeight: "50",
                    height: "30px",
                    paddingRight:
                      "40px" /* Adjust the padding-right to accommodate the image */,
                    borderBottom: "1px  solid black",
                  }}
                  placeholder="Search"
                  value={searchValue} onChange={handleChange}
                />
                <img
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "17px",
                  }}
                  src={searchw}
                  alt="Search Icon"
                />
              </div>
            </div>

            <div className="follower-container">
              { filtered.length > 0 ?(
              filtered.map((cd) => {
               
                if (!followerlist.includes(cd.mail)) {
                  return null;
                }

                return (
                  <div className="follower">
                    <div>
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "26px",
                        }}
                        src={
                          cd.image ||
                          "https://imgs.search.brave.com/F0IO9LFLyXvs_pkLYzYcha6hQwOquvNyTrH0kmbeNXk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMjIyNS8xMjIy/NTc3My5wbmc"
                        }
                      />
                    </div>
                    <div style={{ marginLeft: "20px", alignItems: "center" }}>
                      {" "}
                      <p style={{ fontSize: "13px", marginTop: "10px" }}>
                        <button
                          className="no-btn11"
                          onClick={() => showprofile(cd.name, cd.mail)}
                        >
                          <b className="underline">{cd.name}</b>
                        </button>
                        <br />
                        {cd.city}
                      </p>
                    </div>
                    <div style={{  marginLeft:'auto' }}>
                      {" "}
                      <button
                        style={{
                          border: "none",
                          borderRadius: "10px",
                          backgroundColor: "rgb(187, 187, 187)",
                          height: "20px",
                          paddingBottom: "25px",
                          fontWeight: "500",
                          fontSize: "13px",
                         
                        }}
                      >
                        connected
                      </button>
                    </div>
                  </div>
                );
              })):(<p style={{marginTop:"60px",marginLeft:'90px',fontWeight:'300'}}>no result found</p>)}
            </div>
          </div>
        )}
        {photo &&
      
        <div style={{
           paddingTop:'20px',
              width: "300px",
              height: "250px",
              border: "2px solid black",
              position: "fixed",
              top: "30%",
              left: "40%",
              backgroundColor: "#211f1f",
              borderRadius: "15px",
            }}>
             <div style={{width:'100%',marginBottom:'30px',paddingLeft:'90px',fontWeight:'500',borderBottom:'1px solid black',paddingBottom:'10px'}}>profile settings</div>
           <button className="no-btn7"   onClick={() => {
                        const inputElement =
                          document.getElementById("file-input");
                        inputElement.click();
                        showLoad(true);
                        setPhoto(false);
                      }}><p style={{color:'#62c975'}}>  upload image</p></button> 

         <button className="no-btn7" onClick={()=>delete1()}> <p style={{color:'rgb(190, 93, 93)'}}>delete current photo</p></button> 
      
          <button className="no-btn7" onClick={()=>setPhoto(false)}> cancel</button>
        </div> 
        }
      
      </div>
    </div>
  );
}
