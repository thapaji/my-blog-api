import express from "express";
import { createBlogSchema, getBlogById, getAllBlogs, updateBlogSchema, deleteBlogSchema } from "../model/blogs/BlogModel.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

/***************** Public Controllers ******************/

router.get("/", async (req, res, next) => {
    try {
        const blogs = await getAllBlogs();
        res.json({
            status: "success",
            message: "Blogs fetched successfully",
            blogs
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const blog = await getBlogById(blogId);
        if (!blog) {
            res.status(404).json({
                status: "error",
                message: "Blog not found"
            });
            return;
        }
        res.json({
            status: "success",
            message: "Blog fetched successfully",
            blog
        });
    } catch (error) {
        next(error);
    }
});

/***************** Private Controllers ******************/

router.post("/", auth, async (req, res, next) => {
    try {
        const blog = await createBlogSchema(req.body);

        blog?._id
            ? res.json({
                status: "success",
                message: "Blog created successfully",
                blog
            })
            : res.json({
                status: "error",
                message: "Unable to create blog. Please try again",
            });
    } catch (error) {
        next(error);
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const newData = req.body;
        const updatedBlog = await updateBlogSchema(blogId, newData);
        if (!updatedBlog) {
            res.status(404).json({
                status: "error",
                message: "Blog not found"
            });
            return;
        }
        res.json({
            status: "success",
            message: "Blog updated successfully",
            updatedBlog
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/", auth, async (req, res, next) => {
    try {
        const blogIdsToDelete = req.body.ids;
        console.log(blogIdsToDelete)
        const deleteResult = await deleteBlogSchema(blogIdsToDelete);
        res.json({
            status: "success",
            message: `${deleteResult.deletedCount} blog(s) deleted successfully`
        });
    } catch (error) {
        next(error);
    }
});

export default router;