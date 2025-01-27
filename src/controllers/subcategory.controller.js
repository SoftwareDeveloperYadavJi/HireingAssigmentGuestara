
import {z} from 'zod';
import { Subcategory } from '../models/subcategory.models.js';
import Category from '../models/category.models.js';

export const createSubcategory = async (req, res) => {
    try {
        const { name, description, image, categoryName, taxApplicablity, tax, taxType } = req.body;
        
        // Validate the request body
        const schema = z.object({
            name: z.string().min(1).max(255).trim(),
            description: z.string().min(1).max(255).trim(),
            image: z.string().min(1).max(255).trim().optional(),
            categoryName: z.string().min(1).max(255).trim(),
            taxApplicablity: z.boolean().optional(),
            tax: z.number().min(0).max(100).optional(),
            taxType: z.enum(['inclusive', 'exclusive']).optional(),
        });
        const validatedData = schema.parse(req.body);

        // Find the category by name
        const category = await Category.find({ name: validatedData.categoryName });
        console.log(category);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create a new subcategory
        const subcategory = new Subcategory({
            name: validatedData.name,
            description: validatedData.description,
            image: validatedData.image,
            category: category[0]._id,
            taxApplicablity: validatedData.taxApplicablity,
            tax: validatedData.tax,
            taxType: validatedData.taxType,
        });
        await subcategory.save();

        res.status(201).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

// get all subcategories
export const getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

// get subcategory by name
export const getSubcategoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        const subcategory = await Subcategory.findOne({ name });
        if (!subcategory) {
            res.status(404).json({ message: 'Subcategory not found' });
            return;
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};



// API to get all sub categories under a category
export const getSubcategoriesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log(category);
        const subcategories = await Subcategory.find({category});

        if (!subcategories && subcategories.length === 0) {
            res.status(404).json({ message: 'Subcategory not found' });
            return;
        }
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};


export const updateSubcategory = async (req, res) => {
    try {
        const { name: subcategoryName } = req.params;
        // Validate the request body
        const schema = z.object({
            name: z.string().min(1).max(255).trim(),
            description: z.string().min(1).max(255).trim(),
            image: z.string().min(1).max(255).trim().optional(),
            categoryName: z.string().min(1).max(255).trim(),
            taxApplicablity: z.boolean().optional(),
            tax: z.number().min(0).max(100).optional(),
            taxType: z.enum(['inclusive', 'exclusive']).optional(),
        });
        const validatedData = schema.parse(req.body);
        // Update the subcategory
        const subcategory = await Subcategory.findOneAndUpdate(
            { name: subcategoryName },
            {
                name: validatedData.name,
                description: validatedData.description,
                image: validatedData.image,
                taxApplicablity: validatedData.taxApplicablity,
                tax: validatedData.tax,
                taxType: validatedData.taxType,
            },
            { new: true }
        );
        if (!subcategory) {
            res.status(404).json({ message: 'Subcategory not found' });
            return;
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};
