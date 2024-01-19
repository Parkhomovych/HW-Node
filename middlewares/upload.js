import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";
import { HttpError } from "../helpers/index.js";

const destination = path.resolve("temp");
const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const filename = `${nanoid()}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10, // 10 megabit
};

const fileFilter = (req, file, callback) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") return callback(HttpError(400, ".exe not valid extention"));
};

const upload = multer({
  storage,
  limits,
//   fileFilter, 
});

export default upload;
