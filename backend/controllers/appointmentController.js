const Appointment = require('../models/Appointment');

// Book an appointment
const bookAppointment = async (req, res) => {
  const { testId, date, timeSlot, collectionType, address } = req.body;

  try {
    const appointment = await Appointment.create({
      userId: req.user.id,
      testId,
      date,
      timeSlot,
      collectionType,
      address,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get appointments
const getAppointments = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const appointments = await Appointment.find(query).populate('testId').sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.status = status;
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookAppointment, getAppointments, updateAppointmentStatus };
