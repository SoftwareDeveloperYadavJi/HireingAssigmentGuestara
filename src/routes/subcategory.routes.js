import express from 'express';
const subcategoryRouter = express.Router();
import { createSubcategory, getSubcategories, getSubcategoryByName, getSubcategoriesByCategory , updateSubcategory} from '../controllers/subcategory.controller.js';




subcategoryRouter.post('/create', createSubcategory);
subcategoryRouter.get('/all', getSubcategories);
subcategoryRouter.get('/:name', getSubcategoryByName);
subcategoryRouter.get('/category/:category', getSubcategoriesByCategory); 
subcategoryRouter.put('/update/:name', updateSubcategory);


export default subcategoryRouter;