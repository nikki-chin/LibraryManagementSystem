import React, { useEffect, useState } from "react";
import axios from 'axios';
import SingleBook from "../components/BookList/SingleBookCard";
import BookList from "../components/BookList/BookList";
import Header from "../components/Header/Header";
import { getBooksWithStatus } from "../services/bookService.js"
import { logout } from "../services/authService.js";

const Home = ({ user, onLogout }) => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const bookWithStatus = await getBooksWithStatus();
                setBooks(bookWithStatus);
                setFilteredBooks(bookWithStatus);
            } catch (error) {
                console.log(error);
            };
        }
        fetchBooks();
    }, []);

    const handleSearch = ({ searchTerm, filter }) => {
        const term = searchTerm.toLowerCase();

        const filtered = books.filter((book) => {
            const matchesSearch = "" ||
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.genre.toLowerCase().includes(term);

            const matchesFilter =
                filter === "all" ||
                (filter === "available" && book.availability === "Available") ||
                (filter === "borrowed" && book.availability === "Not Available");

            return matchesSearch && matchesFilter;
        });

        setFilteredBooks(filtered);

    };

    return (
        <>
            <Header onSearch={handleSearch} onLogout={onLogout} user={user}/>
            {!user && <p>Please login first.</p>}
            <BookList books={filteredBooks} />
        </>

    )
}
export default Home