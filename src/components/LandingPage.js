import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LandingPage = ({ setAuth }) => {
    const [name, setName] = useState("");
    const [data, setData] = useState([]);

    const getUserProfile = async () => {
        try {
            const response = await fetch("http://localhost:2000/dashboard/", {
                method: "POST",
                headers: {token: localStorage.token }
            });

            const parseData = await response.json();
            setName(parseData.user_name);
        } catch (err) {
            console.error(err.message);
        }
    };
    const getData = async () => {
        const response = await fetch("https://official-joke-api.appspot.com/jokes/ten")
        const data = await response.json();
        setData(data.splice(0, 4));
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
            <div className="nav-bar">
                <div className="nav-bar-section">
                    <h3 className='text-left'>Welcome{name}<br/>
                        <button onClick={e => logout(e)} className="btn btn-danger">
                            Logout
                </button></h3>
                </div>
                  
            </div>
            <div className="heros-page">
                <h1 className="text-center">Jokes</h1>
                <div className="row">{data.map((item) => {
                    return < div className="col-sm" key={item.id}><h3>{item.type}</h3><h5>{item.setup}</h5><br/><span>{item.punchline}</span></ div>
                })}</div>
            </div>
        </div>
    );
}


export default LandingPage;