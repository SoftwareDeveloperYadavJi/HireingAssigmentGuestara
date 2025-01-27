import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
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
    taxApplicablity: {
        type: Boolean,
        required: true,
    },
    tax: {
        type: Number,
    },
    taxType: {
        type: String,
        enum: ['inclusive', 'exclusive'],
        required: true,
    },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

