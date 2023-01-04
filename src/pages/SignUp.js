import React, { useState } from 'react';
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { LoaderComponent } from '../components/Loader';

function SignUp() {

    const [userName, setUserName] = useState('');
    const [password1, setUserPassword1] = useState('');
    const [password2, setUserPassword2] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const register = (e) => {
        const { id, value } = e.target;
        if (id === "userName") {
            setUserName(value);
        }
        if (id === "password1") {
            setUserPassword1(value);
        }
        if (id === "password2") {
            setUserPassword2(value);
        }
    }

    const signUpSubmitHandler = async () => {
        setLoading(true);
        const args = { userName, password1, password2 }
        const response = await SignUp(args);
        if (response) {
            navigate('/home')
        }
    }

    if (loading) {
        return <LoaderComponent />
    }

    return (
        <>
            <form>
                <h3>
                    Register
                </h3>

                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" id="userName" value={userName} onChange={(e) => register(e)} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password1" value={password1} onChange={(e) => register(e)} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password2" value={password2} onChange={(e) => register(e)} className="form-control" placeholder="Enter password again" />
                </div>

                <button
                    type="submit"
                    onClick={(event) => {
                        signUpSubmitHandler()

                    }}
                    className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <Link to="/login">log in?</Link>
                </p>
            </form>
        </>
    )
}



export default SignUp;
