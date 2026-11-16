
import { useState,useEffect } from 'react'
import HealthForm from './components/HealthForm'
import RecentStatistics from './components/RecentStatistics'
import WeeklyChart from './components/WeeklyChart'
import OverallChart from './components/OverallChart'
import { useSnackbar } from 'notistack'
import './App.css'


function App() {
  const { enqueueSnackbar } = useSnackbar()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [healthRecords, setHealthRecords] = useState(()=>{
    const saveRecords = localStorage.getItem("healthAndFitness")
    return saveRecords ? JSON.parse(saveRecords):[]
  });
  const [editingRecord, setEditingRecord] = useState(null)

  const handleFormSubmit = (formData) => {

  if (editingRecord) {

    setHealthRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === editingRecord.id
          ? {
              ...record,
              ...formData,
              caloriesIntake: Number(formData.caloriesIntake),
              caloriesBurned: Number(formData.caloriesBurned)
            }
          : record
      )
    )

    enqueueSnackbar('Health record updated successfully!', {
      variant: 'success'
    })

  } else {

    const newRecord = {
      id: Date.now(),
      ...formData,
      caloriesIntake: Number(formData.caloriesIntake),
      caloriesBurned: Number(formData.caloriesBurned)
    }

    setHealthRecords(prevRecords => [...prevRecords, newRecord])

    enqueueSnackbar('Health record added successfully!', {
      variant: 'success'
    })
  }

  setEditingRecord(null)
  setIsModalOpen(false)
}

  const handleDeleteRecord = (id) => {
  setHealthRecords(prevRecords =>
    prevRecords.filter(record => record.id !== id)
  )

  enqueueSnackbar('Health record deleted successfully!', {
    variant: 'error'
  })
}
const handleEditRecord =(record)=>{
  setEditingRecord(record)
  setIsModalOpen(true)
}
 useEffect(() => {localStorage.setItem('healthAndFitness',JSON.stringify(healthRecords))
}, [healthRecords])

  return (
    <div className="app">
      {/* Header */}
      <h1>Health And Fitness Tracker</h1>

      {/* Top Dashboard */}
      <div className="dashboard">
        {/* Add Data Section */}
        <div className="add-data-section">
          <div className="add-data-card">
            <h3>Update Today's Data</h3>

            <button onClick={() => setIsModalOpen(true)}>+ Add data</button>
          </div>
        </div>

        <WeeklyChart records={healthRecords} />
      </div>

      {/* Bottom Dashboard */}
      <div className="bottom-dashboard">
        {/* Recent Statistics */}
        <RecentStatistics records={healthRecords} onDelete={handleDeleteRecord} onEdit={handleEditRecord} />

        <OverallChart records={healthRecords} />
      </div>

      {/* Temporary Modal Placeholder */}
      <HealthForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        editingRecord={editingRecord}
      />
    </div>
  );
}

export default App
