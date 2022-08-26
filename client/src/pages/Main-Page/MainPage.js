import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function MainPage() {
    let { username } = useParams();
    const url = SERVER_URL;
    let navigate=useNavigate();
    const [myBlogs, setMyBlogs] = useState([])
    useEffect(() => {
        getBlogs();
    }, [])
    const getBlogs = () => {
        axios.post(`${url}/get-blogs-by-user`, { username: username })
            .then((response) => {
                console.log(username);
                console.log(response.data);
                setMyBlogs(response.data);
            })
            .catch((error) => {
                console.error(`ERROR: ${error}`);
            });
    }
    const createNewBlog = () => {
        axios.post(`${url}/new-blog`, { username: username })
            .then((response) => {
                setMyBlogs(current => [...current, response.data])
            })
            .catch((error) => {
                console.error(`ERROR: ${error}`);
            });
    }
    return (
        <div>
            <h1>  MainPage of {username}</h1>
            <h2>my blogs</h2>
            <button onClick={createNewBlog}>new blog</button>
            {
                myBlogs.map((blog) => {
                    return (
                        <li key={blog._id}>
                            <label>{blog.header}</label>
                            <br></br>
                            <label>{blog.subheader}</label>
                            <br></br>
                            <label>{blog.date}</label>
                            <br></br>
                            <label>{blog.likes}</label>
                            <label>{blog.dislikes}</label>
                            <br></br>
                            <button onClick={() => navigate(`../${username}/${blog._id}/View`)}>open</button>
                        </li>
                    )
                })
            }


        </div>
    )
}

export default MainPage