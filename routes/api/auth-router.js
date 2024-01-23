import { Router } from "express";
import usersController from "../../controllers/users/users-controller.js";
import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import { userSchema, userEmailSchema } from "../../models/Users.js";
const usersRouter = Router();

usersRouter.post(
  "/register",
  validateBody(userSchema),
  isEmptyBody,
  usersController.register
);

usersRouter.get("/verify/:verificationToken", usersController.verify);

usersRouter.post(
  "/veryfi",
  validateBody(userEmailSchema),
  isEmptyBody,
  usersController.resendVerifyEmail
);

usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSchema),
  usersController.login
);
usersRouter.post("/logout", authenticate, usersController.logout);

usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  usersController.updateAvatar
);

export default usersRouter;
