import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.resolve("models", "contacts", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const addContact = async (body) => {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContacts);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((elem) => elem.id === id);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return {"message": "contact deleted"};
};

export const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((elem) => elem.id === id);
  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...body };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
