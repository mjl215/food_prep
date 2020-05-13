import mongoose, { Schema, Document, Model } from "mongoose";

export interface ProfileImageInterface extends Document {
    image: Buffer;
    user: mongoose.Schema.Types.ObjectId;
}

export interface ProfileImageModelInterface extends Model<ProfileImageInterface> {
}

const profileImageSchema: Schema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const ProfileImage = mongoose.model<ProfileImageInterface, ProfileImageModelInterface>("ProfileImage", profileImageSchema);
export default ProfileImage;