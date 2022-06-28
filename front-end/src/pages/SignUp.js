import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchError from '../utils/catchErrors'

function SignUp() {
    const history = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [formLoading, setFormLoading] = useState(false)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault()
        setFormLoading(true)
        if (password.length < 6) {
            setErrorMsg("password is too short")
            setFormLoading(false)
        }
        try {
            const user = {
                name: name,
                age: age,
                userName: userName,
                password: password
            }
            const { data } = await axios.post(
                `${baseUrl}/api/register`,
                user,
                { withCredentials: true }
            )
            history('/')
        } catch (error) {
            const errorMsg = catchError(error);
            setErrorMsg(errorMsg.message)
            setFormLoading(false)
        }

    }
    const handleCloseError = e => {
        e.preventDefault();
        setErrorMsg(null)
    }

    return (
        <div style={{ "margin": "50px" }}>

            {errorMsg !== null ?
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Holy smokes!</strong>
                    <span className="block sm:inline"> {errorMsg}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={handleCloseError} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
                </div>
                :
                ""}
            {formLoading ?
                <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                    <span className="text-blue-500 opacity-75 right-10 top-60 my-0 mx-auto block relative w-0 h-0">
                        <svg xmlns="http://www.w3.org/2000/svg"  >
                            <circle cx="50" cy="50" fill="none" stroke="#1d3f72" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
                            </circle>
                        </svg>
                    </span>
                </div>
                : ""
            }
            <h1>signup</h1>
            <br />
            <label htmlFor="username">user name</label>
            <input type="text" name="username" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
            <br />
            <label htmlFor="password">password</label>
            <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <br />
            <label htmlFor="name">name</label>
            <input type="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
            <br />
            <label htmlFor="age">age</label>
            <input type="age" name="age" value={age} onChange={(e) => { setAge(e.target.value) }} />
            <br />
            <button onClick={handleSignup} name="signup">signup</button>
            <br />
            <Link to="/">
                <h4>already have account</h4>
            </Link>
        </div>
    )
}

export default SignUp