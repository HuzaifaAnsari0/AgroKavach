import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { auth, googleProvider } from '../../configs/firebase.js';
import { signInWithPopup } from "firebase/auth";
import { useCart } from '../../actions/context';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFarmer, setIsFarmer] = useState(true); // State to manage toggle
    const [isSignUp, setIsSignUp] = useState(false); // State to manage sign in/sign up toggle
    const navigate = useNavigate();

    const { isLogin, setIsLogin, setName, user, setUserDetails } = useCart();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });

            if (response.status === 200) {
                const data = response.data;
                // console.log('Login response:', data);
                setIsLogin(true);
                setName(data.displayName);
                setUserDetails(data);
                console.log('Login response:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user',JSON.stringify(data.farmer));
                console.log('Login successful:', data);
                navigate('/');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                email,
                password
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                alert('Sign up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setIsLogin(true);
            setName(user.displayName);
            setUserDetails(user);
            const uid = user.uid;
            localStorage.setItem('user', user);
            console.log("Google sign-in success:", user);
            navigate("/");
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 logreg-page">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-500" style={{ fontSize: "2rem" }}>AgroKavach</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
                        {isSignUp ? 'Sign up for an account' : 'Log in to your account'}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center mb-4">
                        {/* <button
                            className={`px-4 py-2 ${isFarmer ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setIsFarmer(true)}
                        >
                            Farmer
                        </button>
                        <button
                            className={`px-4 py-2 ${!isFarmer ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setIsFarmer(false)}
                        >
                            Doctor
                        </button> */}
                    </div>
                    <form className="space-y-6" onSubmit={isSignUp ? handleSignUp : handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white text-black" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                {!isSignUp && (
                                    <div className="text-sm">
                                        <Link to="#" className="font-semibold text-gray-900">Forgot password?</Link>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black" onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outlin">
                                {isSignUp ? 'Sign up' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    {!isSignUp && (
                        <div className="w-full mx-auto pt-4">
                            <GoogleLoginButton type="button" onClick={handleGoogleSignIn} size="40px" />
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="ml-1 font-semibold text-blue-500 hover:text-blue-700"
                            >
                                {isSignUp ? 'Sign in' : 'Sign up'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;