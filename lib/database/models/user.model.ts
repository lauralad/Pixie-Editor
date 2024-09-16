/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { model, models, Schema } from "mongoose";


const UserSchema = new Schema({
    clerkId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    photo: {type: Object, required: true},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    planId: {type: Number, default: 1},
    creditBalance: {type: Number, default: 10}
});

const User = models?.User || model('User', UserSchema);

export default User;