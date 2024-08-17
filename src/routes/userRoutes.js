const express = require('express');
const { getUsers, createUser, deleteUser, updateUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getUsers).post(createUser);
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser);

module.exports = router;
