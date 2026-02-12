const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
})

async function testAuth() {
    try {
        console.log('🔍 Connexion à la base de données...');
        await prisma.$connect();
        console.log('✅ Connexion réussie!\n');

        console.log('🔍 Recherche de l\'utilisateur amperella@gmail.com...');
        const user = await prisma.user.findUnique({
            where: { email: 'amperella@gmail.com' },
            include: { store: true }
        });

        if (!user) {
            console.log('❌ Utilisateur NON trouvé dans la base de données!');
            console.log('\n📋 Liste de tous les utilisateurs:');
            const allUsers = await prisma.user.findMany();
            console.log(allUsers);
        } else {
            console.log('✅ Utilisateur trouvé!');
            console.log('📧 Email:', user.email);
            console.log('👤 Nom:', user.name);
            console.log('🔑 Role:', user.role);
            console.log('🔒 Actif:', user.isActive);
            console.log('🏪 Store:', user.storeId);
            console.log('🔐 Hash (début):', user.password.substring(0, 30) + '...');

            console.log('\n🧪 Test de comparaison du mot de passe...');
            const isValid = await bcrypt.compare('admin123', user.password);
            console.log('✅ Mot de passe "admin123" valide:', isValid);
        }

    } catch (error) {
        console.error('💥 Erreur:', error.message);
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

testAuth();
