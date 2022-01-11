const fs = require("fs/promises")
const path = require("path");
const {v4} = require("uuid");
const contactsPath = path.join(__dirname, "db/contacts.json");


// TODO: задокументировать каждую функцию
async function listContacts() {
    return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(item => item.id === contactId);
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    const remove = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return remove;
}

async function addContact(name, email, phone) {
    const newContact = { id: v4(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}