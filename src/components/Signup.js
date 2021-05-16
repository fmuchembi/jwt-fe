import React, {useState} from "react";
import {Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './signup.css';
import { toast } from "react-toastify";

const Signup = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputs;
    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });


    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password, name };
            const response = await fetch(
                "http://localhost:2000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Register Successfully");
            } else {
                setAuth(false);
                //toast.error(parseRes);
                toast.error("User email already used")
            }

        }catch(err){
            console.error(err.message);
        }
    }
    return (
       <div className="container">
            <form className="form" onSubmit={onFormSubmit}>
                <div className="form-section">
                    <i className="fa fa-user"></i>
                    <div className="form-input-details">
                        <h1>Sign Up</h1>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={e => onChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" name="email" value={email}
                                onChange={e => onChange(e)} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" name="password" value={password}
                                onChange={e => onChange(e)} />
                        </div>
                        <button type="submit" className="btn btn-danger">Register</button>
                    </div>
                </div>
            </form>
            <p>If already registered click <Link to="/login">here</Link> to Login</p>
        </div>
    )
}

export default Signup;