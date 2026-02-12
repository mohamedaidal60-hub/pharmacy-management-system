import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
    providers: [
        // Google OAuth Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // Credentials Provider (ADMIN UNIQUEMENT)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { store: true }
                })

                if (!user) {
                    return null
                }

                const isPasswordValid = await compare(credentials.password, user.password)

                if (!isPasswordValid) {
                    return null
                }

                if (!user.isActive) {
                    throw new Error("Compte désactivé. Contactez l'administrateur.")
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    storeId: user.storeId ?? undefined,
                    storeName: user.store?.name ?? undefined
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Si connexion via Google OAuth
            if (account?.provider === "google" && user.email) {
                // Vérifier si l'utilisateur existe déjà dans la base
                let dbUser = await prisma.user.findUnique({
                    where: { email: user.email }
                });

                // Si l'utilisateur n'existe pas, le créer avec rôle ASSISTANT par défaut
                if (!dbUser) {
                    dbUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name || "Utilisateur Google",
                            password: "", // Pas de mot de passe pour OAuth
                            role: "ASSISTANT", // Rôle par défaut
                            isActive: true,
                            storeId: "store_001" // Pharmacie par défaut
                        }
                    });
                }

                // Vérifier si le compte est actif
                if (!dbUser.isActive) {
                    return false; // Bloquer la connexion si désactivé
                }

                // Enrichir l'objet user avec les infos de la DB
                user.id = dbUser.id;
                user.role = dbUser.role;
                user.storeId = dbUser.storeId ?? undefined;
            }

            return true;
        },

        async jwt({ token, user, account }) {
            // Première connexion
            if (user) {
                token.role = user.role
                token.storeId = user.storeId
                token.storeName = user.storeName
            }

            // Si connexion Google, charger les infos depuis la DB
            if (account?.provider === "google" && token.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email },
                    include: { store: true }
                });

                if (dbUser) {
                    token.role = dbUser.role;
                    token.storeId = dbUser.storeId ?? undefined;
                    token.storeName = dbUser.store?.name ?? undefined;
                }
            }

            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!
                session.user.role = token.role as string
                session.user.storeId = token.storeId as string | undefined
                session.user.storeName = token.storeName as string | undefined
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
