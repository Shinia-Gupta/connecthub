type TopUser = {
  name: string | null;
  email: string | null;
  activityCount: number;
};

export default function TopUsersTable({ users }:{users:TopUser[]}) {
  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Activity Count</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email} className="border-t">
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.activityCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
