import React from "react";

const SingleLoanCard = ({ loan }) => {
  const status = loan.returnDate ? "Returned" : "Active";

  return (
    <div>
      <h2>{loan.bookId.title}</h2>
      <p><strong>Book ID:</strong> {loan.bookId._id}</p>
      <p><strong>Borrowed On:</strong> {new Date(loan.borrowDate).toLocaleDateString()}</p>
      <p><strong>Return Date:</strong> {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : "Not Returned"}</p>
      <p>Status: {loan.status}</p>
      <p><strong>Fine:</strong> ${loan.fine || 0}</p>
    </div>
  );
};

export default SingleLoanCard;
