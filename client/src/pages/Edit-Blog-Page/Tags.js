import React, { useRef, useState, useEffect } from 'react'

function Tags(props) {
    const [tags, setTags] = useState(props.tags);
    let inputRef = useRef();

    const addTag = () => {
        setTags(current => [...current, "New Tag"]);
    };

    const updateTagTitle = (givenKey, givenTagTitle) => {
        setTags(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return givenTagTitle;
                }

                return obj;
            }),
        );
    };

    //since react setSatte uses queues and doesnt update instantly,we are forced to use useEffect, so the component would render anytime the state changes
    useEffect(() => {
        updateTags()
    }, [tags])

    const removeTag = (tagKey) => {
        setTags(current =>
            current.filter((obj, key) => {
                return key !== tagKey;
            }),
        );
    };

    function updateTags() {
        props.updateBlog(curr => ({ ...curr, tags: tags.filter((tag) => { return tag != "New Tag" }) }))
    }

    return (
        <div>
            {
                tags.map((tag, key) => {
                    return (
                        <div key={key}>
                            <input
                                onChange={e => { updateTagTitle(key, e.target.value) }}
                                value={tag}
                                ref={inputRef}
                                onFocus={e => { if (tag === "New Tag") updateTagTitle(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateTagTitle(key, "New Tag"); } }}
                                style={{ color: "white" }}
                                onLoad={() => inputRef.current.focus()}
                                disabled={key == 0}>
                            </input>
                            <button onClick={() => { removeTag(key); }} disabled={key == 0}>remove tag</button>
                        </div>
                    )
                })
            }
            <button onClick={() => { addTag(); }}>add tag</button>
            <br></br>
        </div>
    )
}

export default Tags