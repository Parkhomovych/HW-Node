import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization)  next(HttpError(401, "Not authorized"));

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(HttpError(401, "Not authorized"));

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await Users.findById(id);
    if (!user || !user.token || token !== user.token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};
export default authenticate;
