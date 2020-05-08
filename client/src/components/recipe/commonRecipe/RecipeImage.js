import React from 'react'

const RecipeImage = (props) => {
    let url = ``;

    if(props.mainImage === true){
        url = `http://localhost:3000/recipe/mainImage/${props.image}`
    } else {
        url = `http://localhost:3000/recipe/image/${props.image}`
    }

    // const url = `http://localhost:3000/recipe/mainImage/${props.image}`

    if(!props.style){
        return (
            <div >
                <img key={props.image} src={url} alt="recipe img"/>
            </div>
        )
    }

    return (
        <div >
            <img 
                style={{width: props.style.width, height: props.style.height}} 
                key={props.image} src={url} 
                alt="recipe img"
            />
        </div>
    )
}


export default RecipeImage;