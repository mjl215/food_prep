import mongoose, { Schema, Document, Model } from "mongoose";

export interface AdditionalImageInterface extends Document {
    imageArray: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[];
    owner: mongoose.Schema.Types.ObjectId; 
    recipe: mongoose.Schema.Types.ObjectId;
}

export interface AdditionalImageModelInterface extends Model<AdditionalImageInterface> {
}

const additionalImageSchema: Schema = new mongoose.Schema({
    imageArray: {
        type: [],
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        // required: true
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
        // required: true
    }
})

const AdditionalImage = mongoose.model<AdditionalImageInterface, AdditionalImageModelInterface>("AdditionalImage", additionalImageSchema);
export default AdditionalImage;