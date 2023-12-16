import { Router } from "express";
import contactsController from "../../controllers/contacst/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactsAddSchema,
  contactsUpdadeSchema,
} from "../../schemas/contacts-schemas.js";

const contactsRouter = Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(contactsUpdadeSchema),
  contactsController.updateById
);

contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;
