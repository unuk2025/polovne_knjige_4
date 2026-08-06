// src/lib/prisma.ts

import { PrismaClient } from "../generisano/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
    adapter,
});

export default prisma;

