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
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", handlerSaveError);
usersSchema.pre("findOneAndUpdate", addUpdateSettings);
usersSchema.post("findOneAndUpdate", handlerSaveError);

export const userSingupSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const Users = model("user", usersSchema);
export default Users;
