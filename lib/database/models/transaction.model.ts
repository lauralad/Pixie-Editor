/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({

    createdAt: {type: Date, default: Date.now},
    stripeId: {type: String, required: true, unique: true},
    amount: {type: Number, required: true},
    plan: {type: String, required: false},
    credits: {type: Number, required: false},
    buyer: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Transaction = models?.Transaction || model("Transaction", TransactionSchema);
 
export default Transaction;