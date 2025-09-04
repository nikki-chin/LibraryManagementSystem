import express from "express";
import { Book } from "../models/bookModel.js";
import { Loan } from "../models/loanModel.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();

    const activeLoans = await Loan.countDocuments({
      returnDate: null
    });

    const now = new Date();
    const overdueLoans = await Loan.countDocuments({
      returnDate: null,
      dueDate: { $lt: now }
    });

    res.json({
      totalBooks,
      activeLoans,
      overdueLoans
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
});

export default router;
