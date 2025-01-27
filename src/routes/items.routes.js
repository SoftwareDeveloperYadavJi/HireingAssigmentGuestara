import express from 'express';
const itemsRouter = express.Router();
import { createItem, getItems, getItemByName, getItemsByCategory, getItemsBySubcategory, updateItem, deleteItem } from '../controllers/items.controller.js';


itemsRouter.post('/create', createItem);
itemsRouter.get('/all', getItems);
itemsRouter.get('/:name', getItemByName);
itemsRouter.get('/category/:category', getItemsByCategory);
itemsRouter.get('/subcategory/:subcategory', getItemsBySubcategory);
itemsRouter.put('/update/:name', updateItem);    
itemsRouter.delete('/delete/:name', deleteItem);



export default itemsRouter;