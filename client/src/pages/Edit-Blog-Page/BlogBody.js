import React, { useState, useEffect } from 'react'
const axios=require("axios")

function BlogBody(props) {
    const [blogBody, setBlogBody] = useState(props.blogBody);
    const url = SERVER_URL;
    
    //since react setSatte uses queues and doesnt update instantly,we are forced to use useEffect, so the component would render anytime the state changes
    useEffect(()=>{
        updateBlogBody()
    },[blogBody])
    
    const addSection = () => {
        setBlogBody(current => [...current,
        {
            title: "Title",
            imageId: "Image ID",
            description: "Image Description",
            text: "Text"
        }]);
    };

    const updateSectionTitle = (givenKey, givenTitle) => {
        setBlogBody(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, title: givenTitle };
                }

                return obj;
            }),
        );
    };

    const updateSectionImageId = (givenKey, givenId) => {
        setBlogBody(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, imageId: givenId };
                }

                return obj;
            }),
        );
    };

    const updateSectionDescription = (givenKey, givenDescription) => {
        setBlogBody(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, description: givenDescription };
                }

                return obj;
            }),
        );
    };

    const updateSectionText = (givenKey, givenText) => {
        setBlogBody(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, text: givenText };
                }

                return obj;
            }),
        );
    };


    const removeSection = () => {
        let givenKey = blogBody.length - 1;
        setBlogBody(current =>
            current.filter((obj, key) => {
                return key !== givenKey;
            }),
        );
    };

    function updateBlogBody() {
        props.updateBlog(curr => ({ ...curr, body: blogBody }))
    }

    const isImageExist = (key) => {
        console.log("click")
        axios.post(`${url}/exist-images-by-id`, { id: blogBody[key].imageId })
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    console.log("Image Found")
                }
                else {
                    updateSectionImageId(key, "No image match this ID");
                }
            })
            .catch((error) => {
                console.error(`ERROR: ${error}`);
                updateSectionImageId("Error");
            });
    }

    return (
        <div>
            {
                blogBody.map((section, key) => {
                    return (
                        <div key={key}>
                            <input
                                onChange={e => { updateSectionTitle(key, e.target.value);}}
                                value={section.title}
                                onFocus={e => { if (section.title === "Title") updateSectionTitle(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateSectionTitle(key, "Title"); };}}
                                style={{ color: "white" }}>
                            </input>
                            <br></br>
                            <input
                                onChange={e => { updateSectionImageId(key, e.target.value); }}
                                value={section.imageId}
                                onFocus={e => { if (section.imageId === "Image ID") updateSectionImageId(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateSectionImageId(key, "Image ID"); };}}
                                style={{ color: "white" }}>
                            </input>
                            <button onClick={()=>isImageExist(key)}>check</button>
                            <br></br>
                            <textarea
                                onChange={e => { updateSectionDescription(key, e.target.value);}}
                                value={section.description}
                                onFocus={e => { if (section.description === "Image Description") updateSectionDescription(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateSectionDescription(key, "Image Description"); };}}
                                style={{ color: "white", background: "transparent" }}>
                            </textarea>
                            <br></br>
                            <textarea
                                onChange={e => { updateSectionText(key, e.target.value); }}
                                value={section.text}
                                onFocus={e => { if (section.text === "Text") updateSectionText(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateSectionText(key, "Text"); };}}
                                style={{ color: "white", background: "transparent" }}>
                            </textarea>
                        </div>
                    )
                })
            }
            <button onClick={removeSection} disabled={blogBody.length == 1}>remove section</button>
            <button onClick={addSection}>add section</button>
            <br></br>
        </div>
    )
}

export default BlogBody