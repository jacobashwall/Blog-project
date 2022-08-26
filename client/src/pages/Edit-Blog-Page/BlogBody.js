import React, { useState } from 'react'

function BlogBody(props) {
    const [blogBody, setBlog] = useState([]);

    const addSection = () => {
        setBlog(current => [...current,
        {
            title: "Title",
            imageId: "Image ID",
            description: "Image Description",
            text: "Text"
        }]);
    };

    const updateSectionTitle = (givenKey, givenTitle) => {
        setBlog(current =>
            current.map((obj,key) => {
                if (key === givenKey) {
                    return { ...obj, title: givenTitle };
                }

                return obj;
            }),
        );
    };

    const updateSectionImageId = (givenKey, givenId) => {
        setBlog(current =>
            current.map((obj,key) => {
                if (key === givenKey) {
                    return { ...obj, imageId: givenId };
                }

                return obj;
            }),
        );
    };

    const updateSectionDescription = (givenKey, givenDescription) => {
        setBlog(current =>
            current.map((obj,key) => {
                if (key === givenKey) {
                    return { ...obj, description: givenDescription };
                }

                return obj;
            }),
        );
    };

    const updateSectionText = (givenKey, givenText) => {
        setBlog(current =>
            current.map((obj,key) => {
                if (key === givenKey) {
                    return { ...obj, text: givenText };
                }

                return obj;
            }),
        );
    };


    const removeSection = () => {
        let givenKey=blogBody.length-1;
        setBlog(current =>
            current.filter((obj,key) => {
                return key !== givenKey;
            }),
        );
    };

    return (
        <div>
            {
                blogBody.map((section, key) => {
                    return (
                        <div key={key}>
                            <label>section {key}</label>
                            <br></br>
                            <input
                                onChange={e => { updateSectionTitle(key, e.target.value); }}
                                value={section.title}
                                onFocus={e => { if (section.title === "Title") updateSectionTitle(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateSectionTitle(key, "Title"); } }}
                                style={{ color: "white" }}>
                            </input>
                            <br></br>
                            <input
                                onChange={e => { updateSectionImageId(key, e.target.value); }}
                                value={section.imageId}
                                onFocus={e => { if (section.imageId === "Image ID") updateSectionImageId(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateSectionImageId(key, "Image ID"); } }}
                                style={{ color: "white" }}>
                            </input>
                            <br></br>
                            <textarea
                                onChange={e => { updateSectionDescription(key, e.target.value); }}
                                value={section.description}
                                onFocus={e => { if (section.description === "Image Description") updateSectionDescription(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateSectionDescription(key, "Image Description"); } }}
                                style={{ color: "white", background: "transparent" }}>
                            </textarea>
                            <br></br>
                            <textarea
                                onChange={e => { updateSectionText(key, e.target.value); }}
                                value={section.text}
                                onFocus={e => { if (section.text === "Text") updateSectionText(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateSectionText(key, "Text"); } }}
                                style={{ color: "white", background: "transparent" }}>
                            </textarea>
                        </div>
                    )
                })
            }
            <button onClick={removeSection} disabled={blogBody.length==1}>remove section</button>
            <button onClick={addSection}>add section</button>
            <br></br>
        </div>
    )
}

export default BlogBody