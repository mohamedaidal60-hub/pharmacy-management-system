import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
    providers: [
        // Credentials Provider (ADMIN UNIQUEMENT)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("🔐 Tentative de connexion pour:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("❌ Email ou mot de passe manquant");
                    return null
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        include: { store: true }
                    })

                    console.log("👤 Utilisateur trouvé:", user ? "OUI" : "NON");

                    if (!user) {
                        console.log("❌ Aucun utilisateur avec cet email");
                        return null
                    }

                    console.log("🔑 Hash stocké:", user.password.substring(0, 20) + "...");
                    console.log("🔑 Mot de passe fourni:", credentials.password);

                    const isPasswordValid = await compare(credentials.password, user.password)

                    console.log("✅ Mot de passe valide:", isPasswordValid);

                    if (!isPasswordValid) {
                        console.log("❌ Mot de passe incorrect");
                        return null
                    }

                    console.log("🔒 Compte actif:", user.isActive);

                    if (!user.isActive) {
                        console.log("❌ Compte désactivé");
                        throw new Error("Compte désactivé. Contactez l'administrateur.")
                    }

                    console.log("✅ Connexion réussie pour:", user.email);

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        storeId: user.storeId ?? undefined,
                        storeName: user.store?.name ?? undefined
                    }
                } catch (error) {
                    console.error("💥 Erreur lors de l'authentification:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Pour l'instant, on accepte toutes les connexions par credentials
            return true;
        },

        async jwt({ token, user, account }) {
            // Première connexion
            if (user) {
                token.role = user.role
                token.storeId = user.storeId
                token.storeName = user.storeName
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
