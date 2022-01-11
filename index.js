const contactsOperation = require("./contacts");
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const contacts = await contactsOperation.listContacts();

          console.table(contacts);
      break;

    case 'get':
          const contact = await contactsOperation.getContactById(id);
        
          console.table(contact);
      break;

    case 'add':
          const add = await contactsOperation.addContact(name, email, phone);
          console.table(add);
      break;

    case 'remove':
        const remove = await contactsOperation.removeContact(id);
        
          console.table(remove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);