const bcrypt = require('bcryptjs');

const password = 'vehiclechacha2024';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Password:', password);
  console.log('Hash:', hash);
  
  // Verify it works
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error('Verification error:', err);
      return;
    }
    console.log('Verification test:', result);
  });
});