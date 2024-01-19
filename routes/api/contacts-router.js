import { Router } from "express";
import contactsController from "../../controllers/contacst/contacts-controller.js";
import {
  isEmptyBody,
  isEmptyBodyFavorite,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactsAddSchema,
  contactsUpdadeSchema,
  contactsUpdateFavoriteSchema,
} from "../../models/Contacts.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  isValidId,
  validateBody(contactsUpdadeSchema),
  contactsController.updateById
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBodyFavorite,
  validateBody(contactsUpdateFavoriteSchema),
  contactsController.updateById
);

export default contactsRouter;
