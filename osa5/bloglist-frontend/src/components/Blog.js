import React, {useState} from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, user }) => {
  const [toggled, setToggled] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updateBlog = {...blog}
    updateBlog.likes++
    updateBlog.user = blog.user.id
    await blogService.update(updateBlog)
    update()
    setToggled(true)
  }

  const handleDelete = async () => {
    if (!window.confirm(`delete ${blog.title}?`)) return
    await blogService.remove(blog.id)
    update()
  }

  return (
    <div className='clickable' style={blogStyle} onClick={() => setToggled(!toggled)}>
      {blog.title} {blog.author}
      <div className='togglable' style={{display: toggled ? '' : 'none'}}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          {blog.likes} likes
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          added by {blog.user.username}
        </div>
        {blog.user.username === user.username && <button onClick={handleDelete}>delete</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog