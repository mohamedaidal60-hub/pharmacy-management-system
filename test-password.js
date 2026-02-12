const bcrypt = require('bcryptjs');

async function testPassword() {
    const password = 'admin123';
    const hash = '$2b$10$M4gQT4d79pxDMQC9X4fJh.CL7UhN9Z8ebvE5nLz32AfY8/pzuAYBu';

    console.log('Testing password:', password);
    console.log('Against hash:', hash);

    const result = await bcrypt.compare(password, hash);
    console.log('Match result:', result);

    // Test avec d'autres variations
    const variations = ['Admin123', 'ADMIN123', 'admin 123', 'admin123 '];
    for (const variant of variations) {
        const match = await bcrypt.compare(variant, hash);
        console.log(`"${variant}" matches:`, match);
    }
}

testPassword();
