import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function toWatchSeeder() {
    await prisma.toWatch.createMany({
        data: [
            {
                userId: '8cf3b733-a75e-4b39-a4f1-41b2db6c5658',
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464'
            },
            {
                userId: '8cf3b733-a75e-4b39-a4f1-41b2db6c5658',
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679'
            },
            {
                userId: '8cf3b733-a75e-4b39-a4f1-41b2db6c5658',
                movieId: "ba474397-5599-4333-bf75-4b720b3278ba"
            }
        ]
    });
}

export default toWatchSeeder;