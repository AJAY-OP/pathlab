const Report = require('../models/Report');

// Upload a test report
const uploadReport = async (req, res) => {
  const { userId, appointmentId, testId, reportFile } = req.body;

  try {
    const report = await Report.create({
      userId,
      appointmentId,
      testId,
      reportFile,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reports
const getReports = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const reports = await Report.find(query).populate('testId appointmentId');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update report status
const updateReportStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const report = await Report.findById(req.params.id);

    if (report) {
      report.status = status;
      const updatedReport = await report.save();
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadReport, getReports, updateReportStatus };
