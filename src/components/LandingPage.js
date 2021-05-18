import React from "react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {FaBars} from "react-icons/fa";


const LandingPage = ({ setAuth }) => {
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const style ={
        color:'#5cb85c',
        fontWeight:'bold',
    }

    const getUserProfile = async () => {
        try {
            const response = await fetch("http://localhost:2000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token }
            });

            const parseRes= await response.json();
            console.log(parseRes)
            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    };
    const getData = async () => {
        const response = await fetch("https://official-joke-api.appspot.com/jokes/ten")
        const data = await response.json();
        setData(data.splice(0, 20));
    }

    const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Logout successfully");
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='home-page'>
         <nav>
                <div className="logo">
                <iframe src="https://giphy.com/embed/R4m8aUlXTLeZG" width="80" height="80" frameBorder="0" class="giphy-embed" allowFullScreen>FUB</iframe>
                
                </div>
                <ul className="nav-links" style={{ transform: open ? "translateX(0px)" : "" }}>
                    <li><Link className="nav-item" to="/">About</Link></li>
                    <li><Link className="nav-item" to="/" >Jokes</Link></li>
                    <li><button onClick={e => logout(e)} className="btn btn-danger" id="logout">Logout</button></li>
                </ul>
                <FaBars onClick={() => setOpen(!open)} className="fa-bars" color="#5cb85c" />
            </nav>
           {/*<div className="nav-bar">
                <div className="nav-bar-section">
                    <button onClick={e => logout(e)} className="btn btn-danger" id="logout">Logout</button>
                </div>   
            </div>*/}
            <div className="about-section">
                <h1 className="text-left">Hi, Welcome{name}</h1>
                <h5 className="text-muted">
                    Kill your boredom with a little laugh. These are fun intended jokes <br/>
                    from the jokes API end point
                </h5>
                <button className="btn btn-danger" id="jokes">Jokes</button>
            </div>
             <div className="heros-page">
                <h1 className="text-center">Jokes</h1>
                <div className="row">{data.map((item) => {
                    return < div className="col-sm" key={item.id}><h3>{item.type}</h3><h5>{item.setup}</h5><br/><span>{item.punchline}</span></ div>
                })}</div>
            </div>
            <div className="footer">
              <p>Build by fmuchembi</p>
            </div>
        </div>
    );
}


export default LandingPage;