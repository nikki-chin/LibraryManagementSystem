import express from 'express'
import { Book } from '../models/bookModel.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
import { getAllBooks, getOneBook } from '../controllers/bookController.js';

const router = express.Router();

//Save new book
router.post('/', authMiddleware, isAdmin, async (request, response) => {
    try{
        if(request.user.role !== 'admin'){
            return response.status(403).json({ message: 'Access denied' });
        }

        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.isbn
        ){
            return response.status(400).send({
                message: 'Send all required feild: title, author, isbn'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            isbn: request.body.isbn,
            genre: request.body.genre,
            description: request.body.description,
            coverImage: request.body.coverImage
        };

        const book = await Book.create(newBook);

        return response.status(201).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.get('/bookWithStatus', getAllBooks);

router.get('/oneBookWithStatus/:id', getOneBook);

//get all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//get one book from databaase by id
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//update a book
router.put('/:id', authMiddleware, isAdmin, async (request, response) => {
    try{
        if(request.user.role !== 'admin'){
            return response.status(403).json({ message: 'Access denied' });
        }

        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.isbn
        ){
            return response.status(400).send({
                message: 'Send all required feild: title, author, isbn'
            })
        }

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(
            id, 
            request.body,
            { new: true, runValidators: true }
        );

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book updated sucessfully'}); 
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//delete a book
router.delete('/:id', authMiddleware, isAdmin, async (request, response) => {
    try {
        if(request.user.role !== 'admin'){
            return response.status(403).json({ message: 'Access denied' });
        }

        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book deleted successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});



export default router;