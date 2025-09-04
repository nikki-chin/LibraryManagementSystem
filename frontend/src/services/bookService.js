import api from "../api.js";

export async function addBook(bookData) {
    const response = await api.post("/books", bookData);
    return response.data;
}

export async function getBooksWithStatus() {
    const response = await api.get("/books/bookWithStatus");
    return response.data;
}
export async function getBookById(id) {
    const response = await api.get(`/books/${id}`);
    return response.data;
}
export async function getOneBookWithStatus(id) {
    const response = await api.get(`/books/oneBookWithStatus/${id}`);
    return response.data;
}
export async function updateBook(id, bookData) {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
}
export async function deleteBook(id){
    const response = await api.delete(`/books/${id}`);
    return response.data;
}