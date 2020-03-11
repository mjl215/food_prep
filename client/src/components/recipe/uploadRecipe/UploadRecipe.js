import React, { Component } from 'react'
import axios from 'axios';
import IngredientListItem from './IngredientListItem';

export default class UploadRecipe extends Component {
    constructor(props) {
        super(props);
            
        this.state = {
            selectedFile: undefined,
            recipeTitle: "",
            recipeDescription: "",
            costPerMeal: 0,
            Ingredient: "",
            ingredients: [],
            vegetarian: false,
            vegan: false,
            basePrepTime: 0,
            additionalPrepTime: 0
            }

        this.addIngredient = this.addIngredient.bind(this);
    }

    
    onClickHandler = async () => {

        try {
            const data = new FormData() 
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
                    ingredients: "",
                    vegetarian: false,
                    vegan: false,
                    basePrepTime: 0,
                    additionalPrepTime: 0
                })

                document.getElementById("recipeImage").value = "";
            }
        } catch (error) {
            console.log('there was an error posting recipe:  ' + error);
        }
        
    }

    onChangeHandler = (e) =>{
        console.log(e.target.files);
        this.setState({
            selectedFile: e.target.files[0],
            //loaded: 0,
        })
    };

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



    render() {


        return (
            <div className="upload--recipe">
                <div className="upload--recipe__container">
                    <h1>Add a meal</h1>
                    <form className="upload--recipe__container__form">
                        
                            <p>Recipe Title</p>
                            <input 
                                type="text" 
                                placeholder="Meal Title" 
                                name="recipeTitle"
                                onChange={this.inputOnChangeHandler}
                                value={this.state.recipeTitle}
                            />
                        <p>Recipe Desciption</p>
                        <textarea 
                            rows="5" 
                            cols="50" 
                            placeholder="Meal Description" 
                            name="recipeDescription"
                            onChange={this.inputOnChangeHandler} 
                            value={this.state.recipeDescription}
                        />
                            <p>Meal Cost</p>
                            <input 
                                type="number" 
                                placeholder="cost per meal" 
                                name="costPerMeal" 
                                onChange={this.inputOnChangeHandler} 
                                value={this.state.costPerMeal}
                            />
                            <p>Meal Ingredients</p>
                            <div>
                                <input 
                                    type="text"
                                    placeholder="Add an Ingredient" 
                                    name="ingredient"
                                    onChange={this.inputOnChangeHandler}
                                    value={this.state.ingredient}
                                />
                                <button
                                onClick={this.addIngredient}>add</button>
                                <IngredientListItem ingredient={'peaches'} />
                            </div>
                            <p>Prep time for 1 meal</p>
                            <input 
                                type="number" 
                                placeholder="base prep time" 
                                name="basePrepTime" 
                                onChange={this.inputOnChangeHandler} 
                                value={this.state.basePrepTime}
                            />
                            <p>additional prep time per meal</p>
                            <input 
                                type="number" 
                                placeholder="additional prep time" 
                                name="additionalPrepTime" 
                                onChange={this.inputOnChangeHandler} 
                                value={this.state.additionalPrepTime}
                            />
                            <label htmlFor="vegetarian">vegetarian</label>
                            <input 
                                type="checkbox"  
                                name="vegetarian"
                                onChange={this.checkboxOnChangeHandler}
                                checked={this.state.vegetarian}
                            />
                            
                            <label htmlFor="vegetarian">vegan</label>
                            <input 
                                type="checkbox"  
                                name="vegan" 
                                onChange={this.checkboxOnChangeHandler}
                                checked={this.state.vegan}
                            />
                        <input 
                            type="file" 
                            name="selectFile"
                            id="recipeImage" 
                            onChange={this.onChangeHandler}
                            />
                        <button type="button"  onClick={this.onClickHandler}>Upload</button>
                    </form>
                </div>
            </div>
            
        )
    }
}
