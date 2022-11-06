const request = indexedDB.open('CRM', 1);

request.onerror = (event) => {
  console.error(`Database error: ${event.target.errorCode}`);
};

request.onsuccess = (event) => {
  db = request.result;
  
  insertContact(db, {
    email: 'john.doe@outlook.com',
    firstName: 'John',
    lastName: 'Doe'
  });

  insertContact(db, {
    email: 'jane.doe@gmail.com',
    firstName: 'Jane',
    lastName: 'Doe'
  });
};

request.onupgradeneeded = (event) => {  
  let db = event.target.result;

  // create the Contacts object store 
  // with auto-increment id
  let store = db.createObjectStore('Contacts', {
      autoIncrement: true
  });

  // create an index on the email property
  let index = store.createIndex('email', 'email', {
      unique: true
  });
};

function insertContact(db, contact) {
  // create a new transaction
  const txn = db.transaction('Contacts', 'readwrite');

  // get the Contacts object store
  const store = txn.objectStore('Contacts');
  //
  let query = store.put(contact);

  // handle success case
  query.onsuccess = function (event) {
      console.log(event);
  };

  // handle the error case
  query.onerror = function (event) {
      console.log(event.target.errorCode);
  }

  // close the database once the 
  // transaction completes
  txn.oncomplete = function () {
      db.close();
  };
}