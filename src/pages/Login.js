import React, { useState } from "react";
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { LogIn } from "../services/auth";

const LoginScreen = () => {

    const [userName, setUserName] = useState('');
    const [password, setUserPassword] = useState('');
    const navigate = useNavigate();


    const loginHandler = async () => {
        const args = { userName, password }
        const response = await LogIn(args)
        if (response) {
            navigate('/home')
        }
    }

    return (
        <>
            <form>
                <h3>Log in</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={(e) => setUserName(e.target.value)} className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e) => setUserPassword(e.target.value)} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" onClick={() => loginHandler} className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </>

    )
}


export default LoginScreen;