import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

describe('<Blog/>', () => {
  let mock
  let component
  beforeEach(() => {
    mock = jest.fn()
    component = render(
      <Blog 
        blog={{title:'kokeilu', author: 'tester', likes: '1', url: 'www.assdfsdfd.com', user:{name: 'testaaja', username: 'test'}}}
        user={{name: 'testaaja', username: 'user'}}
        update={() => null}
        onClick={mock}
      />
    )
  })

  it('renders', () => {
    expect(component.container.querySelector('.clickable')).toBeDefined()
  })

  it('rendered content correct at start', () => {
    expect(component.container.querySelector('.clickable')).toHaveTextContent('test tester')
  })

  it('togglable is hidden at start', () => {
    expect(component.container.querySelector('.togglable')).toHaveStyle('display: none')
  })

  it('togglable content shown after click', () => {
    const div = component.container.querySelector('.clickable')
    fireEvent.click(div)
    expect(component.container.querySelector('.togglable')).toHaveStyle('display: ')
  })
})