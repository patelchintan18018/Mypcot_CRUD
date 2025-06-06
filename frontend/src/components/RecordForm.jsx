import React, { useState, useEffect } from 'react';
import api from '../api/api';

const RecordForm = ({ fetchRecords, selectedRecord, setSelectedRecord }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [active, setActive] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/records/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedRecord) {
      setName(selectedRecord.name);
      setDescription(selectedRecord.description);
      setCategory(selectedRecord.category._id);
      setActive(selectedRecord.active);
    }
  }, [selectedRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recordData = { name, description, category, active };
    if (selectedRecord) {
      api.put(`/records/${selectedRecord._id}`, recordData)
        .then(() => {
          fetchRecords();
          setSelectedRecord(null);
          resetForm();
        })
        .catch((err) => console.error(err));
    } else {
      api.post('/records', recordData)
        .then(() => {
          fetchRecords();
          resetForm();
        })
        .catch((err) => console.error(err));
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setActive(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-4">
      <h2 className="text-xl mb-4">{selectedRecord ? 'Edit Record' : 'Add Record'}</h2>
      <div className="mb-2">
        <label className="block">Name:</label>
        <input
          type="text"
          className="w-full border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Description:</label>
        <textarea
          className="w-full border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-2">
        <label className="block">Category:</label>
        <select
          className="w-full border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          Active
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {selectedRecord ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default RecordForm;
