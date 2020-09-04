import mongoose, { Schema, Document, Model } from "mongoose";

export interface RecipeReviewInterface extends Document {
  recipeId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  review: string;
}

export interface RecipeReviewModelInterface extends Model<RecipeReviewInterface> {
    
}

const recipeReviewSchema: Schema = new mongoose.Schema({
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    review: {
      type: String
    }
})

const RecipeReview = mongoose.model<RecipeReviewInterface, RecipeReviewModelInterface>("RecipeReview", recipeReviewSchema);
export default RecipeReview;