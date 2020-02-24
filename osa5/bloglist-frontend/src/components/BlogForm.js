import React, {useState} from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({update, setSuccess, setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [toggled, setToggled] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({title, author, url})
      update(response)
      setSuccess(`added ${title} by ${author}`)
      setTimeout(() => {
        setSuccess('')
      }, 5000)
    } catch (e) {
      setError('Could not post blog')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <div>
      <button onClick={() => setToggled(!toggled)}>show form</button>
      <div style={{display: toggled ? '' : 'none'}}>
        <h2>create new blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)}/>
          </div>
          <div>
            author
            <input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)}/>
          </div>
          <div>
            url
            <input type='text' value={url} name='Url' onChange={({target}) => setUrl(target.value)}/>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  update: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

export default BlogForm