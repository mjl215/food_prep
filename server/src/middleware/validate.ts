import { v4 as uuidv4 } from 'uuid'
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';


export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, firstName, password, confirmPassword, location} = req.body;
    const { address, addressId} = location;
    const errors: any = [];

    if(password.length < 6 || password.length > 20){
      errors.push({
        message: 'password must be between 6 and 20 charecters',
        type: 'register-password',
        id: uuidv4()
      })
    }

    if(!validator.equals(password, confirmPassword)){
      errors.push({
        message: 'passwords must be equal',
        type: 'register-confirmPassword',
        id: uuidv4()
      })
    }

    if(firstName.length < 4 || firstName.length > 40){
      errors.push({
        message: 'name must be between 4 and 40 charecters',
        type: 'register-name',
        id: uuidv4()
      })
    }


    if(!validator.isEmail(email)){
      errors.push({
        message: 'email address not valid',
        type: 'register-email',
        id: uuidv4()
      })
    }

    if( validator.isEmpty(address) || validator.isEmpty(addressId)){
      errors.push({
        message: 'Please select address',
        type: 'register-address',
        id: uuidv4()
      })
    }

    console.log(errors)
    if(errors.length > 0){
      return res.status(400).send(errors);
    }

    next();

  } catch (error) {
    res.status(400).send()
  }
}

export const validateAddRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title, 
      description, 
      costPerMeal, 
      ingredients, 
      vegetarian, 
      vegan,
      image,
      basePrepTime,
      additionalPrepTime
    } = req.body;
    const errors: any = [];

    if(title.length < 6 || title.length > 40){
      errors.push({
        message: 'title must be between 6 and 40 characters',
        type: 'recipe-title',
        id: uuidv4()
      })
    }

    if(description.length > 800){
      errors.push({
        message: 'Description must be shorter than 800 charecters',
        type: 'recipe-description',
        id: uuidv4()
      })
    }

    if(!costPerMeal){
      errors.push({
        message: 'You must enter a cost per meal',
        type: 'recipe-cost',
        id: uuidv4()
      })
    }

    if(costPerMeal <= 0){
      errors.push({
        message: 'cost per meal must be greater than 0',
        type: 'recipe-cost',
        id: uuidv4()
      })
    }

    if(ingredients.length <= 0){
      errors.push({
        message: 'You must enter atleast 1 ingredient',
        type: 'recipe-ingredients',
        id: uuidv4()
      })
    }

    if(!basePrepTime){
      errors.push({
        message: 'You must enter a prep time',
        type: 'recipe-basePrepTime',
        id: uuidv4()
      })
    }

    if(basePrepTime <= 0 ){
      errors.push({
        message: 'prep time must be greater than 0',
        type: 'recipe-basePrepTime',
        id: uuidv4()
      })
    }

    if(!additionalPrepTime){
      errors.push({
        message: 'You must enter additional prep time',
        type: 'recipe-basePrepTime',
        id: uuidv4()
      })
    }

    if(additionalPrepTime < 0){
      errors.push({
        message: 'additional prep time cannot be smaller than 0',
        type: 'recipe-additionalPrepTime',
        id: uuidv4()
      })
    }
  
    if(errors.length > 0){
      return res.status(400).send(errors);
    }

    next();

  } catch (error) {
    res.status(400).send()
  }
}

