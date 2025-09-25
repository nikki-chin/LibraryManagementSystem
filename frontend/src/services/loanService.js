import api from "../api.js";

export async function borrowBook(bookId) {
    try {
        const loan = await api.post(`/loan/borrow/${bookId}`);
        console.log("bookId: ", bookId, " is borrowed");

        return loan;
    } catch (error) {
         console.error("borrow book error (after interceptors):", error);

         throw error;
    }
}

export async function returnBook(bookId) {
    try {
        await api.put(`/loan/return/${bookId}`);
        console.log("BookId: ", bookId, "is returned");
    } catch (error) {
        console.log("return book error: ", error)
    }
}

export async function getAllLoans() {
    try {
        const response = await api.get("/loan");
        return response.data;
    } catch (error) {
        console.log("get all loan error", error);
    }

}

export async function getActiveLoans() {
    try {
        const response = await api.get("/loan/active");
        return response.data;
    } catch (error) {
        console.log("get active loan error", error);
    }
}

export async function getOverdueLoans() {
    try {
        const response = await api.get("/loan/overdue");
        return response.data;
    } catch (error) {
        console.log("get overdue loan error", error);
    }
}

export async function getMyLoans(userId) {
    try {
        const response = await api.get(`/loan/${userId}`);
        return response.data;
    } catch (error) {
        console.log("get loan history error", error);
    }
}
