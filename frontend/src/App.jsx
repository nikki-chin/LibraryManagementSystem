import { useState, useEffect } from 'react';
import { Routes, Route, Router, Link } from "react-router-dom";
import Home from "./pages/Home";
import BookDetail from './pages/BookDetail';
import LoginPage from './pages/LoginPage';
import './App.css';
import { logout } from './services/authService';
import EditBook from './pages/EditBook';
import LoanHistory from './pages/LoanHistory';
import AdminDashboard from './pages/AdminDashboard';
import AddBook from './pages/AddBook';
import ActiveLoans from './pages/ActiveLoans';
import OverdueLoans from './pages/OverdueLoans';
import ViewAllLoans from './pages/ViewAllLoans';
import AdminRoute from '../AdminRoute'
import AddBookByIsbn from './pages/AddBookByIsbn';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");

    if (token && email) {
      setUser({ id, email, role, name });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Home user={user} onLogout={handleLogout} />} />
        <Route path='/books/details/:id' element={<BookDetail user={user} />} />
        <Route path='/login' element={<LoginPage setUser={setUser} />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/loan/:id' element={<LoanHistory user={user} />} />

        <Route path="/admin" element={
          <AdminRoute user={user}>
            <AdminDashboard />
          </AdminRoute>
        } />

        <Route path="/admin/loans" element={
          <AdminRoute user={user}>
            <ViewAllLoans />
          </AdminRoute>
        } />

        <Route path="/admin/loans/active" element={
          <AdminRoute user={user}>
            <ActiveLoans />
          </AdminRoute>
        } />

        <Route path="/admin/loans/overdue" element={
          <AdminRoute user={user}>
            <OverdueLoans />
          </AdminRoute>
        } />

        <Route path="/admin/books/add" element={
          <AdminRoute user={user}>
            <AddBook />
          </AdminRoute>
        } />

        <Route path='/admin/books/addbookbyisbn' element={
          <AdminRoute user={user}>
            <AddBookByIsbn />
          </AdminRoute>
        } />

      </Routes>
    </>
  )
}

export default App
