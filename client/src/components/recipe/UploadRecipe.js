import React, { Component } from 'react'
import axios from 'axios';

export default class UploadRecipe extends Component {
    constructor(props) {
        super(props);
            this.state = {
            selectedFile: undefined,
            recipeTitle: "",
            recipeDescription: "",
            costPerMeal: 0,
            ingredients: "",
            vegetarian: false,
            vegan: false
            }
    
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
                image: imageRes.data
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
                    vegan: false
                })

                document.getElementById("recipeImage").value = "";
            }
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
                        value={this.state.recipeTitle}
                    />
                    <textarea 
                        rows="5" 
                        cols="50" 
                        placeholder="Meal Description" 
                        name="recipeDescription"
                        onChange={this.inputOnChangeHandler} 
                        value={this.state.recipeDescription}
                    />
                    <input 
                        type="number" 
                        placeholder="cost per meal" 
                        name="costPerMeal" 
                        onChange={this.inputOnChangeHandler} 
                        value={this.state.costPerMeal}
                    />
                    <textarea 
                        rows="5" cols="50" 
                        placeholder="Meal ingredients (please separate with ," 
                        name="ingredients"
                        onChange={this.inputOnChangeHandler}
                        value={this.state.ingredients}
                    />
                    <div>
                        <input 
                            type="checkbox"  
                            name="vegetarian"
                            onChange={this.checkboxOnChangeHandler}
                            checked={this.state.vegetarian}
                        />
                        <label htmlFor="vegetarian">vegetarian</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"  
                            name="vegan" 
                            onChange={this.checkboxOnChangeHandler}
                            checked={this.state.vegan}
                        />
                        <label htmlFor="vegetarian">vegan</label>
                    </div>
                    <input 
                        type="file" 
                        name="selectFile"
                        id="recipeImage" 
                        onChange={this.onChangeHandler}
                        />
                    <button type="button"  onClick={this.onClickHandler}>Upload</button>
                </form>
            </div>
            
        )
    }
}
