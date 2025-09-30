import { authOptions } from "@/src/app/_lib/auth";
import NextAuth from "next-auth";

/**
 * Rota API para autenticação com NextAuth (App Router)
 * Apenas exporta as funções HTTP que o App Router espera
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
