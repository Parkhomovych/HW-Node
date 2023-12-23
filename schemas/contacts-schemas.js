import Joi from "joi";
const foo = (text) => {
  return { "any.required": `"${text}" must be exist` };
};

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
