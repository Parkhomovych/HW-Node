import { Router } from "express";
import usersController from "../../controllers/users/users-controller.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import { userSingupSchema } from "../../models/Users.js";
const usersRouter = Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSingupSchema),
  usersController.register
);
usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSingupSchema),
  usersController.login
);
usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.post("/logout", authenticate, usersController.logout);

export default usersRouter;
