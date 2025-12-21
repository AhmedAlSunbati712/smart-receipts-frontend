import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';
interface PieChartProps {
  chartData: any[]; // The result from your formatPieData function
  primaryKey: string; // e.g., "category"
  isAnimationActive?: boolean;
}

export default function PieChartWithLabels({ 
  chartData, 
  primaryKey, 
  isAnimationActive = true 
}: PieChartProps) {
  return (
    <div className="mt-8" style={{ width: '100%', maxWidth: '370px', aspectRatio: 1 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius="30%"
            outerRadius="40%"
            cornerRadius={8}
            paddingAngle={5}
            dataKey="total" 
            nameKey={primaryKey}
            label={({ name, percent }) => `${name}`}
            isAnimationActive={isAnimationActive}
          >            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}