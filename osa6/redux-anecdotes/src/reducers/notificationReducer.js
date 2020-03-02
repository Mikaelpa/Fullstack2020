const reducer = (state = "", action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case "CLEAR":
      return ""
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, time * 1000);
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })
  }
}

export default reducer
