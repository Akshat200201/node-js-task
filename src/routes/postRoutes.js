const express = require('express');
const { getPosts, createPost, deletePost, updatePost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getPosts).post(protect, createPost);
router.route('/:id').delete(protect, deletePost).put(protect, updatePost);

module.exports = router;
