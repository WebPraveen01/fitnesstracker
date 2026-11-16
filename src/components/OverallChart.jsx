import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import './OverallChart.css'

function OverallChart({ records = [] }) {
  const totalCaloriesIntake = records.reduce(
    (total, record) => total + Number(record.caloriesIntake),
    0,
  );

  const totalCaloriesBurned = records.reduce(
    (total, record) => total + Number(record.caloriesBurned),
    0,
  );

  const pieData = [
    {
      name: "Calories Intake",
      value: totalCaloriesIntake,
    },
    {
      name: "Calories Burned",
      value: totalCaloriesBurned,
    },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];
  return (
    <div className="overall-data">
      <h3>Overall Data</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

              const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
              const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={13}
                  fontWeight="bold"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            labelLine={false}
            labelPosition="inside"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverallChart