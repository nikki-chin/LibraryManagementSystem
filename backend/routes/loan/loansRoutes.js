import express from 'express'
import { Loan } from '../../models/loanModel.js'
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { Book } from '../../models/bookModel.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/borrow/:id', authMiddleware, async (request, response) => {
    try {
        const userId = request.user.id;
        const bookId = request.params.id;

        const book = await Book.findById(bookId);
        if (!book) {
            return response.status(404).send({ message: "book not found" });
        }

        const activeLoan = await Loan.findOne({ bookId, status: "borrowed" });
        if (activeLoan) return response.status(400).json({ msg: "Book already borrowed" });

        const newLoan = {
            userId: userId,
            bookId: bookId,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            returnDate: null,
            status: 'borrowed'
        };

        const loan = await Loan.create(newLoan);

        return response.status(201).send(loan);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/return/:id', authMiddleware, async (request, response) => {
    try {
        const loan = await Loan.findOne({
            userId: request.user.id,
            bookId: request.params.id,
            status: 'borrowed'
        });


        if (!loan) {
            return response.status(404).send({ message: "no active loan for this book" });
        }


        const now = new Date();

        const fine = calculateFine(loan.dueDate, now, 1);

        loan.returnDate = now;
        loan.fine = fine;
        loan.status = 'returned';
        await loan.save();

        return response.status(200).json({
            message: "Book returned successfully",
            loan
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', authMiddleware, async (request, response) => {
    if (request.user.role !== 'admin') {
        return response.status(403).json({ message: 'Access denied' });
    }
    try {
        const loans = await Loan.find({})
        .populate("bookId")
        .populate("userId");
        response.json(loans);
    } catch (error) {
        response.status(500).send({ message: "Error fetching all loans: ", error });
    }

});

router.get("/active", authMiddleware, async (request, response) => {
  try {
    const loans = await Loan.find({ returnDate: null })
      .populate("bookId")
      .populate("userId");
    response.json(loans);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.get("/overdue", authMiddleware, async (req, res) => {
  try {
    const now = new Date();
    const loans = await Loan.find({
      returnDate: null,
      dueDate: { $lt: now },
    })
      .populate("bookId")
      .populate("userId");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:userId', authMiddleware, async (request, response) => {
    try {
        const userId = request.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId))
            return response.status(400).send({ error: "Invalid userId" });

        console.log("fetching loans for user: ", request.params.userId);
        const loans = await Loan.find({ userId: userId }).populate("bookId");
        response.json(loans);
    } catch (error) {
        response.status(500).send({ message: "Error fetching loans" });
    }
});

function calculateFine(dueDate, returnDate, finePerDay) {
    const due = new Date(dueDate);
    const ret = new Date(returnDate);

    if (ret <= due) {
        return 0;
    }

    const timeDifference = ret - due;
    const dateDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return dateDifference * finePerDay;
}

export default router