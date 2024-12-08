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

// READ (GET LAST 10 EXPENSES)
async function getRecentExpenses() {
  const db = await initDb();
  const tx = db.transaction("expenses", "readonly");
  const store = tx.objectStore("expenses");

  // Open a cursor to iterate through the store in descending order by "id"
  let records = [];
  let cursor = await store.openCursor(null, "prev");

  while (cursor && records.length < 10) {
    records.push(cursor.value);
    cursor = await cursor.continue();
  }

  return records;
}

// READ (SINGLE BY ID)
async function getExpense(id) {
  const db = await initDb();
  return db.get("expenses", id);
}

// READ FILTERED DATA
async function getFilteredData(filterType, fromDate = "", toDate = "") {
  switch (filterType) {
    case "clear":
      return await getRecentExpenses();
    case "thismonth":
      return await getCurrentMonthData();
    case "lastmonth":
      return await getLastMonthData();
    case "datewise":
      return getDatePeriodData(fromDate, toDate);
  }
}

// HELPER 1 : CURRENT MONTH DATA
async function getCurrentMonthData() {
  const now = new Date();
  let currentMonth = String(now.getMonth() + 1).padStart(2, "0");

  return (await getAllExpenses()).filter((expense) => {
    let month = expense.date.split("-")[1];

    return currentMonth === month;
  });
}

// HELPER 2 : LAST MONTH DATA
async function getLastMonthData() {
  const now = new Date();
  let lastMonth = Number(String(now.getMonth() + 1).padStart(2, "0")) - 1;

  return (await getAllExpenses()).filter((expense) => {
    let month = Number(expense.date.split("-")[1]);

    return lastMonth === month;
  });
}

// HELPER 3 : CHOOSE DATE DATA
async function getDatePeriodData(fromDate, toDate) {
  const fromDt = new Date(fromDate);
  const toDt = new Date(toDate);

  return (await getAllExpenses()).filter((expense) => {
    let expenseDt = new Date(expense.date);

    return expenseDt >= fromDt && expenseDt <= toDt;
  });
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

export {
  getRecentExpenses,
  getAllExpenses,
  getFilteredData,
  addExpense,
  deleteExpense,
  updateExpense,
  getExpense,
};
