import React, { useState } from "react";
import { addBook } from "../services/bookService.js";
import axios from "axios";

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
            <h2>Add New Book</h2>
            <div>
                <label>ISBN: </label>
                <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />

                <button onClick={fetchBookDetails}>
                    Fetch book with Google API
                </button>

            </div>

            {bookData && (<form onSubmit={handleSubmit}>
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
            )}

            {message && <p>{message}</p>}

            {bookData.coverImage && (
                <div>
                    <img src={bookData.coverImage} alt="Book cover" style={{ width: "120px" }} />
                </div>
            )}
        </div>
    );

}
export default AddBookByIsbn