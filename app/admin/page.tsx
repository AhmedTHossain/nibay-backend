import { useState } from "react";
import JobManagement from "./components/JobManagement";
import UserManagement from "./components/UserManagement";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <button onClick={() => setActiveTab("jobs")}>Job Management</button>
        <button onClick={() => setActiveTab("users")}>User Management</button>
      </nav>
      {activeTab === "jobs" ? <JobManagement /> : <UserManagement />}
    </div>
  );
}
