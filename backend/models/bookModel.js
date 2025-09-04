import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        isbn: { type: String, unique: true },
        genre: String,
        description: String,
        coverImage: String
    }, { timestamps: true }

);

export const Book = mongoose.model('Book', bookSchema);