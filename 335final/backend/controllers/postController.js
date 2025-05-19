const Post = require("../models/Post");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { user, content, media, tags } = req.body;
    const newPost = new Post({ user, content, media, tags });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Fetch all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};