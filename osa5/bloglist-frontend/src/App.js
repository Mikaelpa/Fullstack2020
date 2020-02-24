import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {useField} from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => a.likes - b.likes).reverse() )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogAppLoggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, 
        password: password.value
      })
      console.log("user")
      setUser(user)
      username.reset()
      password.reset()
      blogService.setToken(user.token)
      window.localStorage.setItem('blogAppLoggedUser', JSON.stringify(user))
    } catch (e) {
      setError('wrong username or password')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppLoggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const updateBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => a.likes - b.likes).reverse())
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <h2 style={{color:'green'}}>{success}</h2>
        <h2 style={{color:'red'}}>{error}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            user
            <input {...username} reset={null}/>
          </div>
          <div>
            password
            <input {...password} reset={null}/>
          </div>
          <button type="submit">send</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <h2 style={{color:'green'}}>{success}</h2>
      <h2 style={{color:'red'}}>{error}</h2>
      <div>{user.name} logged in</div>
      <button onClick={handleLogout}>logout</button>
      <BlogForm update={updateBlogs} setSuccess={setSuccess} setError={setError}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} update={updateBlogs} user={user} />
      )}
    </div>
  )
}

export default App