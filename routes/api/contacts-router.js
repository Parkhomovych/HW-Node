import { Router } from "express";
import contactsController from "../../controllers/contacst/contacts-controller.js";
import {
  isEmptyBodyUpdate,
  isEmptyBodyFavorite,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactsAddSchema,
  contactsUpdadeSchema,
  contactsUpdateFavoriteSchema,
} from "../../schemas/contacts-schemas.js";

const contactsRouter = Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBodyUpdate,
  validateBody(contactsAddSchema),
  contactsController.add
);

contactsRouter.put(
  "/:id",
  isEmptyBodyUpdate,
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
