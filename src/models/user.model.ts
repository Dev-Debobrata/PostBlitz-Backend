import { Schema, model } from "mongoose";
import { IUser } from "../utils/typings"


const userSchema= new Schema<IUser>({
    name: {
        type: "string",
        required: true,
    },
    username: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    address: {
        type: "string",
        required: true,
    },
    pincode: {
        type: "number",
        required: true
    },
    country: {
        type: "string",
        required: true,
    }
});

export const User = model<IUser>("User", userSchema)