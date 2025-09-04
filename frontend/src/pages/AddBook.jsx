import React, { useState } from "react"
import { addBook } from "../services/bookService.js";

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
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <input
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Author: </label>
                    <input
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>ISBN: </label>
                    <input
                        type="text"
                        name="isbn"
                        value={bookData.isbn}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Genre: </label>
                    <input
                        type="text"
                        name="genre"
                        value={bookData.genre}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Description: </label>
                    <textarea
                        type="text"
                        name="description"
                        value={bookData.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>CoverImage Url: </label>
                    <input
                        type="text"
                        name="coverImage"
                        value={bookData.coverImage}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Book</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};
export default AddBook
