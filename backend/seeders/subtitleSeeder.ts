import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function subtitleSeeder() {
    await prisma.subtitle.createMany({
        data: [
            {
                startSecond: 1,
                endSecond: 3,
                text: 'Hidden beneath the vast canopy',
                language: 'Angielski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 1,
                endSecond: 3,
                text: "Ukryty pod ogromnym baldachimem",
                language: 'Polski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 4,
                endSecond: 6,
                text: 'is a lost world of the ancient Maya',
                language: 'Angielski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 4,
                endSecond: 6,
                text: "znajduje się zaginiony świat starożytnych Majów",
                language: 'Polski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 7,
                endSecond: 9,
                text: "nearly 2 million of square miles of lush green",
                language: 'Angielski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 7,
                endSecond: 9,
                text: "ponad 5 milionów kilometrów kwadratowych bujnej zieleni",
                language: 'Polski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 10,
                endSecond: 12,
                text: "hides centuries old cities",
                language: 'Angielski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 10,
                endSecond: 12,
                text: "kryje miasta sprzed wieków",
                language: 'Polski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 12,
                endSecond: 14,
                text: "riddled with mysteries",
                language: 'Angielski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 12,
                endSecond: 14,
                text: "przepełnione tajemnicami",
                language: 'Polski',
                episodeId: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef"
            },
            {
                startSecond: 10,
                endSecond: 13,
                text: 'We live in a world where objects have permanents',
                language: 'Angielski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 20,
                endSecond: 22,
                text: 'is revealing that this is',
                language: 'Angielski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 20,
                endSecond: 22,
                text: "pokazuje nam, że nie tak",
                language: 'Polski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 22,
                endSecond: 24,
                text: 'not how the universe works',
                language: 'Angielski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 22,
                endSecond: 24,
                text: "działa wszechświat",
                language: 'Polski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 24,
                endSecond: 27,
                text: "at the smallest scale of atoms and tiny particles",
                language: 'Angielski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 24,
                endSecond: 27,
                text: "w najmniejszej skali atomów i mikroskopijnych cząstek",
                language: 'Polski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 10,
                endSecond: 13,
                text: "Żyjemy w świecie, w którym przedmioty mają trwałe elementy",
                language: 'Polski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 15,
                endSecond: 18,
                text: "And we see cause, then effect",
                language: 'Angielski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 15,
                endSecond: 18,
                text: "Więc widzimy przyczynę, potem skutek",
                language: 'Polski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 18,
                endSecond: 20,
                text: "But a startling phenomenon",
                language: 'Angielski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            },
            {
                startSecond: 18,
                endSecond: 20,
                text: "Ale zaskakujący fenomen",
                language: 'Polski',
                movieId: "00c97d28-8219-4fcd-af50-9045785259fc"
            }
        ]
    });
}

export default subtitleSeeder;