"use client"

import { Suspense } from "react";

export default function DashboardLayout({ children, chatAnalytics, UserDAUMAUChart, UserNewUsersChart, UserTopUsersChart }: { children: React.ReactNode, chatAnalytics: React.ReactNode, UserDAUMAUChart: React.ReactNode, UserNewUsersChart: React.ReactNode, UserTopUsersChart: React.ReactNode }) {
    return (
        <>
            {chatAnalytics}

            <div className="space-y-8 m-8">
                <div>
                    <h3 className="text-xl font-bold mb-2">New Users</h3>
                    <Suspense >
                        {UserNewUsersChart}
                    </Suspense>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-2">DAU / MAU</h3>
                    <Suspense>
                        {UserDAUMAUChart}
                    </Suspense>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-2">Top Active Users</h3>
                    <Suspense>
                        {UserTopUsersChart}
                    </Suspense>
                </div>
            </div>
        </>
    )

}