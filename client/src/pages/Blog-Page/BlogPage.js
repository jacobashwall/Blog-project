import React from 'react'
import { useNavigate, useParams} from 'react-router-dom'

function BlogPage() {
let { username } = useParams();
let navigate=useNavigate();
const handleClick=()=>{
    navigate(`../Images/${username}`)
}
  return (
    <div>
        <h1>BlogPage of {username}</h1>
        <button onClick={handleClick}>my images</button>
    </div>
  )
}

export default BlogPage