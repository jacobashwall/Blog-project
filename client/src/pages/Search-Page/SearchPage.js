import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
function SearchPage() {
   let { username, tag } = useParams();
  return (
    <div>
        <h1>Search Page</h1>
        <p>{"the tag "+tag}</p>
        <p>{"searched by "+username}</p>
    </div>
  )
}

export default SearchPage