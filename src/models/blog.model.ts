import { Schema, model } from "mongoose";
import { IBlog } from "../utils/typings";


const blogSchema= new Schema<IBlog>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: "string",
        required: true,
    },
    description: {
        type: "string",
        required: true
    },
    content: {
        type: "string",
        required: true
    },
    images: [{
        data: Buffer,
        contentType: "String",
        required: false,
    }],
    urls: [{
        body: "string",
        required: false
    }],
    likes: {
        type: "string",
        default: 0,
    },
    shareLink: {
        type: "string",
        required: true
    }
});

export const Blog = model<IBlog>("Blog", blogSchema)
