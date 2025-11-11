import { prisma } from "@/src/auth";
import { NextResponse } from "next/server";

// Utility to calculate date offsets easily
const getDateRange = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000);

export async function GET() {
  try {
    // --- TOTAL USERS ---
    const totalUsers = await prisma.user.count();

    // --- DAILY / WEEKLY / MONTHLY NEW USERS ---
    const [dailyNewUsers, weeklyNewUsers, monthlyNewUsers] = await Promise.all([
      prisma.user.count({ where: { createdAt: { gte: getDateRange(1) } } }),
      prisma.user.count({ where: { createdAt: { gte: getDateRange(7) } } }),
      prisma.user.count({ where: { createdAt: { gte: getDateRange(30) } } }),
    ]);

    // --- DAILY ACTIVE USERS (DAU) ---
    const dailyActive = await prisma.userActivity.findMany({
      where: { createdAt: { gte: getDateRange(1) } },
      distinct: ["userId"],
      select: { userId: true },
    });

    // --- MONTHLY ACTIVE USERS (MAU) ---
    const monthlyActive = await prisma.userActivity.findMany({
      where: { createdAt: { gte: getDateRange(30) } },
      distinct: ["userId"],
      select: { userId: true },
    });

    const DAU = dailyActive.length;
    const MAU = monthlyActive.length;
    const DAU_MAU_Ratio = MAU > 0 ? (DAU / MAU).toFixed(2) : "0";

    // --- TOP ACTIVE USERS (by activity count) ---
    const topActiveUsers = await prisma.userActivity.groupBy({
      by: ["userId"],
      _count: { userId: true },
      orderBy: { _count: { userId: "desc" } },
      take: 5,
    });

    // Join with actual user info for display
    const topUsersWithDetails = await Promise.all(
      topActiveUsers.map(async (u) => {
        const user = await prisma.user.findUnique({
          where: { id: u.userId },
          select: { name: true, email: true },
        });
        return { ...user, activityCount: u._count.userId };
      })
    );

    // --- FINAL RESPONSE ---
    return NextResponse.json({
      totalUsers,
      dailyNewUsers,
      weeklyNewUsers,
      monthlyNewUsers,
      DAU,
      MAU,
      DAU_MAU_Ratio,
      topActiveUsers: topUsersWithDetails,
    });
  } catch (err: any) {
    console.error("Analytics Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
