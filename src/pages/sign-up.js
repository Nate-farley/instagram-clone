import React, {  useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as ROUTES from "../constants/routes"
import { doesUsernameExist } from "../services/firebase";
import  { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

function Signup() {

        const history = useNavigate('');

    

        const [ username, setUsername ]= useState('');
        const [ fullName, setFullName ] = useState('');
        const [ emailAddress, setEmailAddress ]= useState('');
        const [ password, setPassword ] = useState('');

        const [ error , setError ] =useState('');

        const isInvaild = password === '' || emailAddress === '';

        const handleSignup = async (event) => {
            event.preventDefault();

            const auth = getAuth();

            const usernameExists = await doesUsernameExist(username);

            console.log(username)

            

        if (!usernameExists) {
            try { 
              
                const createdUserResult = await createUserWithEmailAndPassword(auth, emailAddress, password);

                console.log(createdUserResult)

                    updateProfile(createdUserResult.user, {
                        displayName: username
                    });

                    

                    

                      const docRef = await addDoc(collection(db, "users"), {
        
                        userId: createdUserResult.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: [],
                        dateCreated: Date.now()
                        });
                        
                        console.log("Document written with ID: ", docRef.id);
                        
                        history(ROUTES.DASHBOARD);

                    } catch (error) {
                        setUsername('');
                        setFullName('');
                        setEmailAddress('');
                        setPassword('');
                        setError(error.message);
                      };
            
                    } else {
                        setError('That username is already taken, please try another.');
                        console.log('jhvhjjh')


        }};

        useEffect(() => {

            document.title = 'Sign up - Instagram';

        }, []);

    return (
       <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iphone with Instagram app" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>
                        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignup} method="POST">
                        <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />
                        <input
                            aria-label="Enter your full name"
                            type="text"
                            placeholder="Full Name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input
                            aria-label="Enter your Email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button 
                            disabled={isInvaild}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                            ${isInvaild && ' opacity-50'}`}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm">Have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium" >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
       </div> 

       
    )
}

export default Signup;