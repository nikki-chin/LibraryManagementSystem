import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../services/authService.js";
import styles from './LoginPage.module.css';
import BackButton from "../components/BackButton.jsx";


const LoginPage = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const user = await login(email, password);
            console.log("logged in user: ", user);

            setUser(user);

            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (error) {
            setError(error.response?.data?.message || "Login failed")
            console.log(error);
            alert("Invalid email or password");
        }
    };

    return (
        <div>
            <BackButton />
            <div className={styles.loginContainer}>
                
                <h2 className={styles.loginTitle}>Login</h2>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Login
                    </button>
                </form>

                {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
        </div>
    );

}
export default LoginPage