import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function categorySeeder() {
    await prisma.category.createMany({
        data: [
            { name: 'Akcja' },
            { name: 'Przygodowe' },
            { name: 'Komedia' },
            { name: 'Dramat' },
            { name: 'Science Fiction' },
            { name: 'Fantasy' },
            { name: 'Kryminał' },
            { name: 'Thriller' },
            { name: 'Horror' },
            { name: 'Dokumentalne' },
            { name: 'Romans' },
            { name: 'Historyczne' },
            { name: 'Animacja' },
            { name: 'Naukowe i Edukacyjne' },
            { name: 'Muzyczne' },
            { name: 'Rodzinne' },
            { name: 'Polityczne' },
            { name: 'Kulinarne' },
            { name: 'Sportowe' },
            { name: 'Podróże' },
            { name: 'Bajki' },
            { name: 'Superbohaterowie' },
            { name: 'Komedia Romantyczna' },
            { name: 'Psychologiczne' },
            { name: 'Przyrodnicze' },
            { name: 'Postapokaliptyczne' },
            { name: 'Paranormalne' },
            { name: 'Obyczajowe' }
        ]
    })
}

export default categorySeeder;