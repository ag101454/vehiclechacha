import jwt from 'jsonwebtoken';

// Simple admin credentials (change these!)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'vehiclechacha2024';

const JWT_SECRET = process.env.JWT_SECRET || 'vehiclechacha-secret-key-2024';

export function verifyAdmin(username, password) {
  console.log('Attempting login with:', { username, password });
  console.log('Expected:', { ADMIN_USERNAME, ADMIN_PASSWORD });
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    console.log('Login successful!');
    return true;
  }
  
  console.log('Login failed!');
  return false;
}

export function createAdminToken(username) {
  return jwt.sign(
    { 
      username,
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
    },
    JWT_SECRET
  );
}

export function verifyAdminToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

export function getAdminFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}