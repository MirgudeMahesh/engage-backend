







import React, { useContext, useEffect, useState } from 'react';
import hoome from "../hom.png";
import cod from "../inf.png";
import celebrity from "../spon.png";
import user from "../prof.png";
import message from '../mess.png'
import { useNavigate } from 'react-router-dom';
import logooo from './logooo.JPG';
import '../styles.css';
import ContextSample from './Contextsample';


export default function Signup() {
    const { name7, name9, handleRegister, myFunction, myFunction2, warning } = useContext(ContextSample);
    const [warning5, setWarning5] = useState("");
    const navigate = useNavigate();
    const [showSignup, setshowsignup] = useState(true);
 

    const handleloginpage = () => {
        var xx = document.getElementById("sinemail").value;
        const name8 = document.getElementById("suppassword").value;

        if (xx === "" || name8 === "") {
            alert("Fill in all the details1");
        } else {
            fetch("http://localhost:8000/get-all-auth")
                .then((response) => response.json())
                .then((data) => func(data));

            function func(data) {
                let credentialsMatch = false;

                data.forEach((x) => {
                    if (x.Email === xx && x.password === name8) {
                        setWarning5("");
                        const tdata = { name: x.name, mail: xx };
                        localStorage.clear();
                        localStorage.setItem("name9", xx);
                        localStorage.setItem("name7", x.username);
                        // setAbc(true); // Update abc variable
                        credentialsMatch = true;
                        const abd=localStorage.getItem('name9')
                        setAbc(abd)
                    }
                });

                if (!credentialsMatch) {
                    setWarning5("Wrong credentialsxx");

                    // Set a timeout to clear the warning after 3 seconds
                    setTimeout(() => {
                        setWarning5("");
                    }, 3000);
                }
            }
        }
    };
  
    const showsigninpage = () => {
        setshowsignup(false);
    }

    const handleSignUpClick = () => {
        setshowsignup(true);
    }
const [abc,setAbc]=useState(false)
    useEffect(() => {
        const xyz=localStorage.getItem('name9')
       setAbc(xyz)
        console.log(abc)
    },[abc] ); // Run effect when abc changes

    return (
        <div>
            {abc ? (
                <div className='page-home'>
                    <div className='left-page-home'>
                    <button className="no-btn1" onClick={()=>navigate('/')}><div className='image-fit'><img className='image-home' src={logooo} alt="logo" /></div></button>
                        <div className='navbar'></div>
                        <ul className="button-list">
                            <div className='manage'> <li><a><button className="text-button" onClick={() => { navigate('/') }}><img className='image-home1' src={hoome} alt="logo" />Home</button></a></li></div>
                            <div className='manage'> <li><a><button className="text-button" onClick={() => { navigate('/Sponser') }}><img className='image-home1' src={cod} alt="logo" />Sponser</button></a></li></div>
                            <div className='manage'> <li><a><button className="text-button" onClick={() => { navigate('/Influencer') }}><img className='image-home1' src={celebrity} alt="logo" />Influencer</button></a></li></div>
                            <div className='manage'> <li> <a><button className="text-button" onClick={() => { navigate('/inbox') }}><img className='image-home1' src={message} alt="logo" />messages</button></a></li></div>
                            <div className='manage'> <li> <a><button className="text-button" onClick={() => { navigate('/Myprofile') }}><img className='image-home1' src={user} alt="logo" />My profile</button></a></li></div>
                        </ul>
                    </div>

                    <div className='right-page-home'>  </div>
                </div>
            ) : (
                <div className='page'>
                    <div className='left-page'>
                        <h1 style={{ marginTop: "50px", marginLeft: '150px', fontFamily: "cursive", color: 'white' }}>WELCOME</h1>

                        {showSignup ? (
                            <div className='loginpage'>
                                <div><input className='username' name="name" id='namesu' placeholder="username" style={{ marginLeft: '24px' }} required /></div>
                                <div><input className='email' name="email" id="mailsu" placeholder="Email" style={{ marginLeft: '28px' }} required /></div>
                                <div> <input className='password' name="password" id="passwordsu" placeholder="password" required /></div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onClick={myFunction} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Influencer</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={myFunction2} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">sponser</label>
                                </div>
                                <div><button className='loginreg' type="button" id="regbutton" onClick={handleRegister}>Register</button></div>
                                <div>
                                    <div className='firsttime' >Already a user ? <button className='button-like-text' type="button" id="sinbutton" style={{ borderRadius: '15px' }} onClick={showsigninpage}>Sign In</button></div>
                                </div>
                            </div>
                        ) : (
                            <div className="loginpage" id="signin">
                                <div><input className='username' name="email" placeholder="Email" id="sinemail" style={{ marginLeft: '28px' }} required /></div>
                                <div><input className='password' name="password" placeholder="password" id="suppassword" required /></div>
                                <div><button className='loginreg' type="button" id="linbutton" onClick={handleloginpage}>Login</button></div>
                                <div className='firsttime1' >First time? <button className='button-like-text' type="button" id="supbutton" style={{ borderRadius: '15px' }} onClick={handleSignUpClick}>Sign Up</button></div>
                            </div>
                        )}
                        <p style={{ color: 'red', marginTop: "90px", marginLeft: "110px" }}>{warning}</p>
                        <p style={{ color: 'red', marginTop: "90px", marginLeft: "110px" }}>{warning5}</p>
                    </div>

                    <div className='right-page'>
                        <div>
                            <img className='image' src={logooo} alt="logo" />
                        </div>
                        <div><p className='description'>NOW ITS EASY TO COLLAB</p></div>
                    </div>
                </div>
            )}
        </div>
    )
}
