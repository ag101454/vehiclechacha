import { PrismaClient } from '@prisma/client';
import { Client } from 'pg';

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

let pgClient = null;

export async function ensureConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.log('Prisma connection lost, waking up database...');
    
    // Try to wake up with pg
    try {
      if (!pgClient) {
        pgClient = new Client({
          connectionString: process.env.DATABASE_URL,
          connectionTimeoutMillis: 10000,
        });
      }
      
      try {
        await pgClient.connect();
      } catch {
        // Already connected
      }
      
      await pgClient.query('SELECT 1');
      console.log('✅ Database woken up via pg');
    } catch (pgError) {
      console.log('pg wake-up failed:', pgError.message);
    }
    
    // Now reconnect Prisma
    try {
      await prisma.$disconnect();
    } catch {
      // Ignore
    }
    
    try {
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Prisma reconnected');
      return true;
    } catch (reconnectError) {
      console.error('Prisma reconnect failed:', reconnectError.message);
      return false;
    }
  }
}

// Keep-alive every 15 seconds in dev
if (process.env.NODE_ENV !== 'production') {
  setInterval(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      await ensureConnection();
    }
  }, 15000);
}

export { prisma };