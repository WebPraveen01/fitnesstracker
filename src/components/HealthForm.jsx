
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import './HealthForm.css'

function HealthForm({ isOpen, onClose, onSubmit, editingRecord }) {

  const [formData, setFormData] = useState({
    date: '',
    caloriesIntake: '',
    caloriesBurned: '',
    description: ''
  })

  // Fill the form when editing an existing record
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        date: editingRecord.date,
        caloriesIntake: editingRecord.caloriesIntake,
        caloriesBurned: editingRecord.caloriesBurned,
        description: editingRecord.description
      })
    } else {
      setFormData({
        date: '',
        caloriesIntake: '',
        caloriesBurned: '',
        description: ''
      })
    }
  }, [editingRecord, isOpen])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(formData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Health Data Form"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>
        {editingRecord
          ? "Let's see what you want to change!"
          : "Update Today's Data"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Calories Intake</label>
        <input
          type="number"
          name="caloriesIntake"
          placeholder="Enter Today's Calorie Intake"
          value={formData.caloriesIntake}
          onChange={handleChange}
          min="0"
          required
        />

        <label>Calories Burned</label>
        <input
          type="number"
          name="caloriesBurned"
          placeholder="Enter Today's Calorie Burned"
          value={formData.caloriesBurned}
          onChange={handleChange}
          min="0"
          required
        />

        <label>Short Description</label>
        <input
          type="text"
          name="description"
          placeholder="Enter a short description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default HealthForm
