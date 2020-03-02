
const reducer = (state = "", action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.data
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'CHANGE_FILTER',
    data: filter
  }
}

export default reducer