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

// READ (ALL)
async function getAllExpenses() {
  const db = await initDb();
  return await db.getAll("expenses");
}

// READ (SINGLE BY ID)
async function getExpense(id) {
  const db = await initDb();
  return db.get("expenses", id);
}

// CREATE
async function addExpense(newExpense) {
  const db = await initDb();
  const tx = db.transaction("expenses", "readwrite");
  const store = tx.objectStore("expenses");
  await store.add(newExpense);
  await tx.done;
}

// UPDATE (SINGLE)
async function updateExpense(expense) {
  const db = await initDb();
  const tx = db.transaction("expenses", "readwrite");
  const store = tx.objectStore("expenses");
  await store.put(expense);
  await tx.done;
}

// DELETE (SINGLE)
async function deleteExpense(expenseId) {
  const db = await initDb();
  const tx = db.transaction("expenses", "readwrite");
  const store = tx.objectStore("expenses");
  await store.delete(expenseId);
  await tx.done;
}

export { getAllExpenses, addExpense, deleteExpense, updateExpense, getExpense };
