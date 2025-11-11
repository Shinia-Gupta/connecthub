export default function DashboardLayout({ children, chatAnalytics, userAnalytics }: { children: React.ReactNode, chatAnalytics: React.ReactNode, userAnalytics: React.ReactNode }) {

    return (
        <>
            {userAnalytics}
            {chatAnalytics}
        </>
    )

}