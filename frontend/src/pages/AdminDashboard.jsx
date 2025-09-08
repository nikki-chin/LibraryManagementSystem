import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css"
import { getDashboardStats } from "../services/adminStats.js";

const AdminDashboard = (user) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;
  return (
    
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h3>Total Books: {stats.totalBooks}</h3>
        <button onClick={() => navigate("/")}>View</button>
      </div>

      <div>
        <h3>Total Active Loans: {stats.activeLoans}</h3>
        <button onClick={() => navigate("/admin/loans/active")}>View</button>
      </div>

      <div>
        <h3>Total Overdue Books: {stats.overdueLoans}</h3>
        <button onClick={() => navigate("/admin/loans/overdue")}>View</button>
      </div>

      <div>
        <h3>View All Loans</h3>
        <button onClick={() => navigate("/admin/loans")}>View</button>
      </div>

      <div>
        <h3>Add New Book</h3>
        <button onClick={() => navigate("/admin/books/add")}>Add</button>
      </div>

      <div>
        <h3>Add Book with Google API</h3>
        <button onClick={() => navigate("/admin/books/addbookbyisbn")}>Add by isbn</button>
      </div>
    </div>
    
  );
};

export default AdminDashboard;