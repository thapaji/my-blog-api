import BlogSchema from "./BlogSchema.js";

/********************CREATE ********************/
export const createBlogSchema = (blogData) => {
    console.log(blogData);
    return BlogSchema.create(blogData);
}

/******************** READ ********************/
export const getBlogById = (id) => {
    console.log(id);
    return BlogSchema.findById(id);
}

export const getAllBlogs = () => {
    return BlogSchema.find();
}

/******************** UPDATE ********************/
export const updateBlogSchema = async (id, newData) => {
    console.log(newData);
    return await BlogSchema.findByIdAndUpdate(id, newData, { new: true });
}

/******************** DELETE ********************/
export const deleteBlogSchema = (ids) => {
    return BlogSchema.deleteMany({ _id: { $in: ids } });
}
