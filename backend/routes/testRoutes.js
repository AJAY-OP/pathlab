const express = require('express');
const { getTests, addTest, updateTest, deleteTest } = require('../controllers/testController');
const { adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getTests); // Get all tests

// Admin routes
router.post('/add', adminProtect, addTest);
router.put('/:id', adminProtect, updateTest);
router.delete('/:id', adminProtect, deleteTest);

module.exports = router;
