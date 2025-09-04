import React from "react";
import styles from './SingleBookCard.module.css'
import { Link } from "react-router-dom";

const SingleBookCard = ({book}) => {

    return(
        <div key={book._id} className={styles.bookContainer} >
            <h4 className={`${styles.bookAvailability} ${book.availability === "Available"?styles.available:styles.unavailable}`}>
                {book.availability}
                </h4>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <img src={book.coverImage}
            alt="book cover"
            className={styles.bookImage} />
            <span className={styles.bookAuthor}>By {book.author}</span>
            <Link to={`/books/details/${book._id}`}>
            <button className={styles.bookButton}>Book Detail</button>
            </Link>
            
        </div>
    )
}
export default SingleBookCard