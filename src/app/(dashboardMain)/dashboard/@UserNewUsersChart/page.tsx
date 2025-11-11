"use client"
import { useUserAnalytics } from '@/src/hooks/useUserAnalytics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function NewUsersChart() {
  const {data}=useUserAnalytics();
  
  const dataPlot = [
    { period: 'Daily', users: data?.dailyNewUsers },
    { period: 'Weekly', users: data?.weeklyNewUsers },
    { period: 'Monthly', users: data?.monthlyNewUsers },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataPlot}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
