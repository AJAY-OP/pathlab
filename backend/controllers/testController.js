const Test = require('../models/Test');

// Get all tests
const getTests = async (req, res) => {
  try {
    const tests = await Test.find({});
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new test
const addTest = async (req, res) => {
  const { name, category, description, price, duration } = req.body;

  try {
    const test = await Test.create({ name, category, description, price, duration });
    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a test
const updateTest = async (req, res) => {
  const { name, category, description, price, duration } = req.body;

  try {
    const test = await Test.findById(req.params.id);

    if (test) {
      test.name = name || test.name;
      test.category = category || test.category;
      test.description = description || test.description;
      test.price = price || test.price;
      test.duration = duration || test.duration;

      const updatedTest = await test.save();
      res.json(updatedTest);
    } else {
      res.status(404).json({ message: 'Test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a test
const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (test) {
      await test.remove();
      res.json({ message: 'Test removed' });
    } else {
      res.status(404).json({ message: 'Test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTests, addTest, updateTest, deleteTest };
