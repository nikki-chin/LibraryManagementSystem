import React, { useState } from "react"
import { addBook } from "../services/bookService.js";
import styles from './AddBook.module.css'
import BackButton from "../components/BackButton.jsx";

const AddBook = () => {
    const [bookData, setbookData] = useState({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        description: "",
        coverImage: "",
    });

    const [message, setMessage] = useState("");

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
            <div className={styles.addBookContainer}>
                <h2 className={styles.title}>Add New Book</h2>
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
                            onChange={handleChange}
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

                    <button type="submit" className={styles.submitButton}>Add Book</button>
                </form>

                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );

};
export default AddBook
