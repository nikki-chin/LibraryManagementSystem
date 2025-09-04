import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../services/authService.js";

const Header = ({ onSearch, onLogout, user }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch?.({ searchTerm: value, filter });
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        onSearch?.({ searchTerm, filter: value });
    };

    return (
        <header className={styles.header}>

            <div className={styles.topRow}>
                <div className={styles.logo}>Library</div>
                {user && <p>welcome, {user.name}</p>}
                {
                    user?.role === "user" &&
                    <Link to={`/loan/${user.id}`}>
                        <button className={styles.loginBtn}>
                            Loan History
                        </button>
                    </Link>
                }
                {!user &&
                    <Link to='/login'>
                        <button className={styles.loginBtn}>
                            Login
                        </button>
                    </Link>
                }
                {user &&
                    <button onClick={onLogout}
                        className={styles.loginBtn}>
                        Logout
                    </button>

                }
            </div>


            <div className={styles.bottomRow}>
                <input
                    type="text"
                    placeholder="Search by title, author, or genre..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.search}
                />

                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className={styles.filter}
                >
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
