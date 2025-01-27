import mongoose from 'mongoose';
import Category from './category.models.js';
import {Subcategory }from './subcategory.models.js';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    baseAmount: {
        type: Number,
        required: true,
    },
    discoutAmount: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
    },
    taxApplicablity: {
        type: Boolean,
        default: false, // Placeholder; this will be overridden by the hook
    },
    tax: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
});

// Pre-save hook to set taxApplicability from Category and Subcategory
itemSchema.pre('save', async function (next) {
    try {
        if (!this.taxApplicablity) {
            // Fetch the associated category and subcategory
            const category = await Category.findById(this.category);
            const subcategory = await Subcategory.findById(this.subcategory);
            if (category && subcategory) {
                this.taxApplicablity = category.taxApplicablity && subcategory.taxApplicablity;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Virtual property for totalAmount
itemSchema.virtual('totalAmount').get(function() {
    return this.baseAmount - this.discoutAmount;
});

export const Item = mongoose.model('Item', itemSchema);
