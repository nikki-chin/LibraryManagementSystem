import React, { useState, useEffect } from "react";
import { getActiveLoans } from "../services/loanService.js";
import BackButton from "../components/BackButton.jsx";
import styles from "./ActiveLoans.module.css";

const ActiveLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getActiveLoans();
        setLoans(data || []);
      } catch (error) {
        console.error("Failed to fetch active loans", error);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className={styles.container}>
      <BackButton />
      <h2 className={styles.title}>Active Loans</h2>

      {loans?.length === 0 ? (
        <p className={styles.empty}>No active loans</p>
      ) : (
        <div className={styles.loanList}>
          {loans.map((loan) => (
            <div key={loan._id} className={styles.loanCard}>
              <p>
                <strong>Book:</strong> {loan.bookId?.title || "Unknown Book"}
              </p>
              <p>
                <strong>User:</strong> {loan.userId?.email || "Unknown User"}
              </p>
              <p>
                <strong>Borrow Date:</strong>{" "}
                {new Date(loan.borrowDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveLoans;
