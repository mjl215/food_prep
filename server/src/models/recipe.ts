import mongoose, { Schema, Document, Model } from "mongoose";

export interface RecipeInterface extends Document {
    title: string;
    description: string;
    costPerMeal: number;
    ingredients: string[];
    vegetarian: boolean;
    vegan: boolean;
    owner: mongoose.Schema.Types.ObjectId;
    basePrepTime: number,
    additionalPrepTime: number
}

export interface RecipeModelInterface extends Model<RecipeInterface> {
    
}

const recipeSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    costPerMeal: {
        type: Number,
        required: true
    },
    ingredients: [
        {
            type: String
        }
    ],
    vegetarian: {
        type: Boolean,
        required: true
    }, 
    vegan: {
        type: Boolean,
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    basePrepTime: {
        type: Number,
        required: true
    },
    additionalPrepTime: {
        type: Number,
        required: true
    }
})

const Recipe = mongoose.model<RecipeInterface, RecipeModelInterface>("Recipe", recipeSchema);
export default Recipe;