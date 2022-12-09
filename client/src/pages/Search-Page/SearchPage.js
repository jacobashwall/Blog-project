import React, { useState, useEffect,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UsernameContext } from '../../UsernameConetxt';
import axios from 'axios';
function SearchPage() {
  const { username, setUsername } = useContext(UsernameContext)
  let {tag } = useParams();
  const url = SERVER_URL;
  const [searchedBlogs, setSearchedBlogs] = useState([])
  const navigate=useNavigate()

  useEffect(() => {
    getSearchedBlogs();
  }, [])

  const getSearchedBlogs = () => {
    axios.post(`${url}/get-blogs-by-tag`, { tag: tag })
      .then((response) => {
        console.log(response.data);
        setSearchedBlogs(response.data);
      })
      .catch((error) => {
        console.error(`ERROR: ${error}`);
      });
  }

  return (
    <div>
      <h1>{"Search results for " + tag}</h1>
      <div className="searchResults">
        {
          searchedBlogs ?
            searchedBlogs.map((blog, key) => {
              return (
                <div onClick={()=>{navigate(`../${username}/${blog._id}/View`)}} >{blog.header} </div>
              )
            })
            :
            <div>Searching...</div>
        }
      </div>
    </div>
  )
}

export default SearchPage