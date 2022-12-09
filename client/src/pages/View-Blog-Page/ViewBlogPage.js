import React, { useState, useEffect,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from './Comments';
import BlogBodyView from './ViewBlogBody';
import { UsernameContext } from '../../UsernameConetxt';
const axios = require("axios");

function ViewBlogPage() {
    let { blogId } = useParams();
    const { username, setUsername } = useContext(UsernameContext)
    const [blog, setBlog] = useState(null)
    let navigate = useNavigate();
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
                    <h1>{blog.header}</h1>
                    <h2>{blog.subheader}</h2>
                    <h3>{blog.author}</h3>
                    <div>{blog.date}</div>
                    {blog.tags.map((tag, key) => {
                        return (
                            <div key={key}>
                                <div>{tag}</div>
                            </div>
                        )
                    })}
                    <BlogBodyView blogBody={blog.body} />
                    <button disabled={blog.author != username} onClick={() => navigate(`../${blog.author}/${blog._id}/Edit`)}>Edit</button>
                    <Comments comments={blog.comments} updateBlog={setBlog} />
                </div>)
                :
                (<p>Loading Blog...</p>)
            }
        </div>
    )
}

export default ViewBlogPage