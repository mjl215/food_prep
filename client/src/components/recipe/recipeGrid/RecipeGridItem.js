import React from 'react'
import RecipeButtons from './RecipeButtons';
import RecipeImage from '../commonRecipe/RecipeImage';
import RecipeDetails from './RecipeDetails';

const RecipeGridItem = (props) => {
  const {_id, title, costPerMeal, image, vegan, vegetarian} = props.recipe;

  return (
    <div className="grid--item">
      <RecipeDetails details={{_id, title, costPerMeal, vegan, vegetarian}}/>
      <RecipeImage image={image} style={{width: '90%', height: '200px'}}/>
      <RecipeButtons recipeID={_id} />
    </div>
  )
}

export default RecipeGridItem;