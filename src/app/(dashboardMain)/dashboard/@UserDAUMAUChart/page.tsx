"use client"
import { useUserAnalytics } from '@/src/hooks/useUserAnalytics';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DAUMAUChart() {
  const {data}=useUserAnalytics();
  
const dataPlot = [
  { name: 'DAUs', value: data?.DAU ?? 0 },
  { name: 'Other MAU', value: Math.max((data?.MAU ?? 0) - (data?.DAU ?? 0), 0) },
];


  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={dataPlot} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
          {dataPlot.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    <p className="mt-2">DAU / MAU Ratio: {data?.DAU_MAU_Ratio}</p>
    </>
  );
}
