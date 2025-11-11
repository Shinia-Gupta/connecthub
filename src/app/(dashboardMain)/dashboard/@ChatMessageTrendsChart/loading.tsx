
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
    Loading Chat Messages Trends chart
      </p>
    </div>
  );
}