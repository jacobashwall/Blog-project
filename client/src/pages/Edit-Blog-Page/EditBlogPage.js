import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogBody from './BlogBody';

function EditBlogPage() {
    let { username } = useParams();
    let navigate = useNavigate();
    const navigateToImages = () => {
        navigate(`../${username}/Images`)
    }
    return (
        <div>
            <h1>EditBlogPage of {username}</h1>
            <BlogBody username={username}/>
            <button onClick={navigateToImages}>my images</button>
        </div>
    )
}

export default EditBlogPage