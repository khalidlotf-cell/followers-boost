import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.argv[2] || "admin@followers-boost.com";
  const password = process.argv[3] || "Admin1234!";
  const name = process.argv[4] || "Admin";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN", password: await bcrypt.hash(password, 12) },
    });
    console.log(`✓ Compte mis à jour en ADMIN : ${email}`);
  } else {
    await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 12),
        role: "ADMIN",
        balance: 0,
      },
    });
    console.log(`✓ Compte admin créé : ${email} / ${password}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
