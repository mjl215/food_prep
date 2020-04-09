import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import { addError } from '../../../actions/ErrorActions';

import IngredientListItem from './IngredientListItem';
import Alert from '../../common/Alert';

class UploadRecipe extends Component {
    constructor(props) {
        super(props);
            
        this.state = {
            selectedFile: null,
            additionalImage: null,
            additionalImagesArray: [],
            recipeTitle: "",
            recipeDescription: "",
            costPerMeal: 0,
            ingredient: "",
            ingredients: [],
            vegetarian: false,
            vegan: false,
            basePrepTime: 0,
            additionalPrepTime: 0
            }

        this.addIngredient = this.addIngredient.bind(this);
        this.setAdditionalImage = this.setAdditionalImage.bind(this);
        this.addAdditionalImage = this.addAdditionalImage.bind(this);
    }

    
    onClickHandler = async () => {

        try {
            const  data= new FormData() 
            data.append('upload', this.state.selectedFile);

            const token = JSON.parse(localStorage.getItem('token'));
      
            const config = {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            }

            const imageRes = await axios.post('/recipe/image', data, config);

            const newRecipe = {
                title: this.state.recipeTitle,
                description: this.state.recipeDescription,
                costPerMeal: this.state.costPerMeal,
                ingredients: this.state.ingredients,
                vegetarian: this.state.vegetarian,
                vegan: this.state.vegan,
                image: imageRes.data,
                basePrepTime: this.state.basePrepTime,
                additionalPrepTime: this.state.additionalPrepTime
            }

            const recipeRes = await axios.post('/recipe', newRecipe, config);
            console.log(recipeRes.status)

            if(recipeRes.status === 200){

                this.setState({
                    selectedFile: undefined,
                    recipeTitle: "",
                    recipeDescription: "",
                    costPerMeal: 0,
                    ingredient: "",
                    ingredients: [],
                    vegetarian: false,
                    vegan: false,
                    basePrepTime: 0,
                    additionalPrepTime: 0
                })

                document.getElementById("recipeImage").value = "";
            }
        } catch (error) {
            console.log(error.response);
            this.props.addError(error);
        }
        
    }

    onChangeHandler = (e) =>{

        this.setState({
            selectedFile: e.target.files[0],
            //loaded: 0,
        })
    };

    setAdditionalImage = (e) => {        
        const additionalImage = e.target.files[0]
        const hi = [];
        console.log(hi.push(additionalImage));

        this.setState({
            additionalImage: additionalImage
        })
    }

    addAdditionalImage = (e) => {
        e.preventDefault();

        this.setState((prevState) =>({
            additionalImagesArray: prevState.additionalImagesArray.concat(prevState.additionalImage)
        }))
    }

    inputOnChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
          })
    }

    checkboxOnChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
          })
    }

    addIngredient = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            ingredients: [...prevState.ingredients, prevState.ingredient],
            ingredient: ''
        }))
    }
    
    removeIngredient = (remove) => {
        console.log(remove);
        const newIngredients = this.state.ingredients.filter((ingredient) => {
            return ingredient !== remove;
        })

        this.setState({
            ingredients: newIngredients
        })

        console.log(newIngredients);
    }

    render() {


        return (
            <div className="upload--recipe">
                <div className="upload--recipe__container">
                    <h1>Add new Recipe</h1>
                    <form className="upload--recipe__container__form">
                        <p>Recipe Title *</p>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Meal Title" 
                                name="recipeTitle"
                                onChange={this.inputOnChangeHandler}
                                value={this.state.recipeTitle}
                            />
                            <Alert errorType={'recipe-title'}/>
                        </div>
                        <p>Recipe Desciption *</p>
                        <div>
                            <textarea 
                                rows="5" 
                                cols="50" 
                                placeholder="Meal Description" 
                                name="recipeDescription"
                                onChange={this.inputOnChangeHandler} 
                                value={this.state.recipeDescription}
                            />
                            <Alert errorType={'recipe-description'}/>
                        </div>
                        <p>Meal Cost *</p>
                        <div>
                            <input 
                                type="number" 
                                placeholder="cost per meal" 
                                name="costPerMeal" 
                                min="1"
                                onChange={this.inputOnChangeHandler} 
                                value={this.state.costPerMeal}
                            />
                            <Alert errorType={'recipe-cost'}/>
                        </div>
                        <p>Meal Ingredients *</p>
                        <div>
                            <div>
                                <input 
                                    type="text"
                                    placeholder="Add an Ingredient" 
                                    name="ingredient"
                                    onChange={this.inputOnChangeHandler}
                                    value={this.state.ingredient}
                                />
                                <Alert errorType={'recipe-ingredients'}/>
                            </div>
                            <button
                            onClick={this.addIngredient}>add</button>
                            {this.state.ingredients && this.state.ingredients.map((ingredient, i) => (
                                <IngredientListItem key={i} ingredient={ingredient} removeIngredient={this.removeIngredient}/>
                            ))}
                            
                        </div>
                        <p>Prep time for 1 meal *</p>
                        <div>
                            <input 
                                type="number" 
                                placeholder="base prep time" 
                                name="basePrepTime" 
                                min="1"
                                onChange={this.inputOnChangeHandler} 
                                value={this.state.basePrepTime}
                            />
                            <Alert errorType={'recipe-basePrepTime'}/>
                        </div>
                        <p>additional prep time per meal *</p>
                        <div>
                            <input 
                                type="number" 
                                placeholder="additional prep time" 
                                name="additionalPrepTime"
                                min="1"
                                onChange={this.inputOnChangeHandler} 
                                value={this.state.additionalPrepTime}
                            />
                            <Alert errorType={'recipe-additionalPrepTime'}/>
                        </div>
                        <p>vegetarian</p>
                        <input 
                            type="checkbox"  
                            name="vegetarian"
                            onChange={this.checkboxOnChangeHandler}
                            checked={this.state.vegetarian}
                        />
                        <p>vegan</p>
                        <input 
                            type="checkbox"  
                            name="vegan" 
                            onChange={this.checkboxOnChangeHandler}
                            checked={this.state.vegan}
                        />
                        <p>Main Recipe Image *</p>
                        <div>
                            <input 
                                type="file" 
                                name="selectFile"
                                id="recipeImage" 
                                onChange={this.onChangeHandler}
                            />
                            <Alert />
                        </div>
                        <div></div>
                        <button 
                            className="landing--page__content__button"
                            type="button"  
                            onClick={this.onClickHandler}
                        >
                            Add Recipe
                        </button>
                    </form>
                </div>
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addError: (error) => dispatch(addError(error))
  })

export default connect(null, mapDispatchToProps)(UploadRecipe);