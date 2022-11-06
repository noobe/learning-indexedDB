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

  getContactById(db, 1);
  deleteContact(db, 1);
  getContactById(db, 1);
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

function getContactById(db, id) {
  const txn = db.transaction('Contacts', 'readonly');
  const store = txn.objectStore('Contacts');

  let query = store.get(id);

  query.onsuccess = (event) => {
    if (!event.target.result) {
        console.log(`The contact with ${id} not found`);
    } else {
        console.table(event.target.result);
    }
  };

  query.onerror = (event) => {
    console.log(event.target.errorCode);
  }

  txn.oncomplete = function () {
    db.close();
  };
};

function deleteContact(db, id) {
  // create a new transaction
  const txn = db.transaction('Contacts', 'readwrite');

  // get the Contacts object store
  const store = txn.objectStore('Contacts');
  //
  let query = store.delete(id);

  // handle the success case
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