import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Exportamos los handlers GET y POST para App Router
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
