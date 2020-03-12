import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';

const IngredientListItem = ({ingredient, removeIngredient}) => {
  return (
    <div>
      {ingredient} <ClearIcon onClick={() => removeIngredient(ingredient)}/>
    </div>
  )
}


export default IngredientListItem;