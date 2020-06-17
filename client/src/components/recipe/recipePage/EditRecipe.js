import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setSelectedRecipe } from '../../../actions/RecipeActions';
import { setUser } from '../../../actions/AuthActions';

import IngredientListItem from '../uploadRecipe/IngredientListItem';
import RecipeImage from '../commonRecipe/RecipeImage';

import setHeader from '../../../utils/setHeader';

class EditRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
        recipeId: null,
        owner: null,
        originalOwner: null,
        title: null,
        originalTitle: null,
        description: null,
        originalDescription: null,
        ingredients: [],
        originalIngredients: [],
        vegan: null,
        originalVegan: null,
        vegetarian: null,
        originalVegetarian: null,
        costPerMeal: null,
        originalVegetarian: null,
        basePrepTime: null,
        originalBasePrepTime: null,
        additionalPrepTime: null,
        originalAdditionalPrepTime: null,
        recipeImagesArray: [],
        imagesEdited: false
    }  
    
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.setMainImage = this.setMainImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkboxOnChangeHandler = this.checkboxOnChangeHandler.bind(this);
  }

  async componentDidMount(){
    if (this.props.recipe.selectedRecipeId !== this.props.match.params.id){
        this.props.setSelectedRecipe(this.props.match.params.id)
    }
    const recipeRes = await axios.get(`/recipe/${this.props.match.params.id}`);
    const imageListRes = await axios.get(`/recipe/image/getIds/${this.props.match.params.id}`);

    const {_id, owner, title, description, ingredients, vegan, vegetarian,
        costPerMeal, basePrepTime, additionalPrepTime
    } = recipeRes.data;

    this.setState({
        recipeId: _id,
        owner,
        originalOwner: owner,
        title,
        originalTitle: title,
        description,
        originalDescription: description,
        ingredients: [...ingredients],
        originalIngredients: [...ingredients],
        vegan,
        originalVegan: vegan,
        vegetarian,
        originalVegetarian: vegetarian,
        costPerMeal,
        originalVegetarian: vegetarian,
        basePrepTime,
        originalBasePrepTime: basePrepTime,
        additionalPrepTime,
        originalAdditionalPrepTime: additionalPrepTime,
        recipeImagesArray: [...imageListRes.data]
    }, () => console.log('set the state'))
  }

  setMainImage(id){
    const newImageArray = this.state.recipeImagesArray.map((image) => {
        if(id === image.id){
            return {
                id: image.id,
                mainImage: true
            }
        } else {
            return {
                id: image.id,
                mainImage: false
            }
        }
    })

    this.setState({
        recipeImagesArray: newImageArray
    })
  }

  removeImage(id){
    this.setState((prevState) => ({
        recipeImagesArray: prevState.recipeImagesArray.filter((image) => {
            return image.id !== id
        })
    }))
  }

  async onDeleteClick(){
    try {

        const config = setHeader();

        console.log('deleting')
        const { data } = await axios.delete(`/recipe/${this.state.recipe._id}`, config)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

    onChange(e){
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    checkboxOnChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
          })
    }

    async onSaveChanges(){
        console.log('hi')
    }

    render() {

        const {recipeId, owner, title, description, ingredients, costPerMeal, image, vegan, vegetarian, basePrepTime, additionalPrepTime} = this.state;
        
        if(owner === this.props.auth.id){
        return (
            <div>
                <div>
                    <h1>title</h1>
                    <input
                        name="title"
                        type="text"
                        value={title}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <h3>description</h3>
                    <input 
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <h3>Vegetarian</h3>
                    <input
                        name="vegetarian"
                        type="checkbox"  
                        name="vegetarian"
                        checked={vegetarian}
                        onChange={this.checkboxOnChangeHandler}
                    />
                </div>
                <div>
                    <h3>Vegan</h3>
                    <input
                        name="vegan"
                        type="checkbox"  
                        name="vegan" 
                        value={vegan}
                        checked={vegan}
                        onChange={this.checkboxOnChangeHandler}
                    />
                </div>
                <div>
                    <h3>Cost Per Meal</h3>
                    <input
                        name="costPerMeal"
                        type="number" 
                        placeholder="cost per meal" 
                        name="costPerMeal" 
                        min="1"
                        value={costPerMeal}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <h3>Prep time for 1 meal</h3>
                    <input
                        name="basePrepTime"
                        type="number" 
                        name="basePrepTime"
                        min="1"
                        value={basePrepTime}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <h3>Additional Prep Time Per Meal</h3>
                    <input 
                        name="additionalPrepTime"
                        type="number"  
                        name="additionalPrepTime"
                        min="1" 
                        value={additionalPrepTime}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Add an Ingredient" 
                            name="ingredient"
                            onChange={this.inputOnChangeHandler}
                            value={this.state.ingredient}
                        />
                        
                    </div>
                    <button
                    onClick={this.addIngredient}>add</button>
                    {ingredients && ingredients.map((ingredient, i) => (
                        <IngredientListItem key={i} ingredient={ingredient} removeIngredient={this.removeIngredient}/>
                    ))}
                    
                </div>
                <div>
                    {this.state.recipeImagesArray && this.state.recipeImagesArray.map((imageObj) => {
                        return <RecipeImage 
                            key={imageObj.id} 
                            image={imageObj.id} 
                            mainImage={false} 
                            highlightMainImage={imageObj.mainImage}
                            editView={true}
                            setMainImage={this.setMainImage}
                            removeImage={this.removeImage}
                            />
                    })}
                </div>
                <div>
                    <button
                        onClick={this.onSaveChanges}
                    >
                        save changes 
                    </button>
                </div>
                <div>
                    <button
                        onClick={this.onDeleteClick}
                        >delete recipe
                    </button>
                </div>
                
            </div>
        )
        } else {
        return(
            <div>no data</div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);