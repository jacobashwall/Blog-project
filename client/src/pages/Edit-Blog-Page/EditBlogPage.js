import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogBody from './BlogBody';
const axios=require("axios")

function EditBlogPage() {
    let { username, blogId } = useParams();
    let navigate = useNavigate();
    const [blog, setBlog] = useState();
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
    const updateBlog=()=>{
        console.log(blog);
        axios.post(`${url}/edit-blog-by-id`, { id: blogId, updatedBlog:blog })
        .then((response) => {
            console.log(response)
            navigate(`../${username}/${blogId}/View`)
        })
        .catch((error) => {
            console.error(`ERROR: ${error}`);
        });
    }
    return (
        <div>
            {
                blog ?
                    (<div>
                        <h1>EditBlogPage of {username}</h1>
                        <BlogBody blogBody={blog.body} updateBlog={setBlog} />
                        <button onClick={() => { navigate(`../${username}/Images`); }}>my images</button>
                        <button onClick={updateBlog}>update</button>
                    </div>)
                    :
                    (<p>Loading Blog...</p>)

            }
        </div>
    )
}

export default EditBlogPage