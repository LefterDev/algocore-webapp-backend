import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        userid: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        personalDetails: {
            type: Object,
            required: true
        }
    }
)

export const User = model("Users", UserSchema, "Users");