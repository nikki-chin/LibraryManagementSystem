import React, { useEffect, useState } from "react"
import { getOverdueLoans } from "../services/loanService";
import BackButton from "../components/BackButton";
import styles from './OverdueLoans.module.css';

const OverdueLoans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getOverdueLoans();
        setLoans(data || []);
      } catch (error) {
        console.error("Failed to fetch overdue loans", error);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className={styles.container}>
      <BackButton />
      <h2 className={styles.title}>Overdue Loans</h2>

      {loans?.length === 0 ? (
        <p className={styles.empty}>No overdue loans</p>
      ) : (
        <div className={styles.loanList}>
          {loans?.map((loan) => (
            <div key={loan._id} className={styles.loanCard}>
              <p><strong>Book:</strong> {loan.bookId?.title || "Unkown Book"}</p>
              <p><strong>User:</strong> {loan.userId?.email || "Unkown User"}</p>
              <p><strong>Borrow Date:</strong> {new Date(loan.borrowDate).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OverdueLoans
