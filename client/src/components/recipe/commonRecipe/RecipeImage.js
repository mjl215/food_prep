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
                {
                props.editView ? 
                    (props.highlightMainImage ? 
                    <div>main image</div> : 
                    <div>
                        <button
                            onClick={() => props.setMainImage(props.image)}
                        >
                        set as main image
                        </button>
                        <button
                            onClick={() => props.removeImage(props.image)}
                        >delete</button>
                    </div>
                    )
                    :
                null
                }
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
            {
                props.editView ? 
                    (props.highlightMainImage ? 
                    <div>main image</div> : 
                    <button
                        
                    >
                        set as main image
                    </button>) :
                null
            }
        </div>
    )
}


export default RecipeImage;