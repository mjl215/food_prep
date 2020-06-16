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
      title: "",
      description: "",
      ingredients: [],
      vegan: null,
      vegetarian: null,
      costPerMeal: null,
      basePrepTime: null,
      additionalPrepTime: null,
      recipeImagesArray: [],
      recipeImageNumber: 0
    }  
    
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.setMainImage = this.setMainImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  async componentDidMount(){
    if (this.props.recipe.selectedRecipeId !== this.props.match.params.id){
        this.props.setSelectedRecipe(this.props.match.params.id)
    }
    const recipeRes = await axios.get(`/recipe/${this.props.match.params.id}`);
    const imageListRes = await axios.get(`/recipe/image/getIds/${this.props.match.params.id}`);

    this.setState({
        recipeId: recipeRes.data._id,
        owner: recipeRes.data.owner,
        title: recipeRes.data.title,
        description: recipeRes.data.description,
        ingredients: [...recipeRes.data.ingredients],
        vegan: recipeRes.data.vegan,
        vegetarian: recipeRes.data.vegetarian,
        costPerMeal: recipeRes.data.costPerMeal,
        basePrepTime: recipeRes.data.basePrepTime,
        additionalPrepTime: recipeRes.data.additionalPrepTime,
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


  render() {

    const {recipeId, owner, title, description, ingredients, costPerMeal, image, vegan, vegetarian, basePrepTime, additionalPrepTime} = this.state;
    
    if(owner === this.props.auth.id){
      return (
          <div>
              <div>
                  <h1>title</h1>
                  <input 
                      type="text"
                      value={title}
                      onChange={this.onChange}
                  />
              </div>
              <div>
                  <h3>description</h3>
                  <input 
                      type="text"
                      value={description}
                  />
              </div>
              <div>
                  <h3>Vegetarian</h3>
                  <input
                      type="checkbox"  
                      name="vegetarian" 
                      checked={vegan}
                  />
              </div>
              <div>
                  <h3>Vegan</h3>
                  <input
                      type="checkbox"  
                      name="vegan" 
                      checked={vegan}
                  />
              </div>
              <div>
                  <h3>Cost Per Meal</h3>
                  <input
                      type="number" 
                      placeholder="cost per meal" 
                      name="costPerMeal" 
                      min="1"
                      value={costPerMeal}
                  />
              </div>
              <div>
                  <h3>Prep time for 1 meal</h3>
                  <input 
                      type="number" 
                      name="basePrepTime"
                      min="1"
                      value={basePrepTime}
                  />
              </div>
              <div>
                  <h3>Additional Prep Time Per Meal</h3>
                  <input 
                      type="number"  
                      name="additionalPrepTime"
                      min="1" 
                      value={additionalPrepTime}
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
                  <button>
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