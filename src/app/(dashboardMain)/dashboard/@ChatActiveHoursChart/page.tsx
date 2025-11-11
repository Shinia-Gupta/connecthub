"use client";
import { useChatAnalytics } from "@/src/hooks/useChatAnalytics";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ActiveHoursChart() {
    const {data}=useChatAnalytics();
  const chartData = data?.mostActiveHours?.map((count:number, i:number) => ({ hour: i, messages: count }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="hour" stroke="#ccc" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="messages" stroke="#6366f1" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
