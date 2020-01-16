import React from 'react'

const RecipeImage = (props) => {

    return (
        <div>
            <img key={props.image} src={`http://localhost:3000/recipe/image/${props.image}`} alt="recipe img"/>
        </div>
    )
}


export default RecipeImage;