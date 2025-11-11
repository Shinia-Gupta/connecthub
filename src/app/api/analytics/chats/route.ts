import { prisma } from "@/src/auth";
import { NextResponse } from "next/server";

const getDateRange = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000);

export async function GET() {
  try {
    // --- TOTAL MESSAGES ---
    const totalMessages = await prisma.message.count();

    // --- DAILY / WEEKLY / MONTHLY ---
    const [dailyMessages, weeklyMessages, monthlyMessages] = await Promise.all([
      prisma.message.count({ where: { createdAt: { gte: getDateRange(1) } } }),
      prisma.message.count({ where: { createdAt: { gte: getDateRange(7) } } }),
      prisma.message.count({ where: { createdAt: { gte: getDateRange(30) } } }),
    ]);

    // --- AVERAGE MESSAGES PER USER ---
    const totalUsers = await prisma.user.count();
    const avgMessagesPerUser = totalUsers > 0 ? totalMessages / totalUsers : 0;

    // --- MEDIA SHARED COUNT (by type) ---
    const mediaStats = await prisma.message.groupBy({
      by: ["type"],
      _count: { _all: true },
    });

    const mediaSharedCount = mediaStats.reduce((acc, item) => {
      if (item.type !== "text") acc[item.type] = item._count._all;
      return acc;
    }, {} as Record<string, number>);

    // --- MOST ACTIVE HOURS ---
    const messages = await prisma.message.findMany({
      select: { createdAt: true },
    });

    const hourCounts = new Array(24).fill(0);
    messages.forEach((msg) => {
      const hour = new Date(msg.createdAt).getHours();
      hourCounts[hour]++;
    });

    // --- TOP USERS BY MESSAGE COUNT ---
    const topUsers = await prisma.message.groupBy({
      by: ["senderId"],
      _count: { senderId: true },
      orderBy: { _count: { senderId: "desc" } },
      take: 5,
    });

    const topUsersWithDetails = await Promise.all(
      topUsers.map(async (u) => {
        const user = await prisma.user.findUnique({
          where: { id: u.senderId },
          select: { name: true, email: true },
        });
        return { ...user, messageCount: u._count.senderId };
      })
    );

    // --- FINAL RESPONSE ---
    return NextResponse.json({
      totalMessages,
      dailyMessages,
      weeklyMessages,
      monthlyMessages,
      avgMessagesPerUser,
      mediaSharedCount,
      mostActiveHours: hourCounts,
      topUsers: topUsersWithDetails,
    });
  } catch (err) {
    console.error("Chat Analytics Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch chat analytics" },
      { status: 500 }
    );
  }
}
