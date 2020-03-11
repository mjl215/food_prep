import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';

const IngredientListItem = ({ingredient}) => {
  return (
    <div>
      {ingredient} <ClearIcon />
    </div>
  )
}


export default IngredientListItem;