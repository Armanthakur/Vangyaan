import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyQuery, gql } from "@apollo/client";
import { AuthContext } from '../../services/AuthContext.js';
import styles from '../login/login.module.css';
import img from './google.png';
import img1 from './tr.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function Login() {
    const [inputpassword, setPassword] = useState("");
    const [inputemail, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for toggle visibility
    const navigate = useNavigate();
    const { isLoggedIn, login, logout, setUser } = useContext(AuthContext);
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const btnRef = useRef(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const notifyError = (msg) => {
        toast.error(`${msg}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            containerId: 'Error'
        });
    };

    const notifyWarning = (msg) => {
        toast.warning(`${msg}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerId: 'Warning'
        });
    };

    const notifySuccess = (msg) => {
        toast.success(`${msg}!`, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerId: 'Success'
        });
    };

    const validateLogin = () => {
        if (inputRef1.current.value === '') {
            inputRef1.current.focus();
            notifyWarning("Please enter your email");
            return false;
        } else if (inputRef2.current.value === '') {
            inputRef2.current.focus();
            notifyWarning("Please enter your password");
            return false;
        }
        return true;
    };

    const [Loginfunc] = useLazyQuery(gql`
        query Login($details: userLogin) {
            login(details: $details) {
                token
                currentRating
                name
                email
                accountType
            }
        }`,
        {
            errorPolicy: "all",
            onError: (errors) => {
                console.log('Error:', errors.message);
                notifyError(errors.message);
            },
            onCompleted: (data) => {
                if (data.login && data.login.token) {
                    const { token, ...userData } = data.login;
                    localStorage.setItem('authToken', token);
                    setUser(userData);
                    setLoggedIn(true);
                    login();
                }
                console.log(data);
            }
        });

    const handleGoogleLoginSuccess = (credentialResponse) => {
        console.log('Google Credential Response:', credentialResponse);
        // You can send this token to your backend to verify and log in the user
        notifySuccess("Google Login successful!");
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };

    const handleGoogleLoginFailure = () => {
        notifyError("Google Login failed. Please try again.");
    };

    useEffect(() => {
        if (loggedIn) {
            notifySuccess("Login successful");
            setTimeout(() => {
                navigate("/");
            }, 1000);

        }
    }, [loggedIn, navigate]);

    return (
        <GoogleOAuthProvider clientId="879654306634-ia0egll57vj0mpiva8dfklmgldgt71l7.apps.googleusercontent.com">
            <div className={styles.parent}>
                <img src={img1} alt="" />
                <div className={styles.content}>
                    <h1 className={styles.log}>Login</h1>
                    <div className={styles.ifield}>
                        <input ref={inputRef1} type="input" placeholder='Email' value={inputemail}
                            onChange={(e) => setEmail(e.target.value)} required />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input ref={inputRef2} id='input2' 
                                type={showPassword ? "text" : "password"} 
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)} required />
                            <button type="button" onClick={togglePasswordVisibility} style={{ marginLeft: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div ref={btnRef} className={styles.btn1} onClick={() => {
                        if (validateLogin())
                            Loginfunc({ variables: { details: { "usermail": inputemail, "password": inputpassword } } });
                    }}>
                        <p>Login</p>
                    </div>
                    <div className={styles.btn2}>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginFailure}
                            theme="outline"
                        />
                    </div>
                    <Link to={'/findacc'} className={styles.forgot}>Forgot password?</Link>
                    <div className={styles.start}>
                        <p>Don't have an account?</p>
                        <Link to={'/signup'}><div>Get started</div></Link>
                    </div>

                </div>
                <ToastContainer containerId="Error" />
                <ToastContainer containerId="Warning" />
                <ToastContainer containerId="Success" />
            </div>
        </GoogleOAuthProvider>
    );
}
