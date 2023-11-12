import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function userSeeder() {
    await prisma.user.create({
        data: {
            email: 'ali.gamer@op.pl',
            password: '$2b$10$nHEy5SeZiWvdl.IVTmHYW.uGkuUbqhMiyC7KJ1zZP5Fn45pPUyZO6',
            oAuth: false,
            preferencedCategories: ['Science Fiction', 'Thriller', 'Psychologiczne', 'Akcja', 'Postapokaliptyczne']
        }
    })
}

export default userSeeder;