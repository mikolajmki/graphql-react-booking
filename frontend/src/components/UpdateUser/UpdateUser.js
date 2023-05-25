import React, { useEffect, useRef, useState } from "react";
import authContext from "../../context/auth-context.js";
import './UpdateUser.css';

const UpdateUser = (props) => {
    const [updateForm, setUpdateForm] = useState({email: null, newPassword: null, currentPassword: null});
    useEffect(() => {
        console.log(updateForm);
    }, [updateForm]);

    const confirmHandler = (e) => {
        e.preventDefault();
        
        const currentPassword = updateForm.currentPassword;
        const newPassword = updateForm.newPassword;
        const email = updateForm.email;
        const userId = props.userId;

        const requestBody = {
            query: `
                mutation UpdateUser($userId: ID! $email: String!, $currentPassword: String!, $newPassword: String! ) {
                    updateUser(userInput: {userId: $userId, email: $email, currentPassword: $currentPassword, password: $newPassword}) {
                        _id
                    }
                }
            `,
            variables: {
                userId,
                currentPassword,
                newPassword,
                email,
            }
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <form className="updateUserForm">
            <h1>Update your info:</h1>
            <div className='form-control'>
                <label htmlFor='title'>Email</label>
                <input type='email' id='title' onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value})}></input>
            </div>
            <div className='form-control'>
                <label htmlFor='price'>Password</label>
                <input type='password' id='price' onChange={(e) => setUpdateForm({ ...updateForm, currentPassword: e.target.value})}></input>
            </div>
            <div className='form-control'>
                <label htmlFor='date'>New password</label>
                <input type='password' id='date' onChange={(e) => setUpdateForm({ ...updateForm, newPassword: e.target.value})}></input>
            </div>
            <button className="btn" onClick={confirmHandler}>Confirm</button>
        </form>
)};

export default UpdateUser;