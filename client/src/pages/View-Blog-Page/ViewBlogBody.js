import React, { useState } from 'react'
import ViewImage from './ViewImage';
const axios = require("axios");


function BlogBodyView(props) {

    return (
        <div>
            {
                props.blogBody.map((section, key) => {
                    return (
                        <div key={key}>
                            <h1>{section.title}</h1>
                           <ViewImage imageId={section.imageId} /> 
                            <div>{section.description}</div>
                            <div>{section.text}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BlogBodyView