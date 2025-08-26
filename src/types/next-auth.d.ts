import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    phone?: string
    firstName?: string
    lastName?: string
    role: string
    status: string
  }

  interface Session {
    user: {
      id: string
      email: string
      phone?: string
      firstName?: string
      lastName?: string
      role: string
      status: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    status: string
    provider?: string
  }
}