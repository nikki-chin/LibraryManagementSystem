import React, {useState, useEffect} from "react";
import { getActiveLoans } from "../services/loanService.js";

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
    <div>
      <h2>Active Loans</h2>
      {loans?.length === 0 ? (
        <p>No active loans</p>
      ) : (
        loans.map((loan) => (
          <div key={loan._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p><b>Book:</b> {loan.bookId?.title || "Unkown Book"}</p>
            <p><b>User:</b> {loan.userId?.email || "Unkown User"}</p>
            <p><b>Borrow Date:</b> {new Date(loan.borrowDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default ActiveLoans
