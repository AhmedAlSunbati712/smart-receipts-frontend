import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart, // Optional: for a gradient effect
  } from 'recharts';
  
  interface SpendingData {
    date: string;
    total: number;
  }
  
  export const SpendingLineChart = ({ data }: { data: {date: string, total:number}[] }) => {
    const formatCurrency = (value: number) => 
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  
    return (
      <div style={{ width: '100%', height: 350, backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10} 
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={formatCurrency}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
  
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
              formatter={(value: number | string | undefined) => {
                const numericValue = typeof value === 'number' ? value : 0;
                return [formatCurrency(numericValue), 'Spending'];
              }}            />
  
            <Line
              type="monotone"
              dataKey="total"
              stroke="#0f766e"
              strokeWidth={3}
              dot={{ r: 4, fill: '#0f766e', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };