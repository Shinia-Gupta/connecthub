import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DAUMAUChart({ dau, mau }:{dau:any,mau:any}) {
  const data = [
    { name: 'DAU', value: dau },
    { name: 'Other MAU', value: mau - dau > 0 ? mau - dau : 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
