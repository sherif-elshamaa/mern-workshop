import React from 'react'
import { useSelector } from 'react-redux';


function Profile() {
    const user = useSelector((state) => state.data.user);
    return (
        <div>
            <h1>Profile</h1>
            <br />
            <h2>name:</h2>
            <span>{user.name}</span>
            <h2>age:</h2>
            <span>{user.age}</span>
        </div>
    )
}

export default Profile