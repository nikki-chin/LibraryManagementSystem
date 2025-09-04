import React, { useEffect, useState } from "react"
import { getOverdueLoans } from "../services/loanService";

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
    <div>
      <h2>Overdue Loans</h2>
      {loans.length === 0 ? (
        <p>No overdue loans </p>
      ) : (
        loans.map((loan) => (
          <div key={loan._id} style={{ border: "1px solid red", margin: "10px", padding: "10px" }}>
            <p><b>Book:</b> {loan.bookId.title}</p>
            <p><b>User:</b> {loan.userId.email}</p>
            <p><b>Borrow Date:</b> {new Date(loan.borrowDate).toLocaleDateString()}</p>
            <p><b>Due Date:</b> {new Date(loan.dueDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default OverdueLoans
