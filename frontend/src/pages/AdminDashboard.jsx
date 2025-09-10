import React, { useEffect, useState } from "react";
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
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>

      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardCard}>
          <h3>Total Books</h3>
          <p>{stats.totalBooks}</p>
          <button onClick={() => navigate("/")}>View</button>
        </div>

        <div className={styles.dashboardCard}>
          <h3>Total Active Loans</h3>
          <p>{stats.activeLoans}</p>
          <button onClick={() => navigate("/admin/loans/active")}>View</button>
        </div>

        <div className={styles.dashboardCard}>
          <h3>Total Overdue Books</h3>
          <p>{stats.overdueLoans}</p>
          <button onClick={() => navigate("/admin/loans/overdue")}>View</button>
        </div>

        <div className={styles.dashboardCard}>
          <h3>View All Loans</h3>
          <button onClick={() => navigate("/admin/loans")}>View</button>
        </div>

        <div className={styles.dashboardCard}>
          <h3>Add New Book</h3>
          <button onClick={() => navigate("/admin/books/add")}>Add</button>
        </div>

        <div className={styles.dashboardCard}>
          <h3>Add Book with Google API</h3>
          <button onClick={() => navigate("/admin/books/addbookbyisbn")}>Add by ISBN</button>
        </div>
      </div>
    </div>
  );

};

export default AdminDashboard;