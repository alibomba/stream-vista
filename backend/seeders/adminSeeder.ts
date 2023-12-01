import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function adminSeeder() {
    await prisma.admin.create({
        data: {
            login: 'admin',
            password: '$2b$10$nHEy5SeZiWvdl.IVTmHYW.uGkuUbqhMiyC7KJ1zZP5Fn45pPUyZO6'
        }
    });
}

export default adminSeeder;