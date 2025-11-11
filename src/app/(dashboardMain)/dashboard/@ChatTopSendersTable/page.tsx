"use client";

import { useChatAnalytics } from "@/src/hooks/useChatAnalytics";

export default function TopSendersTable() {
    const {data}=useChatAnalytics();
    console.log("data in senders---",data);
    
  return (
    <table className="min-w-full border border-gray-700 text-left">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-2">User</th>
          <th className="p-2">Email</th>
          <th className="p-2">Messages</th>
        </tr>
      </thead>
      <tbody>
        {data && data?.topUsers?.map((u:any, i:number) => (
          <tr key={i} className="border-t border-gray-700">
            <td className="p-2">{u.name || "Unnamed"}</td>
            <td className="p-2 text-gray-400">{u.email}</td>
            <td className="p-2">{u.messageCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
