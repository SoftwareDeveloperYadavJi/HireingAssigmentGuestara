import mongoose from 'mongoose';
import Category from './category.models.js';

const subcategorySchema = new mongoose.Schema({
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    taxApplicablity: {
        type: Boolean,
        default: false, // Placeholder; this will be overridden by the hook
    },
    tax: {
        type: Number,
    },
});

// Pre-save hook to set taxApplicability from Category
subcategorySchema.pre('save', async function (next) {
    try {
        if (!this.taxApplicablity) {
            // Fetch the associated category
            const category = await Category.findById(this.category);
            if (category) {
                this.taxApplicablity = category.taxApplicablity;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Subcategory = mongoose.model('Subcategory', subcategorySchema);