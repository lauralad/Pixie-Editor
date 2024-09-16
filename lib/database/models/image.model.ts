/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { model, models, Schema } from "mongoose";

export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureUrl: string;
    width?: number;
    height?: number;
    config?: object;
    transformationUrl?: URL;
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author?: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

const ImageSchema = new Schema({
    title: {type: String, required: true},
    transformationType: {type: String, required: true},
    publicId: {type: String, required: true},
    secureUrl: {type: String, required: true},
    width: {type: Number, required: false},
    height: {type: Number, required: false},
    config: {type: Object, required: false},
    transformationUrl: {type: URL, required: false},
    aspectRatio: {type: String, required: false},
    color: {type: String, required: false},
    prompt: {type: String, required: false},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;