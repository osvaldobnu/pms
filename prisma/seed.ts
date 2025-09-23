import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("osvaldo", 10);
  const user = await prisma.user.create({
    data: {
      email: "osvaldo.neto@gmail.com",
      name: "osvaldo",
      password: passwordHash,
    },
  });
  console.log("Usuário criado:", user);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
