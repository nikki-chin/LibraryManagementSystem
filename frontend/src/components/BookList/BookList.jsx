import React from "react";
import SingleBookCard from "./SingleBookCard";
import styles from './BookList.module.css';

const BookList = ({ books }) => {
    if (!books || books.length === 0) {
        return <p>No books found.</p>;
    }
    return (
        <div className={styles.bookList}>
            {books.map((book) =>
                <SingleBookCard key={book._id} book={book} />
            )}

        </div>
    )
}
export default BookList