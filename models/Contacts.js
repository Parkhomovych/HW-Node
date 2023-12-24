import { Schema, model } from "mongoose";
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
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handlerSaveError);
contactsSchema.pre("findOneAndUpdate", addUpdateSettings);
contactsSchema.post("findOneAndUpdate", handlerSaveError);

const Contacts = model("contact", contactsSchema);

export default Contacts;
