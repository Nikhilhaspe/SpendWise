/* eslint-disable no-unused-vars */
// library imports
import Papa from "papaparse";
import { useRef, useState } from "react";
import { MoonLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css module
import styles from "./UserProfile.module.css";

// context api
import { useAuth } from "../../../contexts/AuthContext";

// expenses indexed dp ops
import { getAllExpenses, importToIndexedDB } from "../../../ExpenseDbOps";

// constants
const TODAY_DATE = new Date().toISOString().split("T")[0];

function UserProfile() {
  // state
  const [isLoading, setIsLoading] = useState(false);

  // ref
  const fileInputRef = useRef(null);

  // context api
  const { username } = useAuth();

  // event handlers
  async function exportToCsv() {
    try {
      setIsLoading(true);

      const filename = username + "_spendWiseDataExport_" + TODAY_DATE;

      const allExpenses = await getAllExpenses(username);

      // Flatten data to make it suitable for CSV
      const flattenedData = allExpenses.map((item) => ({
        ...item,
        tags: item.tags.join(", "), // Convert tags array to comma-separated string
      }));

      // Convert JSON to CSV
      const csv = Papa.unparse(flattenedData);

      // Create a blob from the CSV
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong while exporting, please try again"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target.result;
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      });

      await importToIndexedDB(parsedData.data, username);
      toast.success("Data imported successfully!");
    };
    reader.readAsText(file);
  }

  async function importFromCsv() {
    try {
      setIsLoading(true);
      fileInputRef.current.click();
    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong while importing, please try again"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" theme="dark" />

      <div className={styles.viewWrapper}>
        <div className={styles.row}>Username : {username} </div>
        <div className={styles.row}>
          <button
            disabled={isLoading}
            onClick={exportToCsv}
            className={styles.expBtn}
          >
            {isLoading ? (
              <MoonLoader size={30} color="#f7f9ff" />
            ) : (
              "Export Data"
            )}
          </button>
        </div>
        <div className={styles.row}>
          <button
            disabled={isLoading}
            onClick={importFromCsv}
            className={styles.expBtn}
          >
            {isLoading ? (
              <MoonLoader size={30} color="#f7f9ff" />
            ) : (
              "Import Data"
            )}
          </button>
        </div>
        <div className={styles.row}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
