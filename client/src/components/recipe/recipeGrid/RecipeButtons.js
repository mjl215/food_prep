import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setSelectedRecipe } from '../../../actions/RecipeActions';

const RecipeButtons = (props) => {

    const onClick = async () => {
        props.setSelectedRecipe(props.recipeID)
    }
    
    return (
        <div>
            <button onClick={onClick} className="recipe--button__button">
                <Link 
                    className="recipe--button__link"
                    to={`/recipe/${props.recipeID}`}
                >
                    More Details
                </Link>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
  })
  
const mapDispatchToProps = (dispatch) => ({
    setSelectedRecipe: (id) => dispatch(setSelectedRecipe(id))
  })
  

export default connect(mapStateToProps, mapDispatchToProps)(RecipeButtons);