import React, { Component } from 'react';
import axios from 'axios';

import RecipeButtons from './RecipeButtons';
import RecipeImage from './RecipeImage';
import RecipeDetails from './RecipeDetails';

class RecipeDisplay extends Component {
    constructor(props) {
        super(props);
            this.state = {
            recipes: null
            }
    
    }

    componentDidMount = async () => {

        const res = await axios.get('/recipe/image');


        this.setState({recipes: res.data})
    }

    

    render() {

        const recipeGrid = this.state.recipes && this.state.recipes.map((recipe) => {
                const {_id, title, costPerMeal, image, vegan, vegetarian} = recipe;
                return (
                    <div key={_id}>
                        <RecipeDetails details={{_id, title, costPerMeal, vegan, vegetarian}}/>
                        <RecipeImage image={image} />
                        <RecipeButtons props={_id} />
                    </div>
                )
            })

        return (
            <div>
                {this.state.recipes ? recipeGrid : <p> loading recipe</p> }
            </div>
        )
    }
}

export default RecipeDisplay;