import React, { useState, useContext } from "react";
import ContextSample from "./Contextsample";
import { useNavigate } from "react-router";
export default function Sender(props) {
  const [name7, setname7] = useState("");
  const [name9, setname9] = useState("");
  const navigate = useNavigate();
  const[change,setChange]=useState(false)
  const [role, setrole] = useState("None");
  const [warning, setWarning] = useState("");

  const myFunction = () => {
    setrole("influencer");
  };
  const myFunction2 = () => {
    setrole("sponser");
  };

  const handleRegister = () => {
    const username = document.getElementById("namesu").value;
    const Email = document.getElementById("mailsu").value;

    const password = document.getElementById("passwordsu").value;

    if (username === "" || Email === "" || password === "") {
      alert("Fill in all the details");
    } else if (Email.search("@gmail.com") === -1 || Email.length < 10) {
      setWarning("Enter a valid mail to register");

      setTimeout(() => {
        setWarning("");
      }, 3000);
    } else if (password.length < 6) {
      setWarning("password should be of atleast 6 letters");

      setTimeout(() => {
        setWarning("");
      }, 3000);
    } else if (!/[@$&_]/.test(password)) {
      setWarning("Password should contain at least one special character ");

      setTimeout(() => {
        setWarning("");
      }, 3000);
    } else {
      const pd = {
        username: username,
        Email: Email,
        role: role,
        password: password,
      };

      fetch("http://localhost:8000/inf-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pd),
      })
        .then((response) => response.text())
        .then((result) => {
          if (result === "Entry already exists") {
            setWarning(result);
            setTimeout(() => {
              setWarning("");
            }, 3000);
          } else if (result === "Username already taken") {
            setWarning(result);
            setTimeout(() => {
              setWarning("");
            }, 3000);
          } else {
            console.log("helo there");
            setWarning("Registered successfully");
            setTimeout(() => {
              setWarning("");
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
      console.log(pd);
    }
  };


  return (
    <ContextSample.Provider
      value={{
        name7,
        name9,
        handleRegister,
        
        myFunction,
        myFunction2,
      warning
      }}
    >
      <div>
        <div style={{ color: "white" }}>{props.children}</div>
      </div>
    </ContextSample.Provider>
  );
}
