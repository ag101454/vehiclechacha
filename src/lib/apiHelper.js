import { prisma, ensureConnection } from '@/lib/db';

export async function withDatabase(callback) {
  try {
    await ensureConnection();
    return await callback(prisma);
  } catch (error) {
    console.error('Database error:', error.message);
    throw error;
  }
}