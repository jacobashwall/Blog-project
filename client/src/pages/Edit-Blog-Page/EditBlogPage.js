import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogBody from './BlogBody';
import Tags from './Tags';
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
    const updateHeader=(givenHeader)=>{
        setBlog({header:givenHeader})
    }
    return (
        <div>
            {
                blog ?
                    (<div>
                        <input
                                onChange={e => { updateHeader(e.target.value); }}
                                value={blog.header}
                                onFocus={e => { if (blog.header === "New blog") updateHeader("") }}
                                onBlur={e => { if (e.target.value === "") { updateHeader("New blog"); } }}
                                style={{ color: "white" }}>
                            </input>
                        <Tags tags={blog.tags} updateBlog={setBlog}/>
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