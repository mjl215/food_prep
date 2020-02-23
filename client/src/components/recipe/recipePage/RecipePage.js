import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from "uuid";

import RecipeImage from '../commonRecipe/RecipeImage';

import { setSelectedRecipe } from '../../../actions/RecipeActions';
import { setUser } from '../../../actions/AuthActions';

class RecipePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: null,
            quantity: 1
            }
        
        
    }

    async componentDidMount(){
        if (this.props.recipe.selectedRecipeId !== this.props.match.params.id){
            this.props.setSelectedRecipe(this.props.match.params.id)
        }
        const res = await axios.get(`/recipe/${this.props.match.params.id}`);
        console.log(res)
        this.setState({
            recipe: res.data
        }, () => console.log('set the state'))
    }

    inputOnChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
          })
    }

    onClick = async (e) => {

      const token = JSON.parse(localStorage.getItem('token'));
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      
      //send new basket
      const body = {
        basket: [...this.props.auth.basket, 
          {
            recipe: this.state.recipe._id, 
            quantity: this.state.quantity,
            owner: this.state.recipe.owner,
            costPerMeal: this.state.recipe.costPerMeal,
            basePrepTime: this.state.recipe.basePrepTime,
            additionalPrepTime: this.state.recipe.additionalPrepTime,
            basketId: uuid.v4()
          }
        ]
      }


      await axios.post('/user/basket', body, config)
      //update state from db
      //Make update user router and action
      this.props.setUser();
    }

    render() {

        if(this.state.recipe){

            const {title, description, ingredients, costPerMeal, image, vegan, vegetarian, basePrepTime, additionalPrepTime} = this.state.recipe;
            const ingredientsRender = ingredients.map((ingredient, i) => {
                return ingredients[i+1] ? <p key="i">{ingredient}, </p> : <p key="i">{ingredient}.</p>
             
            })
            return (
                <div>
                    <h1>{title}</h1>
                    <h3>{description}</h3>
                    {vegetarian && <h3>vegetarian</h3>}
                    {vegan && <h3>Vegan</h3>}
                    {ingredientsRender}
                    <RecipeImage image={image} />
                    <p>{costPerMeal}</p>
                    <p>Eastimated Prep Time -  {basePrepTime + (additionalPrepTime * (this.state.quantity-1))} minutes</p>
                    <input 
                        type="number" 
                        name="quantity"
                        onChange={this.inputOnChangeHandler}
                        value={this.state.quantity}
                    />
                    <button onClick={this.onClick}>Add to Basket</button>
                </div>
            )
        } else {
            return <p>Loading</p>
        }
        
    }
}

const mapStateToProps = (state) => ({
    recipe: state.recipe,
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedRecipe: (id) => dispatch(setSelectedRecipe(id)),
    setUser: () => dispatch(setUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
