import React, { Component } from 'react';
import axios from 'axios';

import { filterRecipes } from '../../../utils/filterRecipes';

import RecipeGridItem from './RecipeGridItem';

class RecipeDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: null,
            filters: {
                vegetarian: null,
                vegan: null,
                ingredient: "",
                ingredients: [],
                search: "",
                maxPrice: ""
            }
        }

        this.veganButtonClick = this.veganButtonClick.bind(this);
        this.vegetarianButtonClick = this.vegetarianButtonClick.bind(this);
    }

    componentDidMount = async () => {
        const res = await axios.get('/recipe');
        this.setState({recipes: res.data})
    }

    veganButtonClick(){
        if(this.state.filters.vegan){
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    vegan: null
                }
            }))
        } else {
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    vegan: true
                }
            }))
        }
    }

    vegetarianButtonClick(){
        if(this.state.filters.vegetarian){
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    vegetarian: null
                }
            }))
        } else {
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    vegetarian: true
                }
            }))
        }
    }

    inputOnChangeHandler = (e) => {
        e.persist();
        
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                [e.target.name]: e.target.value
            }
          }))
    }

    addIngredient = () => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                ingredients: [...prevState.filters.ingredients, prevState.filters.ingredient],
                ingredient: "",
            }
        }))
    }

    render() {
        const filteredRecipes = this.state.recipes && filterRecipes(this.state.recipes, this.state.filters);
        const recipeGrid = filteredRecipes && filteredRecipes.map((recipe) => <RecipeGridItem key={recipe._id} recipe={recipe}/>)

        return (
            <div>
                <button
                    onClick={() => this.veganButtonClick()}
                >
                    vegan
                </button>
                <button
                    onClick={() => this.vegetarianButtonClick()}
                >
                    vegetarian
                </button>
                <input 
                    type="text" 
                    name="search"
                    value={this.state.filters.search}
                    onChange={this.inputOnChangeHandler}
                />
                <input 
                    type="text" 
                    name="ingredient"
                    value={this.state.filters.ingredient}
                    onChange={this.inputOnChangeHandler}
                />
                <button onClick={this.addIngredient}>add</button>
                <input 
                    type="number" 
                    name="maxPrice"
                    value={this.state.filters.maxPrice}
                    onChange={this.inputOnChangeHandler}
                />
                <div className="recipeDisplay">
                    {this.state.recipes ? recipeGrid : <p> loading recipes</p> }
                </div>
            </div>
            
        )
    }
}

export default RecipeDisplay;