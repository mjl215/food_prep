import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderInterface extends Document {
    recipe: mongoose.Schema.Types.ObjectId;
    buyer: mongoose.Schema.Types.ObjectId;
    suplier: mongoose.Schema.Types.ObjectId;
    quantity: number;
    status: 'OPEN' | 'COMPLETE' | 'CANCELED',
    basketId: string
}

export interface OrderModelInterface extends Model<OrderInterface> {
    
}

const OrderSchema: Schema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    suplier: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    status:{
      type: String,
      required: true
    },
    basketId: {
      type: String,
      required: true
    }

})


const Order = mongoose.model<OrderInterface, OrderModelInterface>("Order", OrderSchema);
export default Order;