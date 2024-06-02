import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    tags: {
        type: [String],
        required: false,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model('blog', BlogSchema)