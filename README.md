# learning-indexedDB
A project to familiarize with indexedDB
Creating a DB object in the browser.
Creating Object store.
CRUD operations
Unique keys

## Concepts:
IndexedDB databases store key-value pairs: Unlike localStorage and sessionStorage, the values stored in the IndexedDB can be complex structures like objects and blob. keys can be the properties of these objects or can be binary objects. For quick searching and sorting, you can create indexes that use any property of the objects.

IndexedDB is transactional: Every read from and write to the IndexedDB databases always happens in a transaction. The transactional model ensures the data integrity in case users open the web application in two tabs/windows at the same time and perform the read from and write to the same database.

IndexedDB API is mostly asynchronous: IndexedDB operations are asynchronous. It uses DOM events to notify you when an operation completes and the result is available.

IndexedDB is a NoSQL system: The IndexedDB is a NoSQL system. In other words, it doesn’t use SQL to query data. Instead, it uses the query that returns a cursor. Then, you can use the cursor to iterate the result set.

IndexedDB follows the same-origin policy