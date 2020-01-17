import React, { Component } from 'react'
import axios from 'axios';

export default class UploadRecipe extends Component {
    constructor(props) {
        super(props);
            this.state = {
            selectedFile: null,
            recipeTitle: "",
            recipeDescription: "",
            costPerMeal: null,
            ingredients: "",
            vegetarian: false,
            vegan: false
            }
    
    }

    
    onClickHandler = async () => {

        try {
            const data = new FormData() 
            data.append('upload', this.state.selectedFile);
            const imageRes = await axios.post('/recipe/image', data);
            console.log(imageRes);

            const newRecipe = {
                title: this.state.recipeTitle,
                description: this.state.recipeDescription,
                costPerMeal: this.state.costPerMeal,
                ingredients: this.state.ingredients,
                vegetarian: this.state.vegetarian,
                vegan: this.state.vegan,
                image: imageRes.data
            }

            const recipeRes = await axios.post('/recipe', newRecipe);
            console.log(recipeRes);
        } catch (error) {
            console.log('there was an error posting recipe:  ' + error);
        }
        
    }

    onChangeHandler = (e) =>{
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

    render() {


        return (
            <div >
                
                <form>
                    <input 
                        type="text" 
                        placeholder="Meal Title" 
                        name="recipeTitle"
                        onChange={this.inputOnChangeHandler} 
                    />
                    <textarea 
                        rows="5" 
                        cols="50" 
                        placeholder="Meal Description" 
                        name="recipeDescription"
                        onChange={this.inputOnChangeHandler} 
                    />
                    <input 
                        type="number" 
                        placeholder="cost per meal" 
                        name="costPerMeal" 
                        onChange={this.inputOnChangeHandler} 
                    />
                    <textarea 
                        rows="5" cols="50" 
                        placeholder="Meal ingredients (please separate with ," 
                        name="ingredients"
                        onChange={this.inputOnChangeHandler} 
                    />
                    <div>
                        <input 
                            type="checkbox"  
                            name="vegetarian"
                            onChange={this.checkboxOnChangeHandler}
                        />
                        <label htmlFor="vegetarian">vegetarian</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"  
                            name="vegan" 
                            onChange={this.checkboxOnChangeHandler}
                        />
                        <label htmlFor="vegetarian">vegan</label>
                    </div>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                    <button type="button"  onClick={this.onClickHandler}>Upload</button>
                </form>
            </div>
            
        )
    }
}
