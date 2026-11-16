import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import './WeeklyChart.css'

function WeeklyChart({ records = [] }) {
 // console.log('Records received by chart:', records)
  const today = new Date()

  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(today.getDate() - (6 - index))

    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-')

    const record = records.find(item => item.date === formattedDate)
    //console.log('Chart date:', formattedDate, 'Matched record:', record)

    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'short'
      }),
      hasRecord: Boolean(record),
      caloriesIntake: record ? record.caloriesIntake : 0,
      caloriesBurned: record ? record.caloriesBurned : 0
    }
  })

  if (!last7Days.some(day => day.hasRecord)) {
    return null
  }

  return (
    <div className="weekly-chart">
      <h3>Weekly Health Trends</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={last7Days}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />

          <Bar dataKey="caloriesIntake" name="Calories Intake" fill="#8884d8" />
          <Bar dataKey="caloriesBurned" name="Calories Burned" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyChart