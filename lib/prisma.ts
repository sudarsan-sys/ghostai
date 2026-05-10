import { PrismaClient } from "@/app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL || "";
const isAccelerate = connectionString.startsWith("prisma+postgres://");

const createPrismaClient = () => {
  if (isAccelerate) {
    return new PrismaClient({ accelerateUrl: connectionString });
  }

  // Use direct PG adapter for standard database URLs
  // Provide a fallback connection string for the build environment if missing
  const pool = new pg.Pool({ 
    connectionString: connectionString || "postgres://localhost:5432/unused" 
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
