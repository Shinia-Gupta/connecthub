"use client";
import { useChatAnalytics } from "@/src/hooks/useChatAnalytics";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MessageTrendsChart() {
    const {data}=useChatAnalytics();
    
  const chartData = [
    { name: "Daily", count: data?.dailyMessages },
    { name: "Weekly", count: data?.weeklyMessages },
    { name: "Monthly", count: data?.monthlyMessages },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
