const express = require('express');
const { uploadReport, getReports, updateReportStatus } = require('../controllers/reportController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.get('/user', protect, getReports); // Get reports for logged-in user

// Admin routes
router.post('/upload', adminProtect, uploadReport);
router.put('/:id/status', adminProtect, updateReportStatus);

module.exports = router;
