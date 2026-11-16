import './RecentStatistics.css'

function RecentStatistics({ records=[] ,onDelete ,onEdit   }) {
  return (
    <div className="recent-statistics">
      <h3>Recent Health Statistics:</h3>

      <div className="statistics-list">
        {records.length === 0 ? (
          <p className="empty-message">
            No health records available. Add your first record!
          </p>
        ) : (
          records.map((record) => (
            <div className="statistics-item" key={record.id}>
              <div className="statistics-details">
                <p className="statistics-description">{record.description}</p>

                <p className="statistics-calories">
                  Calories Intake = {record.caloriesIntake}
                  {"  "}
                  Calories Burned = {record.caloriesBurned}
                </p>
              </div>

              <div className="transaction-actions">
                <h4 className="transaction-date">{record.date}</h4>

                <button
                  className="delete-btn"
                  title="Delete"
                  onClick={() => onDelete(record.id)}
                >
                  ×
                </button>

                <button
                  className="edit-btn"
                  title="Edit"
                  onClick={() => onEdit(record)}
                >
                  ✎
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentStatistics