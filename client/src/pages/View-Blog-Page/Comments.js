import React, { useState, useEffect,useContext } from 'react'
const axios=require("axios")
import { UsernameContext } from '../../UsernameConetxt';

function Comments(props) {
    const [comments, setComments] = useState(props.comments);
    const { username, setUsername } = useContext(UsernameContext)
    const url = SERVER_URL;

    
    //since react setState uses queues and doesnt update instantly,we are forced to use useEffect, so the component would render anytime the state changes
    useEffect(()=>{
        updateComments()
    },[comments])
    
    const addComment = () => {
        setComments(current => [...current,
        {
            title: "Comment Title",
            author: username,
            date: Date.now(),
            body: "Comment Text",
            likes: 0,
            dislikes: 0
        }]);
    };

    const updateCommentTitle = (givenKey, givenTitle) => {
        setComments(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, title: givenTitle };
                }

                return obj;
            }),
        );
    };


    const updateCommentText = (givenKey, givenText) => {
        setComments(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, text: givenText };
                }

                return obj;
            }),
        );
    };


    function updateComments() {
        props.updateBlog(curr => ({ ...curr, comments: comments }))
    }

  
    return (

        <div>
               <button onClick={addComment}>add Comment</button>
            {
                comments.map((comment, key) => {
                    return (
                        <div key={key}>
                            <input
                                onChange={e => { updateCommentTitle(key, e.target.value);}}
                                value={comment.title}
                                onFocus={e => { if (comment.title === "Comment Title") updateCommentTitle(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateCommentTitle(key, "Comment Title"); };}}
                                style={{ color: "white" }}
                                disabled={comment.author!=username}>
                            </input>
                            <br></br>
                            <input value={comment.author}  style={{ color: "white" }} disabled={true}></input>
                            <br></br>
                            <input value={comment.date}  style={{ color: "white" }} disabled={true}></input>
                            <br></br>
                            <textarea
                                onChange={e => { updateCommentText(key, e.target.value); }}
                                value={comment.text}
                                onFocus={e => { if (comment.text === "Comment Text") updateCommentText(key, "") }}
                                onBlur={e => { if (e.target.value === "") { updateCommentText(key, "Comment Text"); };}}
                                style={{ color: "white", background: "transparent" }}
                                disabled={comment.author!=username}>
                            </textarea>
                        </div>
                    )
                })
            }
            <br></br>
        </div>
    )
}

export default Comments