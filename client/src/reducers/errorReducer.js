const errorReducerDefaultState = []

const errorReducer = (state = errorReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_ERROR':
      return [
        ...state,
          action.data
      ]
  case 'REMOVE_ERROR':
      return state.filter(alert => alert.id !== action.data.id)
    default:
      return state
  }
}

export default errorReducer;