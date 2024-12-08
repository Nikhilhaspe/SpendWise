// Authentication & user db setup
import { openDB } from "idb";

// initialise database
async function initDb(username) {
  const db = await openDB(`${username}-spendWiseDb`, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("user")) {
        db.createObjectStore("user", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("expenses")) {
        db.createObjectStore("expenses", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });

  return db;
}

// check if the user already exists
async function doesUserExist(username) {
  const databases = await indexedDB.databases();

  return databases.some((db) => db.name === `${username}-spendWiseDb`);
}

// store user & create db
async function initUserDb(username, password) {
  const db = await initDb(username);

  const user = {
    username,
    password,
  };

  const tx = db.transaction("user", "readwrite");
  const store = tx.objectStore("user");
  await store.add(user);
  await tx.done;
}

// login user
async function login(username, password) {
  const db = await initDb(username);
  const users = await db.getAll("user");
  const user = users[0];

  if (user.username === username && user.password === password) {
    return true;
  } else {
    false;
  }
}

export { doesUserExist, initUserDb, login };
