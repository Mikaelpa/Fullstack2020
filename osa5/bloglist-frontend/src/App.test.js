import React from 'react'
import { 
  render, waitForElement 
} from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  let component
  let blogs 

  beforeEach(() => {
    component = render(<App/>)
  })

  it('if no user logged, notes are not rendered', async () => {
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('kirjaudu')
    ) 

    // expectations here
    expect(component.container).toHaveTextContent('kirjaudu')
  })
}