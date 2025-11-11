"use client"
import { useUserAnalytics } from "@/src/hooks/useUserAnalytics";
import { useThemeStore } from "@/src/store/themeStore";
type TopUser = {
  name: string | null;
  email: string | null;
  activityCount: number;
};

export default function TopUsersTable() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const {data}=useUserAnalytics();
  return (
    <table
      className={`min-w-full border ${
        isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
      }`}
    >
      <thead className={isDark ? "bg-gray-800" : "bg-gray-100"}>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Activity Count</th>
        </tr>
      </thead>
      <tbody>
        {data?.topActiveUsers.map((user:TopUser) => (
          <tr
            key={user.email}
            className={`border-t ${
              isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.activityCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
