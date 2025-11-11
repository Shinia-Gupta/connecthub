import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function NewUsersChart({ daily, weekly, monthly }:{daily:any,weekly:any,monthly:any}) {
  const data = [
    { period: 'Daily', users: daily },
    { period: 'Weekly', users: weekly },
    { period: 'Monthly', users: monthly },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
