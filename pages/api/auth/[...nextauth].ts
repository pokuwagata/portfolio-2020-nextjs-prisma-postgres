import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ log: ["query", "info", "warn"] });
  }
  prisma = global.prisma;
}
const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
};
export default (req, res) => NextAuth(req, res, options);
