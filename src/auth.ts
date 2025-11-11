import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@/src/generated/prisma";

export const prisma=new PrismaClient();

//export functions generated for us based on the NextAuth function
export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Email and password required");

        const email=credentials.email as string
const password=credentials.password as string
        const user = await prisma.user.findUnique({
          where:  {email},
        });
        if (!user || !user.password)
          throw new Error("User not found or missing password");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return user;
      },
        }),
    ],
    pages:{
      signIn:"/login"
    },
  events: {
    async signIn({ user }) {
      try {
        if (!user?.id) return; 
        await prisma.userActivity.create({
          data: {
            userId: user.id as string,
            action: "login",
          },
        });
      } catch (err) {
        console.error("Error logging user login:", err);
      }
    },
  },
      session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
})