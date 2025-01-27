import { Item } from "../models/items.models.js";
import Category from "../models/category.models.js";
import { Subcategory } from "../models/subcategory.models.js";

import { z } from "zod";

export const createItem = async (req, res) => {
  try {
    // Validate the request body
    const schema = z.object({
      name: z.string().min(1).max(255).trim(),
      description: z.string().min(1).max(255).trim(),
      image: z.string().min(1).max(255).trim().optional(),
      baseAmount: z.number().min(0).max(100).optional(),
      discountAmount: z.number().min(0).max(100).optional(),
      quantity: z.number().min(0).max(100).optional(),
      taxApplicablity: z.boolean().optional(),
      tax: z.number().min(0).max(100).optional(),
      category: z.string().min(1).max(255).trim(),
      subcategory: z.string().min(1).max(255).trim(),
    });

    const validatedData = schema.parse(req.body);

    // Fetch the category and subcategory
    const categories = await Category.find({ name: validatedData.category });
    const subcategories = await Subcategory.find({ name: validatedData.subcategory });
    console.log(categories);
    if (categories.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (subcategories.length === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Create a new item
    const item = new Item({
      name: validatedData.name,
      description: validatedData.description,
      image: validatedData.image,
      baseAmount: validatedData.baseAmount,
      discountAmount: validatedData.discountAmount,
      quantity: validatedData.quantity,
      taxApplicablity: validatedData.taxApplicablity,
      tax: validatedData.tax,
      category: categories[0]._id, // Assign the first matched category ID
      subcategory: subcategories[0]._id, // Assign the first matched subcategory ID
    });

    await item.save();

    res.status(201).json(item);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};


// get all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

// get item by name
export const getItemByName = async (req, res) => {
    try {
        const { name } = req.params;
        const item = await Item.findOne({ name });
        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};



// API to get all items under a category
export const getItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const items = await Item.find({ category: category });

        // Check if items array is empty
        if (items.length === 0) {
            res.status(404).json({ message: 'No items found for the specified category' });
            return;
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};


// API to get all items under a subcategory
export const getItemsBySubcategory = async (req, res) => {
    try {
        const { subcategory } = req.params;
        const items = await Item.find({ subcategory });
        if (!items) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};  


// API to update item
export const updateItem = async (req, res) => {
    try {
        const { name, description, image, baseAmount, discountAmount, quantity, taxApplicablity, tax, category, subcategory } = req.body;
        const { name: itemName } = req.params;
        // Validate the request body
        const schema = z.object({
            name: z.string().min(1).max(255).trim(),
            description: z.string().min(1).max(255).trim(),
            image: z.string().min(1).max(255).trim().optional(),
            baseAmount: z.number().min(0).max(100).optional(),
            discountAmount: z.number().min(0).max(100).optional(),
            quantity: z.number().min(0).max(100).optional(),
            taxApplicablity: z.boolean().optional(),
            tax: z.number().min(0).max(100).optional(),
            category: z.string().min(1).max(255).trim().optional(),
            subcategory: z.string().min(1).max(255).trim().optional(),
        });
        const validatedData = schema.parse(req.body);

        // Update the item
        const item = await Item.findOneAndUpdate(
            { name: itemName },
            {
                name: validatedData.name,
                description: validatedData.description,
                image: validatedData.image,
                baseAmount: validatedData.baseAmount,
                discountAmount: validatedData.discountAmount,
                quantity: validatedData.quantity,
                taxApplicablity: validatedData.taxApplicablity,
                tax: validatedData.tax,
                category: validatedData.category,
                subcategory: validatedData.subcategory,
            },
            { new: true }
        );
        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }       
            res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

// API to delete item
export const deleteItem = async (req, res) => {
    try {
        const { name } = req.params;
        const item = await Item.findOneAndDelete({ name });
        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};