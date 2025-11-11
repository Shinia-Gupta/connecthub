"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useChatAnalytics() {
  const { data, error, isLoading } = useSWR("/api/analytics/chats", fetcher);
  return { data, error, isLoading };
}
