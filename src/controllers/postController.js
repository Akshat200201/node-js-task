const Post = require('../models/post');
const User = require('../models/user');

const getPosts = async (req, res) => {
  const posts = await Post.find().populate('createdBy', 'name email').populate('comments.sentBy', 'name email').populate('comments.liked', 'name email');
  res.json(posts);
};

const createPost = async (req, res) => {
  const { message } = req.body;

  const post = new Post({
    createdBy: req.user._id,
    message,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post && post.createdBy.toString() === req.user._id.toString()) {
    await post.remove();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404).json({ message: 'Post not found or not authorized' });
  }
};

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post && post.createdBy.toString() === req.user._id.toString()) {
    post.message = req.body.message || post.message;
    post.updatedAt = Date.now();
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Post not found or not authorized' });
  }
};

module.exports = { getPosts, createPost, deletePost, updatePost };
