import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogBodyView from './ViewBlogBody';
const axios=require("axios");

function ViewBlogPage() {
    let { username, blogId } = useParams();
    const [blog, setBlog] = useState(null)
    let navigate=useNavigate();
    const url = SERVER_URL;
    useEffect(() => {
        getBlogById();
    }, [])
    const getBlogById = () => {
        axios.post(`${url}/get-blog-by-id`, { id: blogId })
            .then((response) => {
                setBlog(response.data)
            })
            .catch((error) => {
                console.error(`ERROR: ${error}`);
            });
    }


    return (
        <div>
            {blog ?
                (<div>
                    <h1>ViewBlogPage BlogId: {blog._id} of {blog.author} </h1>
                    <BlogBodyView blogBody={blog.body}/>
                    <button disabled={blog.author != username} onClick={() => navigate(`../${blog.author}/${blog._id}/Edit`)}>Edit</button>
                </div>)
                :
                (<p>Loading Blog...</p>)
            }
        </div>
    )
}

export default ViewBlogPage