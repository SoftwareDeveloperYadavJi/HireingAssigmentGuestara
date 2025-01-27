import express from 'express';
const categoryRouter = express.Router();
import { createCategory, getCategories, getCategoriesByName, updateCategory, deleteCategory } from '../controllers/category.controller.js';


categoryRouter.post('/create', createCategory);
categoryRouter.get('/all', getCategories);
categoryRouter.get('/:name', getCategoriesByName);
categoryRouter.put('/update/:name', updateCategory);
categoryRouter.delete('/delete/:name', deleteCategory);



export default categoryRouter;