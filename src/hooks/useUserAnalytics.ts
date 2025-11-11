  // src/hooks/useUserAnalytics.ts
  import { useSuspenseQuery } from '@tanstack/react-query';

  type UserAnalytics = {
    dailyNewUsers: number;
    weeklyNewUsers: number;
    monthlyNewUsers: number;
    DAU: number;
    MAU: number;
    DAU_MAU_Ratio: string;
    topActiveUsers: { name: string | null; email: string | null; activityCount: number }[];
  };

  export function useUserAnalytics() {
    return useSuspenseQuery<UserAnalytics>({
      queryKey: ['userAnalytics'],
      queryFn: async () => {
        const res = await fetch('/api/analytics/users');
        if (!res.ok) throw new Error('Failed to fetch analytics');
        return res.json();
      },
      staleTime: 1000 * 60 * 5, // 5 min
      refetchOnWindowFocus: false,
    });
  }
