import React, { useState, useEffect } from "react";
import { getAllLoans } from "../services/loanService.js";
import BackButton from "../components/BackButton.jsx";
import styles from "./ViewAllLoans.module.css";

const ViewAllLoans = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const data = await getAllLoans();
                setLoans(data || []);
            } catch (error) {
                console.error("Failed to fetch all loans", error);
            }
        };
        fetchLoans();
    }, []);

    return (
        <div className={styles.container}>
            <BackButton />
            <h2 className={styles.title}>All Loans</h2>

            {loans?.length === 0 ? (
                <p className={styles.empty}>No loans</p>
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
                            {loan.returnDate && (
                                <p>
                                    <strong>Returned On:</strong>{" "}
                                    {new Date(loan.returnDate).toLocaleDateString()}
                                </p>
                            )}
                            <p>
                                <strong>Status:</strong> {loan.status}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAllLoans;
