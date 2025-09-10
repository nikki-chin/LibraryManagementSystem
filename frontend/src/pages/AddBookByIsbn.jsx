import React, { useState } from "react";
import { addBook } from "../services/bookService.js";
import axios from "axios";
import styles from './AddBookByIsbn.module.css';
import BackButton from "../components/BackButton.jsx";

const AddBookByIsbn = () => {

    const [bookData, setbookData] = useState({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        description: "",
        coverImage: "",
    });

    const [message, setMessage] = useState("");
    const [isbn, setIsbn] = useState("");

    const fetchBookDetails = async () => {
        try {
            const res = await axios.get
                (
                    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
                );
            if (res.data.totalItems > 0) {
                const info = res.data.items[0].volumeInfo;
                setbookData({
                    title: info.title,
                    author: info.authors ? info.authors.join(", ") : "Unknown Author",
                    isbn: isbn,
                    genre: info.categories ? info.categories.join(", ") : "Uncategorized",
                    description: info.description || "No Description",
                    coverImage: info.imageLinks ? info.imageLinks.thumbnail : ""
                });
                console.log("bookData", bookData);
            } else {
                alert("No book found with this isbn");
            }

        } catch (error) {
            console.log("Error fetching book details", error);
        }

    };

    const handleChange = (e) => {
        setbookData({
            ...bookData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addBook(bookData);
            setMessage(`Book "${response.title}" added successfully!`);
            setbookData(
                {
                    title: "",
                    author: "",
                    isbn: "",
                    genre: "",
                    description: "",
                    coverImage: ""
                });
        } catch (error) {
            console.error("Error adding book", error);
            setMessage("Failed to add book");
        }
    };

    return (
        <div>
            <BackButton />
            <div className={styles.container}>
                <h2 className={styles.title}>Add New Book</h2>

                <div className={styles.fetchSection}>
                    <label>ISBN: </label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder="Enter ISBN"
                    />
                    <button onClick={fetchBookDetails} className={styles.fetchButton}>
                        Fetch from Google API
                    </button>
                </div>

                {bookData && (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={bookData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                value={bookData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                value={bookData.isbn}
                                disabled
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Genre</label>
                            <input
                                type="text"
                                name="genre"
                                value={bookData.genre}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={bookData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Cover Image URL</label>
                            <input
                                type="text"
                                name="coverImage"
                                value={bookData.coverImage}
                                onChange={handleChange}
                            />
                        </div>

                        {bookData.coverImage && (
                            <div className={styles.coverPreview}>
                                <img src={bookData.coverImage} alt="Book cover" />
                            </div>
                        )}

                        <button type="submit" className={styles.submitButton}>Add Book</button>
                    </form>
                )}

                {message && <p className={styles.success}>{message}</p>}
            </div>
        </div>
    );

}
export default AddBookByIsbn