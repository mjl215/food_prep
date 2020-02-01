import React from 'react';

 const RecipeDetails = (props) => {

    const {title, costPerMeal, vegetarian, vegan} = props.details;

    return (
        <div>
            <p>{title} -- £{costPerMeal} per meal</p>
            {vegetarian && <p>vegetarian</p>}
            {vegan && <p>vegan</p>}
        </div>
    )
}


export default RecipeDetails;