import { Schema, model } from "mongoose";
import Joi from "joi";
import { addUpdateSettings, handlerSaveError } from "./hooks.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handlerSaveError);
contactsSchema.pre("findOneAndUpdate", addUpdateSettings);
contactsSchema.post("findOneAndUpdate", handlerSaveError);

export const contactsAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean().default(false),
});

export const contactsUpdadeSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

export const contactsUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contacts = model("contact", contactsSchema);
export default Contacts;
