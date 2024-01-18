import { Router } from "express";
import usersController from "../../controllers/users/users-controller.js";
import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

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
usersRouter.post("/logout", authenticate, usersController.logout);

usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  usersController.updateAvatar
);

export default usersRouter;
