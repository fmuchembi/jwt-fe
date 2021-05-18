import React, {useState} from "react";
import {Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login =({setAuth})=>{
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputs;
    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });


    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:2000/auth/login",
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
                toast.success("Logged in Successfully");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

        } catch (err) {
            console.error(err.message);
        }
    }
    return(
        <div className="container">
            <form className="form" onSubmit={onFormSubmit}>
                <div className='form-section'>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <div className="form-input-details">
                        <h1>Log in</h1>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" value={email} onChange={e => onChange(e)} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={e => onChange(e)} />
                        </div>
                        <button type="submit" id ="btn" className="btn btn-danger">Login</button>
                    </div>
                </div>
            </form>
            <p>Not registered click <span><Link to="/">here</Link> </span>to register</p>
        </div>
    )
}

export default Login;