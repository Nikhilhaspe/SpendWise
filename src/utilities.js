// DOCS: Utility functions

// get unique ID as a combination of date & time
function getUniqueId() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

// get today's date in yyyyMMdd format
function getTodaysDateFormatted() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());

  return `${year}${month}${day}`;
}

// check string blank or empty
function isBlankOrEmpty(str) {
  if (str.length === 0 || str.trim().length === 0) return true;

  return false;
}

export { getUniqueId, getTodaysDateFormatted, isBlankOrEmpty };
