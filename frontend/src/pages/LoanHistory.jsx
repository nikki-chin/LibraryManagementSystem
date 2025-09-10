import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleLoanCard from "../components/SingleLoanCard";
import { getMyLoans } from "../services/loanService.js";
import BackButton from '../components/BackButton.jsx'

const LoanHistory = ({ user }) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getMyLoans(user.id);
        setLoans(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoans();
  }, [user]);
  return (
    <div>
      <BackButton />
      <h3>Loan History</h3>
      {loans && loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        loans.map((loan) => <SingleLoanCard key={loan._id} loan={loan} />)
      )}
    </div>
  );
}
export default LoanHistory