import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "osvaldo.neto@gmail.com";

  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Usuário já existe:", existingUser.email);
    return;
  }

  const passwordHash = await bcrypt.hash("osvaldo", 10);

  const user = await prisma.user.create({
    data: {
      email,
      name: "osvaldo",
      password: passwordHash,
    },
  });

  console.log("Usuário criado:", user.email);
}

main()
  .catch((e) => {
    console.error("Erro ao rodar seed:", e);
  })
  .finally(() => prisma.$disconnect());
