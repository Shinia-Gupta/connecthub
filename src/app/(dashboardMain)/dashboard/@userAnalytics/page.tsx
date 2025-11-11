'use client';
import useSWR from 'swr';
import NewUsersChart from './charts/NewUsersChart';
import DAUMAUChart from './charts/DAUMAUChart';
import TopUsersTable from './charts/TopUsersTable';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersAnalyticsTab() {
  const { data, error } = useSWR('/api/analytics/users', fetcher);

  if (error) return <p>Error loading analytics</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-8 m-8">
      <div>
        <h3 className="text-xl font-bold mb-2">New Users</h3>
        <NewUsersChart
          daily={data.dailyNewUsers}
          weekly={data.weeklyNewUsers}
          monthly={data.monthlyNewUsers}
        />
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">DAU / MAU</h3>
        <DAUMAUChart dau={data.DAU} mau={data.MAU} />
        <p className="mt-2">DAU / MAU Ratio: {data.DAU_MAU_Ratio}</p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Top Active Users</h3>
        <TopUsersTable users={data.topActiveUsers} />
              </div>
    </div>
  );
}
