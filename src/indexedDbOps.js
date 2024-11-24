// DOCS: using indexed db for the CRUD
import { openDB } from "idb";

// initialise database
async function initDb() {
  const db = await openDB("spendWiseDb", 1, {
    upgrade(db) {
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

// CREATE
async function addExpense(newExpense) {
  const db = await initDb();
  const tx = db.transaction("expenses", "readwrite");
  const store = tx.objectStore("expenses");
  await store.add(newExpense);
  await tx.done;
}

export { addExpense };
