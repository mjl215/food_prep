const recipeReducerDefaultState = {
    selectedRecipeId: null
  };
  
  const recipeReducer = (state = recipeReducerDefaultState, action) => {
    switch (action.type) {
    case 'SET_SELECTED_RECIPE':
        return {
            selectedRecipeId: action.data
        }

    case 'CLEAR_SELECTED_RECIPE':
        return {
            selectedRecipeId: null
        }

      default:
        return state
    }
  }
  
  export default recipeReducer;