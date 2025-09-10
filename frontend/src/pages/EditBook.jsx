import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneBookWithStatus, updateBook } from "../services/bookService.js";
import styles from "./EditBook.module.css"
import BackButton from "../components/BackButton.jsx";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    description: ""
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getOneBookWithStatus(id);
        setBookData({
          title: data.title || "",
          author: data.author || "",
          isbn: data.isbn || "",
          description: data.description || ""
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, bookData);
      navigate(`/books/details/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <BackButton />

      <div className={styles.editBookContainer}>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
          <label>Author</label>
          <input
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
          <label>ISBN</label>
          <input
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );

};

export default EditBook;