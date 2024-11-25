const express = require('express');
const { bookAppointment, getAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/book', protect, bookAppointment);
router.get('/user', protect, getAppointments); // Get appointments for logged-in user

// Admin routes
router.get('/all', adminProtect, getAppointments); // Get all appointments
router.put('/:id/status', adminProtect, updateAppointmentStatus);

module.exports = router;
