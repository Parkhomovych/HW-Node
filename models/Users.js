import { Schema, model } from "mongoose";
import Joi from "joi";
import { addUpdateSettings, handlerSaveError } from "./hooks.js";

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      //   match: регулярний вираз
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      //   minlength: мінімальна кількіть символів,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", handlerSaveError);
usersSchema.pre("findByIdAndUpdate", addUpdateSettings); //findByIdAndUpdate
usersSchema.post("findByIdAndUpdate", handlerSaveError);

export const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required field email" }),
});
const Users = model("user", usersSchema);
export default Users;
