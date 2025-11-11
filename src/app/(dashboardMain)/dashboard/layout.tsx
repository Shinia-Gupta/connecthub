"use client"

import { Suspense } from "react";

export default function DashboardLayout({ children, UserDAUMAUChart, UserNewUsersChart, UserTopUsersChart,ChatMessageTrendsChart,ChatMediaSharePie,ChatActiveHoursChart,ChatTopSendersTable }: { children: React.ReactNode, UserDAUMAUChart: React.ReactNode, UserNewUsersChart: React.ReactNode, UserTopUsersChart: React.ReactNode,ChatMessageTrendsChart:React.ReactNode,ChatMediaSharePie:React.ReactNode,ChatActiveHoursChart:React.ReactNode,ChatTopSendersTable:React.ReactNode }) {
    return (
        <>

            <div className="space-y-8 m-8">
                {/* User Analytics Section  */}
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

                {/* Chat Analytics Section  */}
                <div>
                    <h3 className="text-xl font-bold mb-2">Chat Message Trends</h3>
                    <Suspense>
                        {ChatMessageTrendsChart}
                    </Suspense>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Chat Media Share</h3>
                    <Suspense>
                        {ChatMediaSharePie}
                    </Suspense>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Chat Active Hours</h3>
                    <Suspense>
                        {ChatActiveHoursChart}
                    </Suspense>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Top Message Senders</h3>
                    <Suspense>
                        {ChatTopSendersTable}
                    </Suspense>
                </div>
            </div>
        </>
    )

}