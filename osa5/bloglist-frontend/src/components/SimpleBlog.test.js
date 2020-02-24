import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('<SimpleBlog/>', () => {
  let mock
  let component
  beforeEach(() => {
    mock = jest.fn()
    component = render(<SimpleBlog blog={{title:'test', author: 'tester', likes: '1'}} onClick={mock}/>)
  })

  it('renders', () => {
    expect(component.container.querySelector('.container')).toBeDefined()
  })

  it('author and title are right', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent('test tester')
  })

  it('likes are right', () => {
    expect(component.container.querySelector('.likes')).toHaveTextContent('blog has 1 likes')
  })

  it('handler called two times when two clicks', () => {
    const btn = component.container.querySelector('button')
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(mock.mock.calls.length).toBe(2)
  })
})