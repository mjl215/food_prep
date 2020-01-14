import mongoose, { Schema, Document, Model } from "mongoose";

export interface RecipeImageInterface extends Document {
    image: Buffer;
}

export interface RecipeImageModelInterface extends Model<RecipeImageInterface> {
    
}

const recipeImageSchema: Schema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    }
})


const RecipeImage = mongoose.model<RecipeImageInterface, RecipeImageModelInterface>("RecipeImage", recipeImageSchema);
export default RecipeImage;