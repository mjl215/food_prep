import mongoose, { Schema, Document, Model } from "mongoose";

export interface RecipeInterface extends Document {
    image: Buffer
    
}

export interface RecipeModelInterface extends Model<RecipeInterface> {
    
}

const recipeSchema: Schema = new mongoose.Schema({
    image: {
        type: Buffer
    }
})


const Recipe = mongoose.model<RecipeInterface, RecipeModelInterface>("Recipe", recipeSchema);
export default Recipe;