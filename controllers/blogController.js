const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blog = await Blog.create({ title, content, author });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await blog.update({ title, content, author });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await blog.destroy();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
