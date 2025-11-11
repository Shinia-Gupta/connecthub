"use client";
import { useChatAnalytics } from "@/src/hooks/useChatAnalytics";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function MediaSharePie() {
    const {data}=useChatAnalytics();
    
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];
  const chartData = data && Object.entries(data?.mediaSharedCount).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={chartData} dataKey="value" label outerRadius={100}>
          {chartData?.map((_:any, i:number) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
