import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import Contacts from "../../models/Contacts.js";

const getAll = async (req, res) => {
  const result = await Contacts.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const result = await Contacts.findById(req.params.id);
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contacts.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const result = await Contacts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};
const deleteById = async (req, res, next) => {
  const result = await Contacts.findByIdAndDelete(req.params.id);
  if (!result) throw HttpError(404, `Not found`);

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
