import React from 'react';
import { useParams } from 'react-router-dom';

function BlogPage() {
  let { username } = useParams();
  return (
    <div>BlogPage of {username}</div>
  )
}

export default BlogPage