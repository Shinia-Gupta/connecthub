import { PrismaClient } from "../src/generated/prisma/index.js";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1️⃣ Delete old data (optional, for clean re-runs)
  await prisma.message.deleteMany();
  await prisma.userActivity.deleteMany();
  await prisma.user.deleteMany();

  // 2️⃣ Create fake users
  const users = [];
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        image: faker.image.avatar(),
      },
    });
    users.push(user);
  }

  console.log(`✅ Created ${users.length} users`);

  // 3️⃣ Create fake activities
  const actions = ["login", "logout", "message_sent", "message_received"];
  const activities = [];
  for (const user of users) {
    const numActivities = faker.number.int({ min: 3, max: 10 });
    for (let i = 0; i < numActivities; i++) {
      activities.push({
        userId: user.id,
        action: faker.helpers.arrayElement(actions),
        date: faker.date.recent({ days: 30 }),
      });
    }
  }

  await prisma.userActivity.createMany({ data: activities });
  console.log(`✅ Inserted ${activities.length} user activities`);

  // 4️⃣ Create fake messages
  const messages = [];
  for (let i = 0; i < 200; i++) {
    const sender = faker.helpers.arrayElement(users);
    const receiver = faker.helpers.arrayElement(users.filter(u => u.id !== sender.id));

    messages.push({
      senderId: sender.id,
      receiverId: receiver.id,
      content: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(["text", "image", "video"]),
      createdAt: faker.date.recent({ days: 15 }),
    });
  }

  await prisma.message.createMany({ data: messages });
  console.log(`✅ Inserted ${messages.length} messages`);

  console.log("🌱 Seed completed successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
