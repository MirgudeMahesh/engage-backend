import React, { useEffect, useState } from "react";
import edit from "../edit.png";
import searchw from "../searc.png";
import { useNavigate } from "react-router";
export default function Userdisplay(props) {
  const [followerlist, setFollowerlist] = useState([]);
  const [info, setInfo] = useState([]);
  const [searchValue, setSearchValue] = useState('');
const navigate=useNavigate()
  useEffect(() => {
    totalconnections();
    getFollowerList();
  }, []);

  const totalconnections = async () => {
    try {
      const response = await fetch("http://localhost:8000/successful-connections");
      const result = await response.json();
      const yyy = localStorage.getItem("name9");
      const foundUser = result.find(x => x.key === yyy);
      if (foundUser) {
        setFollowerlist(foundUser.values);
      }
    } catch (error) {
      console.error("Error fetching total connections:", error);
    }
  };

  const getFollowerList = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-info-data");
      const result = await response.json();
      setInfo(result);
    } catch (error) {
      console.error("Error fetching follower list:", error);
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filtered = info.filter(entry => entry.name.includes(searchValue) && followerlist.includes(entry.mail));

  const x = localStorage.getItem("name7");
  const newpage = (name, mail) => {
    console.log(`/inbox/${name}`, { state: { name ,mail } });

    navigate(`/inbox/${name}`, { state: { name, mail } });
  };

  return (
    <div
      style={{
        width: "350px",
        height: "100%",
        paddingTop: "30px",
        paddingLeft: "12px",
        paddingRight: "12px",
        backgroundColor: "black",
        borderRight: "1px solid #c0d8c0",
      }}
    >
      <div style={{ display: "flex" }}>
        <p style={{ fontSize: "23px", marginLeft: "10px" ,fontWeight:'500'}}>{x}</p>
        <img
          style={{
            height: "30px",
            width: "30px",
            marginLeft: "auto",
            marginTop: "6px",
          }}
          src={edit}
        />
      </div>
      <div style={{ position: "relative", display: "flex", marginTop: "15px" }}>
        <input
          type="text"
          style={{
            border: "1px solid black",
            background: "none",
            padding: "none",
            backgroundColor: "#c6c3c3",
            margin: "none",
            width: "266px",

            fontWeight: "350",
            height: "27px",
            paddingRight: "40px",
            borderRadius: "15px",
          }}
          placeholder="Search"
          value={searchValue}
          onChange={handleChange}
        />
        <img
          style={{
            position: "absolute",
            right: "5px",
            top: "50%",
            transform: "translateY(-50%)",
            height: "21px",
          }}
          src={searchw}
          alt="Search Icon"
        />
      </div>
      <div
        style={{
          height: "600px",
          width: "294px",
          marginTop: "15px",
          maxHeight: "600px",
          overflowY: "scroll",
        }}
      >
        {filtered.map((x) => (
          <button className="no-btn9" onClick={() =>  newpage(x.name, x.mail)}>
            <div className="follower">
              
                <img
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "26px",
                    marginLeft: "7px",
                    border: "1px solid white",
                  }}
                  src={x.image || "https://imgs.search.brave.com/F0IO9LFLyXvs_pkLYzYcha6hQwOquvNyTrH0kmbeNXk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMjIyNS8xMjIy/NTc3My5wbmc"}
                />
              
              <div style={{ marginLeft:'15px'}}>
    <p style={{ fontSize: "15px" , marginTop: "10px",marginLeft:'auto'}}>
        <b
            style={{
                fontWeight: "500",
                fontSize: "14.6px",
                color: "white",
            }}
        >
            {x.name}</b></p> <br />
<p
         style={{ fontWeight: "200", fontSize: "13px",marginTop:'-39px',marginLeft:'20px',marginRight:'25px' }}>
                Active now
          
        </p>
    
</div>


             
             
              <div style={{ marginLeft: "auto" }}> </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
