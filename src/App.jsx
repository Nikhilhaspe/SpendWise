// library imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// layout pages
import HomePage from "./components/pages/HomePage/HomePage";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
import UserProfile from "./components/pages/UserProfile/UserProfile";
import MyExpenses from "./components/pages/MyExpenses/MyExpenses";
import AnalyzeExpense from "./components/pages/AnalyzeExpense/AnalyzeExpense";
import AddEditCommonForm from "./components/AddEditCommonForm/AddEditCommonForm.component";
import LogIn from "./components/pages/LogIn/LogIn";
import SignUp from "./components/pages/SignUp/SignUp";

// app layout
import AppLayout from "./components/AppLayout/AppLayout.component";

// app css
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to="expenses" />} />
          <Route path="expenses" element={<MyExpenses />} />
          <Route path="addExpense" element={<AddEditCommonForm />} />
          <Route
            path="editExpense/:expenseId"
            element={<AddEditCommonForm />}
          />
          <Route path="analyzeExpense" element={<AnalyzeExpense />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
