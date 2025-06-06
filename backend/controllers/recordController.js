import Record from '../models/Record.js';
import Category from '../models/Category.js';

export const createRecord = async (req, res) => {
  const { name, description, category, active } = req.body;
  try {
    const record = await Record.create({
      name,
      description,
      category,
      active,
      userId: req.userId,
    });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create record' });
  }
};

export const getRecords = async (req, res) => {
  try {
    const records = await Record.find({ userId: req.userId }).populate('category');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
};


export const getRecordById = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id, userId: req.userId }).populate('category');
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch record' });
  }
};

export const updateRecord = async (req, res) => {
  const { name, description, category, active } = req.body;
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, description, category, active },
      { new: true }
    );
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update record' });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
};

export const bulkDeleteRecords = async (req, res) => {
  const { ids } = req.body; // expecting an array of record IDs
  try {
    await Record.deleteMany({ _id: { $in: ids }, userId: req.userId });
    res.json({ message: 'Records deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete records' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
