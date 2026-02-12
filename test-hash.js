const bcrypt = require('bcryptjs');

const password = 'admin123';
bcrypt.hash(password, 10, function (err, hash) {
    if (err) console.error(err);
    console.log('Hash for admin123:', hash);

    bcrypt.compare(password, hash, function (err, res) {
        console.log('Verification check:', res);
    });
});
