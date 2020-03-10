import React from 'react'

const RecipeImage = (props) => {
    if(!props.style){
        return (
            <div >
                <img key={props.image} src={`http://localhost:3000/recipe/image/${props.image}`} alt="recipe img"/>
            </div>
        )
    }

    return (
        <div >
            <img style={{width: props.style.width, height: props.style.height}} key={props.image} src={`http://localhost:3000/recipe/image/${props.image}`} alt="recipe img"/>
        </div>
    )
}


export default RecipeImage;