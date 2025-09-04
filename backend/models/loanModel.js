import mongoose from "mongoose";

const loanSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        borrowDate: { type: Date, default: Date.now },
        dueDate: Date,
        returnDate: Date,
        status: { type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed' },
        fine: { type: Number, default: 0 }
    }, {timestamps: true}
);

export const Loan = mongoose.model('Loan', loanSchema);
