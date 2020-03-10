import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

 const RecipeDetails = (props) => {

    const {title, costPerMeal, vegetarian, vegan} = props.details;

    return (
        <div>
            <h1 className="recipe--details__title">{title}</h1> 
            <div className="recipe--details__info">
                <div className="recipe--details__info__item">
                    <p>vegetarian</p> {vegetarian ? <CheckIcon/> : <ClearIcon />}
                </div>
                <div className="recipe--details__info__item">
                <p>vegan</p> {vegan ? <CheckIcon/> : <ClearIcon />}
                </div>
            </div>
            <p className="recipe--details__cost">£{costPerMeal} per meal</p>
        </div>
    )
}


export default RecipeDetails;