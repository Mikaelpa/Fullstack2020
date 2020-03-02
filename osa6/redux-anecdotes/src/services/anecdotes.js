import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getId = () => (1000000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (content) => {
  const object = {
    content,
    id: getId(),
    votes: 0
  }
  const res = await axios.post(baseUrl, object)
  return res.data
}

const update = async (anecdote) => {
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
  return res.data
}

export default {
  getAll, create, update
}