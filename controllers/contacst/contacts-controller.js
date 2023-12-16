import * as contactsService from "../../models/contacts/contacts.js";
import { HttpError } from "../../helpers/index.js";
import {
  contactsAddSchema,
  contactsUpdadeSchema,
} from "../../schemas/contacts-schemas.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const result = await contactsService.getContactById(req.params.id);
  if (!result) throw HttpError(404, `Not found`);

  res.json(result);
};
const add = async (req, res, next) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);

  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const result = await contactsService.removeContact(req.params.id);
  if (!result) throw HttpError(404, `Not found`);

  res.json(result);
};

const updateById = async (req, res, next) => {
  const result = await contactsService.updateContact(req.params.id, req.body);
  if (!result) throw HttpError(404, `Not found`);

  const { error } = contactsUpdadeSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
