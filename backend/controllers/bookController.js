import { Book } from "../models/bookModel.js";
import { Loan } from "../models/loanModel.js"

export const getAllBooks = async (request, response) => {
    try{
        const books = await Book.find();

        const bookWithStatus= await Promise.all(
            books.map(async(book) => {
                const activeLoan = await Loan.findOne({
                    bookId: book._id,
                    returnDate: null
                });
                return{
                    ...book._doc,
                    availability: activeLoan ? "Not Available" : "Available"
                };
            })
        );
        response.json(bookWithStatus);
    }
    catch(error){
        response.status(500).send({ message: error.message });
    }
};

export const getOneBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const activeLoan = await Loan.findOne({
            bookId: book._id,
            returnDate: null   
        });

        const bookWithStatus = {
            ...book._doc,
            availability: activeLoan ? "Not Available" : "Available",
            borrowedBy: activeLoan ? activeLoan.userId : null 
        };

        res.json(bookWithStatus); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

