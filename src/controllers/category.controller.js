import { Router } from 'express';
import Category  from '../models/category.models.js';
import {z} from 'zod';



export const createCategory = async (req, res) => {
  try {
    // Validate the request body
    const schema = z.object({
      name: z.string().min(1).max(255).trim(),
      description: z.string().min(1).max(255).trim(),
      image: z.string().min(1).max(255).trim().optional(),
      taxApplicablity: z.boolean().optional(),
      tax: z.number().min(0).max(100).optional(),
      taxType: z.enum(['inclusive', 'exclusive']).optional(),
    });
    const validatedData = schema.parse(req.body);

    // Create a new category
    const category = new Category({
      name: validatedData.name,
      description: validatedData.description,
      image: validatedData.image,
      taxApplicablity: validatedData.taxApplicablity,
      tax: validatedData.tax,
      taxType: validatedData.taxType,
    });
    await category.save();

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

export const getCategoriesByName = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await Category.findOne({ name });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

export const updateCategory = async (req, res) => {
    try {
      const { name } = req.params;
        // Validate the request body
        const schema = z.object({
            name: z.string().min(1).max(255).trim(),
            description: z.string().min(1).max(255).trim(),
            image: z.string().min(1).max(255).trim().optional(),
            taxApplicablity: z.boolean().optional(),
            tax: z.number().min(0).max(100).optional(),
            taxType: z.enum(['inclusive', 'exclusive']).optional(),
        });
        const validatedData = schema.parse(req.body);

        // Update the category
        const category = await Category.findOneAndUpdate(
            { name },
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
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { name } = req.params;
        const category = await Category.findOneAndDelete({ name });
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};