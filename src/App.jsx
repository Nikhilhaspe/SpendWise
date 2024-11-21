// library imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout pages
import HomePage from "./components/pages/HomePage/HomePage";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
import UserProfile from "./components/pages/UserProfile/UserProfile";
import MyExpenses from "./components/pages/MyExpenses/MyExpenses";
import AddExpense from "./components/pages/AddExpense/AddExpense";

// app layout
import AppLayout from "./components/AppLayout/AppLayout.component";

// app css
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="login" element={<p>Login</p>} />
        <Route path="app" element={<AppLayout />}>
          <Route path="expenses" element={<MyExpenses />} />
          <Route path="addExpense" element={<AddExpense />} />
          <Route path="user" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
