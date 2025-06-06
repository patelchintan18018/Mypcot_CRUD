import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';
import api from '../api/api';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchRecords = async () => {
    try {
      const res = await api.get('/records');
       const recordsWithSelection = res.data.map((r) => ({ ...r, selected: false }));
      setRecords(recordsWithSelection);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <RecordForm
          fetchRecords={fetchRecords}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
        <RecordList
          records={records}
          setRecords={setRecords}
          fetchRecords={fetchRecords}
          setSelectedRecord={setSelectedRecord}
        />
      </div>
    </>
  );
};

export default Dashboard;
