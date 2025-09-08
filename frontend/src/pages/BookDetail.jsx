import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './BookDetail.module.css';
import { getOneBookWithStatus, deleteBook } from "../services/bookService.js";
import { borrowBook, returnBook } from "../services/loanService.js";
import BackButton from "../components/BackButton.jsx";

const BookDetail = ({ user }) => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookById = async () => {
            try {
                const bookWithStatus = await getOneBookWithStatus(id);
                setBook(bookWithStatus);
            } catch (error) {
                console.log(error);
            }

        }
        fetchBookById();
    }, [id]);

    const handleBorrow = async () => {
        if (!user) return;

        const borrowedBook = await borrowBook(id);
        if(borrowedBook)
            alert(`You borrowed ${book.title}`);
    };

    const handleReturn = async () => {
        await returnBook(id);
        alert(`You returned ${book.title}`);

    }

    const handleEdit = function () {
        navigate(`/books/edit/${id}`);
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${book.title}"`
        );
        if (!confirmDelete) return;

        try {
            await deleteBook(id);
            alert(`You deleted ${book.title}`);
            navigate("/")
        } catch (error) {
            console.log(error);
        }

    }

    if (!book) {
        return <p>book not found</p>
    }

    return (
        <div className={styles.bookDetailContainer}>
            <BackButton />
            <div className={styles.leftColumn}>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Genre: {book.genre}</p>
                <p>Status: {book.availability}</p>
                <p>{book.description}</p>
                <p>{book.borrowedBy}</p>


                {user?.role === "admin" && (
                    <div className={styles.adminButtons}>
                        <button onClick={handleEdit}>Edit Book</button>
                        <button onClick={handleDelete}>Delete Book</button>
                    </div>
                )}
            </div>

            <div className={styles.rightColumn}>
                <img src={book.coverImage} alt="book cover" className={styles.coverImage} />

                {(!user || user?.role === "user") && (
                    <div className={styles.borrowSection}>
                        <button
                            disabled={!user || book.availability === "Not Available"}
                            onClick={handleBorrow}
                        >
                            Borrow Book
                        </button>

                        {!user && <p>Please login first to borrow this book.</p>}
                    </div>
                )}
                {(book.availability === "Not Available" && user?.id === book.borrowedBy) && (
                    <div className={styles.borrowSection}>
                        <button
                            onClick={handleReturn}
                        >
                            Return Book
                        </button>
                    </div>
                )}
            </div>
        </div>


    );

}
export default BookDetail