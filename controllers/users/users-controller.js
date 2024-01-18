import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import Users from "../../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import jimp from "jimp";

const avatarPath = path.join("public", "avatars");

const register = async (req, res) => {
  const { password, email } = req.body;

  const avatarURL = gravatar.url(email).slice(2);
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await Users.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const { JWT_SECRET } = process.env;
  const { _id: id, subscription } = user;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1m" });
  await Users.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};
const logout = async (req, res) => {
  const { _id } = req.user;
  await Users.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  const image = await jimp.read(newPath); // Read the image.
  await image.resize(250, 250); // Resize the image to width 250 and  height 250.
  await image.writeAsync(newPath); // Save and overwrite the image

  const avatarURL = path.join("avatrs", filename);
  await Users.findByIdAndUpdate(req.user._id, { avatarURL });

  res.json({ avatarURL });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
