import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function userSeeder() {
    await prisma.user.create({
        data: {
            id: '8cf3b733-a75e-4b39-a4f1-41b2db6c5658',
            email: 'ali.gamer@op.pl',
            password: '$2b$10$nHEy5SeZiWvdl.IVTmHYW.uGkuUbqhMiyC7KJ1zZP5Fn45pPUyZO6',
            oAuth: false,
            preferencedCategories: ['Science Fiction', 'Thriller', 'Psychologiczne', 'Akcja', 'Postapokaliptyczne'],
            stripeCustomerId: 'cus_P00cSKnz9I7qrx'
        }
    })
}

export default userSeeder;