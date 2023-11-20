import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function trackSeeder() {
    await prisma.track.createMany({
        data: [
            {
                isMovie: true,
                userId: "8cf3b733-a75e-4b39-a4f1-41b2db6c5658",
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc",
                timestamp: 87
            },
            {
                isMovie: true,
                userId: "8cf3b733-a75e-4b39-a4f1-41b2db6c5658",
                movieId: "965049aa-ffed-4402-9365-dc86d30da408",
                timestamp: 55
            },
            {
                isMovie: false,
                userId: "8cf3b733-a75e-4b39-a4f1-41b2db6c5658",
                episodeId: "6b7bf480-9909-42f3-9f9d-8c5399279607",
                timestamp: 27
            },
            {
                isMovie: false,
                userId: "8cf3b733-a75e-4b39-a4f1-41b2db6c5658",
                episodeId: "10acf517-0d84-4f33-8f16-06e7d366940c",
                timestamp: 47
            },
            {
                isMovie: false,
                userId: "8cf3b733-a75e-4b39-a4f1-41b2db6c5658",
                episodeId: "5452f540-918b-4266-827a-e5bbf11e88e5",
                timestamp: 27
            },
            {
                isMovie: false,
                userId: "8cf3b733-a75e-4b39-a4f1-41b2db6c5658",
                episodeId: "bdf108a3-56b6-4824-9c7e-261db273ca74",
                timestamp: 47
            }
        ]
    });
}

export default trackSeeder;