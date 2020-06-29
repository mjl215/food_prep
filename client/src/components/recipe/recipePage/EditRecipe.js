import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash'; //only import function later
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
        ingredient: undefined,
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
        originalRecipeImagesArray: [],
        imagesEdited: false
    }  
    
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.setMainImage = this.setMainImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkboxOnChangeHandler = this.checkboxOnChangeHandler.bind(this);
    this.onSaveChanges = this.onSaveChanges.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
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

    imageListRes.data.forEach(e => {
        e.deleted = false;
        e.changesMade = false;
    });

    this.setState({
        recipeId: _id,
        owner,
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
        originalCostPerMeal: costPerMeal,
        basePrepTime,
        originalBasePrepTime: basePrepTime,
        additionalPrepTime,
        originalAdditionalPrepTime: additionalPrepTime,
        recipeImagesArray: [...imageListRes.data],
        originalRecipeImagesArray: [...imageListRes.data]
    }, () => console.log('set the state'))
  }

  setMainImage(id){
    const newImageArray = this.state.recipeImagesArray.map((image) => {
        if(id === image.id){
            return {
                ...image,
                changesMade: true,
                mainImage: true
            }
        } else if(id !== image.id && image.mainImage) {
            return {
                ...image,
                changesMade: true,
                mainImage: false
            }
        } else {
            return {
                ...image
            }
        }
    })

    this.setState({
        recipeImagesArray: newImageArray
    })
  }

  removeImage(id){

    this.setState((prevState) => {
        const newArr = prevState.recipeImagesArray.map((image) => {
            if(image.id === id){
                return {
                    ...image,
                    deleted: true
                }
            } else {
                return image
            }
        })

        return ({
        recipeImagesArray: [...newArr]
    })}
    )
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

    checkboxOnChangeHandler(e){
        this.setState({
            [e.target.name]: e.target.checked
          })
    }

    addIngredient(e){
        e.preventDefault();
        this.setState(prevState => ({
            ingredients: [...prevState.ingredients, prevState.ingredient],
            ingredient: ''
        }))
    }

    removeIngredient(remove){

        const newIngredients = this.state.ingredients.filter((ingredient) => {
            return ingredient !== remove;
        })

        this.setState({
            ingredients: newIngredients
        })

    }

    async onSaveChanges(){

        const config = setHeader();
        let body = {};

        if(this.state.title !== this.state.originalTitle){
            body.title = this.state.title;
        }

        if(this.state.description !== this.state.originalDescription){
            body.description = this.state.description;
        }

        if(this.state.vegetarian !== this.state.originalVegetarian){
            body.vegetarian = this.state.vegetarian;
        }

        if(this.state.vegan !== this.state.originalVegan){
            body.vegan = this.state.vegan;
        }

        if(this.state.costPerMeal !== this.state.originalCostPerMeal){
            body.costPerMeal = this.state.costPerMeal;
        }

        if(this.state.basePrepTime !== this.state.originalBasePrepTime){
            body.basePrepTime = this.state.basePrepTime;
        }

        if(this.state.additionalPrepTime !== this.state.originalAdditionalPrepTime){
            body.additionalPrepTime = this.state.additionalPrepTime;
        }

        if(_.isEqual(this.state.ingredients, this.state.originalIngredients) === false){
            body.ingredients = [...this.state.ingredients];
        }

        if(Object.keys(body).length > 0){
            body.owner = this.state.owner;
            body.recipe = this.state.recipeId;
            const res = await axios.patch('/recipe/update', body, config);
            console.log(res);
        } else {
            console.log('no changes')
        }

        if(_.isEqual(this.state.recipeImagesArray, this.state.originalRecipeImagesArray) === false){
            console.log('images Changed');
            const deletedImages = this.state.recipeImagesArray
                .filter((img) => img.deleted === true)
                .map(img => img.id);

            console.log(deletedImages);

            const updatedImages = this.state.recipeImagesArray.filter((img) => {
                return !img.deleted && img.changesMade 
            })

            console.log(updatedImages);
            
            const res = await axios.patch('/recipe/image');
            console.log(res);
        }

        
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
                            onChange={this.onChange}
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
                    {this.state.recipeImagesArray && this.state.recipeImagesArray.filter(imgObj => imgObj.deleted !== true)
                    .map((imageObj) => {
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