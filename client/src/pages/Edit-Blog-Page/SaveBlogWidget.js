import React from 'react'
import { motion } from 'framer-motion'
import { Tooltip, Fab } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function SaveBlogWidget(props) {
    return (
        <div style={{display:"inline-block"}}>
        <Tooltip title="Save" component={motion.div} drag={props.drag} dragConstraints={props.window} >
            <Fab onClick={() => {
                 if (props.add) {
                    props.updateWorkspace(current => [...current, { name: "Save Blog" }])}
                if (!props.drag && !props.add) props.updateBlog(); 
            }}>
                <SaveIcon />
            </Fab>
        </Tooltip>
        </div>
    )
}

export default SaveBlogWidget