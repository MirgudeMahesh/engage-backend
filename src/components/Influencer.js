import React, { useState, useEffect } from "react";
import logooo from "./logooo.JPG";
import hoome from "../hom.png";
import cod from "../inf.png";
import celebrity from "../spon.png";
import user from "../prof.png";
import message from "../mess.png";
import { useNavigate } from "react-router";
import location from "../location.png";
import blueloc from "../blueloc.png";
import search from "../search.png";

export default function Influencer() {
  const [loading, setLoading] = useState(true);
  const [exceptions, setExceptions] = useState([]);
  const [ddata, setDData] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const fetch1Data = async () => {
    try {
      // Fetch data from http://localhost:8000/getrequests1
      const response1 = await fetch("http://localhost:8000/getrequests1");
      if (!response1.ok) {
        throw new Error("Failed to fetch data from getrequests1");
      }
      const data1 = await response1.json();

      // Process data1 and set exceptions
      let arr = [];
      data1.forEach((x) => {
        const ele = localStorage.getItem("name9");
        if (x.sender === ele) {
          arr.push(x.receiver);
        }
      });
    //   setExceptions(arr);

      // Fetch data from http://localhost:8000/successful-connections
      const response2 = await fetch(
        "http://localhost:8000/successful-connections"
      );
      if (!response2.ok) {
        throw new Error("Failed to fetch data from successful-connections");
      }
      const result = await response2.json();

      // Process result and update exceptions
      const yyy = localStorage.getItem("name9");
      let uniqueValues = new Set(); // Create a Set to store unique values
      result.forEach((x) => {
        if (x.key === yyy) {
          // Add x.values to the Set
          x.values.forEach((value) => uniqueValues.add(value));
        }
      });
      // Update state with unique values from the Set
      setExceptions((prevExceptions) => [...arr, ...uniqueValues]);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display an error message to the user
    }
  };
 

  const fetchData = async () => {
    try {
      const itemi = localStorage.getItem("name9");
      const pd = { mail: itemi };

      const response = await fetch("http://localhost:8000/get-inf-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pd),
      });
      setLoading(false);
      const result = await response.json();
      setDData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const newpage = (name, mail) => {
    console.log(`/profile/${name}`, { state: { mail } });

    navigate(`/profile/${name}`, { state: { mail } });
  };
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    fetchData();
    fetch1Data();
  }, []);

  const acknowledge = (x) => {
    fetch("http://localhost:8000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(x),
    })
      .then((response) => response.text)
      .then((result) => console.log(result));
  };

  const request = (mail) => {
    const y = localStorage.getItem("name9");
    const x = { receiver: mail, sender: y };
    acknowledge(x);
    setDData(
      ddata.map((item) => {
        if (item.mail === mail) {
          return { ...item, buttonClicked: true, click: "request sent" };
        }
        return item;
      })
    );
  };

  const filtered = ddata.filter((entry) => entry.name.includes(searchValue));

  return (
    <div>
      <div className="page-home">
        <div className="left-page-home">
          <div className="image-fit">
          <button className="no-btn1" onClick={()=>navigate('/')}>  <img className="image-home" src={logooo} alt="logo" /></button>
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
            <div className="manage">
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
                    <img className="image-home1" src={message} alt="logo" />
                    messages
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
         
          <div
            style={{ marginTop: "80px", marginLeft: "50px", display: "flex" }}
          >
            <input
              className="search"
              value={searchValue}
              onChange={handleChange}
              placeholder="search"
            />
            <button className="search-button">
              <img className="search-logo" src={search} />
            </button>
          </div>
          {!loading ? (
            <div className="card-container">
                { filtered.length > 0 ?
                (
              filtered.map((cd) => {
                if (exceptions.includes(cd.mail)) {
                  return null; // If the condition is not met, return null to render nothing
                }

                return (
                  <div className="card" key={cd.mail}>
                    <img
                      className="card-image"
                      src={
                        cd.image
                          ? cd.image
                          : "https://imgs.search.brave.com/F0IO9LFLyXvs_pkLYzYcha6hQwOquvNyTrH0kmbeNXk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMjIyNS8xMjIy/NTc3My5wbmc"
                      }
                      alt="influencer"
                    />
                    <p
                      style={{
                        marginLeft: "30px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        color: "black",
                      }}
                    >
                      <button
                        style={{
                          marginLeft: "-30px",
                          background: "none",
                          border: "none",
                          padding: "0",
                          margin: "0",
                          color: "black",
                        }}
                        onClick={() => newpage(cd.name, cd.mail)}
                      >
                        <b className="underline">{cd.name}</b>
                      </button>
                    </p>
                    <p
                      style={{
                        marginLeft: "9px",
                        color: "white",
                        marginBottom: "0px",
                        marginTop: "10px",
                      }}
                    >
                      <img className="location" src={location} /> {cd.city}
                    </p>

                    <p
                      style={{
                        marginLeft: "15px",
                        color: "black",
                        marginBottom: "10px",
                      }}
                    >
                      Followers: {cd.followers}
                    </p>
                    <p style={{ marginLeft: "15px", color: "black" }}>
                      Cost per photo: {cd.cpp}
                    </p>
                    <button
                      onClick={() => request(cd.mail)}
                      disabled={cd.buttonClicked}
                    >
                      {cd.click || "request"}
                    </button>
                  </div>
                );

              }) ):(
                <p style={{marginTop: "200px",
                marginLeft: "270px",
                fontSize: "20px"}}>no such user existed.</p> // Display message when no results found
              )}
            </div>
          ) : (
            <p
              style={{
                marginTop: "250px",
                marginLeft: "400px",
                fontSize: "25px",
              }}
            >
              Loading...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import logooo from "./logooo.JPG";
// import hoome from "../home.png";
// import cod from "../cod.png";
// import celebrity from "../celebrity.png";
// import user from "../user.png";
// import { useNavigate } from "react-router";
// import location from '../location.png'
// import search from '../search.png'

// export default function Influencer() {
//     const [loading, setLoading] = useState(true);
//     const [exceptions, setExceptions] = useState([]);
//     const [ddata, setDData] = useState([]);
//     const navigate = useNavigate();
//     const [searchValue, setSearchValue] = useState('');

//     const fetch1Data = async () => {
//         fetch('http://localhost:8000/getrequests1')
//             .then(response => response.json())
//             .then(result => func(result));

//         function func(data1) {
//             let arr = [];
//             data1.forEach(x => {
//                 const ele = localStorage.getItem('name9');

//                 if (x.sender === ele) {
//                     arr.push(x.receiver);
//                 }
//             });
//             setExceptions(arr);
//         }
//     };

//     const fetchData = async () => {
//         try {
//             const itemi = localStorage.getItem('name9');
//             const pd = { mail: itemi };

//             const response = await fetch("http://localhost:8000/get-inf-data", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(pd),
//             });
//             setLoading(false)
//             const result = await response.json();
//             setDData(result);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const newpage = (name, mail) => {
//         navigate(`/profile/${name}`, { state: { mail } });
//     }

//     useEffect(() => {
//         fetchData();
//         fetch1Data();
//     }, []);

//     const acknowledge = (x) => {
//         fetch('http://localhost:8000/requests', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(x),
//         }).then(response => response.text).then(result => console.log(result));
//     };

//     const request = (mail) => {
//         const y = localStorage.getItem('name9');
//         const x = { receiver: mail, sender: y };
//         acknowledge(x);
//         setDData(ddata.map(item => {
//             if (item.mail === mail) {
//                 return { ...item, buttonClicked: true, click: 'request sent' };
//             }
//             return item;
//         }));
//     };

//     const handleChange = (event) => {
//         setSearchValue(event.target.value);
//     };

//     const filteredData = ddata.filter(entry => entry.name.includes(searchValue));

//     return (
//         <div>
//             <div className="page-home">
//                 <div className="left-page-home">
//                     <div className="image-fit">
//                         <img className="image-home" src={logooo} alt="logo" />
//                     </div>
//                     <div className="navbar"></div>
//                     <ul className="button-list">
//                         <div className="manage">
//                             <li>
//                                 <a>
//                                     <button
//                                         className="text-button"
//                                         onClick={() => {
//                                             navigate("/");
//                                         }}
//                                     >
//                                         <img className="image-home1" src={hoome} alt="logo" />
//                                         Home
//                                     </button>
//                                 </a>
//                             </li>
//                         </div>
//                         <div className="manage">
//                             <li>
//                                 <a>
//                                     <button
//                                         className="text-button"
//                                         onClick={() => {
//                                             navigate("/Sponser");
//                                         }}
//                                     >
//                                         <img className="image-home1" src={cod} alt="logo" />
//                                         Sponser
//                                     </button>
//                                 </a>
//                             </li>
//                         </div>
//                         <div className="manage">
//                             <li>
//                                 <a>
//                                     <button
//                                         className="text-button"
//                                         onClick={() => {
//                                             navigate("/Influencer");
//                                         }}
//                                     >
//                                         <img className="image-home1" src={celebrity} alt="logo" />
//                                         Influencer
//                                     </button>
//                                 </a>
//                             </li>
//                         </div>
//                         <div className="manage">
//                             <li>
//                                 <a>
//                                     <button
//                                         className="text-button"
//                                         onClick={() => {
//                                             navigate("/Myprofile");
//                                         }}
//                                     >
//                                         <img className="image-home1" src={user} alt="logo" />
//                                         My profile
//                                     </button>
//                                 </a>
//                             </li>
//                         </div>
//                     </ul>
//                 </div>
//                 <div className="right-page-home">
//                     <div style={{marginTop:'80px',marginLeft:'50px',display:'flex'}}>
//                         <input className="search" value={searchValue} onChange={handleChange} placeholder="search"/>
//                         <button className="search-button"><img className="search-logo" src={search} alt="search"/></button>
//                     </div>
//                     {!loading ? (
//                         <div className="card-container">
//                             {filteredData.length === 0 ? (
//                                 <p>No such result</p>
//                             ) : (
//                                 filteredData.map((cd) => (
//                                     <div className="card" key={cd.mail}>
//                                         <img
//                                             className="card-image"
//                                             src={cd.image ? cd.image : "https://imgs.search.brave.com/F0IO9LFLyXvs_pkLYzYcha6hQwOquvNyTrH0kmbeNXk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMjIyNS8xMjIy/NTc3My5wbmc"}
//                                             alt="influencer"
//                                         />
//                                         <p style={{ marginLeft: "30px", marginTop: "10px",marginBottom:"10px", color: "black"  }}>
//                                             <button style={{marginLeft: "-30px",background:'none',border:'none',padding:'0',margin:'0',color:'black'}} onClick={() => newpage(cd.name, cd.mail)}>
//                                                 <b className="underline">{cd.name}</b>
//                                             </button>
//                                         </p>
//                                         <p>
//                                             <p style={{marginLeft:'9px',color:'white',marginBottom:'0px',marginTop:'10px'}}><img className="location" src={location}/>  {cd.city}</p>
//                                         </p>
//                                         <p style={{ marginLeft: "15px", color: "black" ,marginBottom:"10px",}}>Followers: {cd.followers}</p>
//                                         <p style={{ marginLeft: "15px", color: "black" }}>Cost per photo: {cd.cpp}</p>
//                                         <button onClick={() => request(cd.mail)} disabled={cd.buttonClicked}>
//                                             {cd.click || 'request'}
//                                         </button>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     ) : (
//                         <p style={{marginTop:'250px',marginLeft:'400px',fontSize:'25px'}}>Loading...</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
