import React, { useState, useEffect } from 'react';
import api from '../api/api';

const RecordList = ({ records, fetchRecords,setRecords, setSelectedRecord }) => {
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('');
  const [flterCategory, setFliterCategory] = useState('')
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/records/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this record?')) {
      api.delete(`/records/${id}`)
        .then(() => fetchRecords())
        .catch((err) => console.error(err));
    }
  };

  const handleBulkDelete = () => {
    const selectedIds = records.filter((rec) => rec.selected).map((rec) => rec._id);
    if (selectedIds.length === 0) return;
    if (confirm('Are you sure you want to delete selected records?')) {
      api.post('/records/bulk-delete', { ids: selectedIds })
        .then(() => fetchRecords())
        .catch((err) => console.error(err));
    }
  };

  const toggleSelect = (id) => {
    const updatedRecords = records.map((rec) =>
      rec._id === id ? { ...rec, selected: !rec.selected } : rec
    );
    setRecords(updatedRecords);
  };

const filteredRecords = records.filter((record) => {
  const isNameMatching = record.name.toLowerCase().includes(search.toLowerCase());

  let isCategoryMatching =true;

  if(flterCategory){
    isCategoryMatching = record.category?.name === flterCategory;
  }

  let isStatusMatching = true;

  if (filterActive === 'true') {
    isStatusMatching = record.active === true;
  } else if (filterActive === 'false') {
    isStatusMatching = record.active === false;
  }

  return isNameMatching && isStatusMatching && isCategoryMatching;
});


  return (
    <div className="bg-white p-4 shadow-md rounded">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 mr-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 mr-2"
          value={flterCategory}
          onChange={(e) => setFliterCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <select
          className="border p-2"
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      <button
        onClick={handleBulkDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Bulk Delete
      </button>
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((rec) => (
            <tr key={rec._id}>
              <td>
                <input
                  type="checkbox"
                  checked={rec.selected || false}
                  onChange={() => toggleSelect(rec._id)}
                />
              </td>
              <td>{rec.name}</td>
              <td>{rec.description}</td>
              <td>{rec.category.name}</td>
              <td>{rec.active ? 'Yes' : 'No'}</td>
              <td>
                <button
                  onClick={() => setSelectedRecord(rec)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rec._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
