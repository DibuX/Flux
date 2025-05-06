import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"
import { executeQuery } from "@/lib/db/mysql"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const users = await executeQuery(
            `SELECT id_usuario, nombre, apellido, email, contraseña, fecha_registro, ultimo_login, activo, emailVerified
             FROM usuarios
             WHERE email = ?`,
            [credentials.email],
          )

          if (users.length === 0) {
            return null
          }

          const userFromDB = users[0] as any

          if (!userFromDB.activo) {
            throw new Error("Esta cuenta ha sido desactivada")
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, userFromDB.contraseña)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: userFromDB.id_usuario.toString(),
            name: `${userFromDB.nombre} ${userFromDB.apellido}`,
            email: userFromDB.email,
            emailVerified: userFromDB.emailVerified,
          }
        } catch (error) {
          console.error("Error en autenticación:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  jwt: {
    // Use secure encryption for JWT tokens
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.emailVerified = (user as any).emailVerified
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email
        session.user.name = token.name as string
        session.user.emailVerified = (token as any).emailVerified
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
