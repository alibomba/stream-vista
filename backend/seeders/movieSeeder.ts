import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function movieSeeder() {
    await prisma.movie.createMany({
        data: [
            {
                id: "00c97d28-8219-4fcd-af50-9045785259fc",
                title: 'Paradoks Kwantowy',
                description: 'Wciągająca podróż przez równoległe wszechświaty, gdzie tajemnicze zjawiska kwantowe prowadzą bohaterów do odkryć, które zmieniają ich postrzeganie rzeczywistości. Czy nauka może przekroczyć granice ludzkiego rozumienia?',
                actors: ['jan kowalski', 'anna nowak', 'michał wiśniewski'],
                creators: ['marta nowak'],
                categories: ['Science Fiction', 'Thriller'],
                minutes: 120,
                year: 2022,
                thumbnailUrl: 'quantum-paradox.jpg',
                trailerUrl: 'quantum-paradox-trailer.mp4',
                sourceUrl: 'quantum-paradox.mp4'
            },
            {
                id: "965049aa-ffed-4402-9365-dc86d30da408",
                title: 'Północna Złodziejka',
                description: 'Wielowątkowa historia grupy utalentowanych złodziei, których plany na ostateczny nocny skok stają się coraz bardziej skomplikowane w miarę, jak ich lojalności i relacje zostają wystawione na próbę. Czy kradzież może być jednocześnie spektakularna i moralnie złożona?',
                warnings: ['18+', 'Przemoc'],
                actors: ['karolina kowalczyk', 'piotr nowak', 'marta zalewska'],
                creators: ['damian kowalski', 'katarzyna wiśniewska'],
                categories: ['Akcja', 'Kryminał'],
                minutes: 110,
                year: 2021,
                thumbnailUrl: 'polnocna-zlodziejka.jpg',
                trailerUrl: 'polnocna-zlodziejka.mp4',
                sourceUrl: 'polnocna-zlodziejka.mp4'
            },
            {
                title: 'Zagubieni w Czasie',
                description: 'Romantyczna opowieść o miłości podróżującej w czasie, gdzie bohaterowie muszą przekraczać granice przestrzeni i czasu, aby znaleźć siebie nawzajem. Czy uczucie może przetrwać próbę czasu?',
                warnings: ['18+', 'Seks'],
                actors: ['małgorzata nowak', 'krzysztof kowal', 'janusz michalski'],
                creators: ['szymon dąbrowski', 'joanna lewandowska'],
                categories: ['Romans', 'Science Fiction'],
                minutes: 130,
                year: 2019,
                thumbnailUrl: 'zagubieni-w-czasie.jpg',
                trailerUrl: 'zagubieni-w-czasie.mp4',
                sourceUrl: 'zagubieni-w-czasie.mp4'
            },
            {
                title: 'Wieczna Harmonia',
                description: 'W epickiej przygodzie fantasy, mityczne istoty walczą o los zaklętego królestwa, a bohaterowie muszą stawić czoła niebezpieczeństwom, by przywrócić równowagę. Czy magia i odwaga wystarczą, aby uratować świat?',
                actors: ['mateusz nowak', 'alicja kowalska'],
                creators: ['bartosz wójcik'],
                categories: ['Fantasy', 'Przygodowe'],
                minutes: 150,
                year: 2020,
                thumbnailUrl: 'wieczna-harmonia.jpg',
                trailerUrl: 'wieczna-harmonia.mp4',
                sourceUrl: 'wieczna-harmonia.mp4'
            },
            {
                id: 'ba474397-5599-4333-bf75-4b720b3278ba',
                title: 'Miasto Cieni',
                description: 'Wciągający thriller kryminalny, który przenosi widza do mrocznego podziemia rozległej metropolii, gdzie bohaterowie muszą rozwiązać skomplikowaną intrygę, aby ocalić to, co najważniejsze. Czy sprawiedliwość może zwyciężyć w mieście cieni?',
                warnings: ['Przemoc', 'Narkotyki'],
                actors: ["adam górczyński", "ewa nowak", "robert kowal"],
                creators: ['agnieszka kamińska', 'piotr kowalczyk'],
                categories: ['Kryminał', 'Dramat'],
                minutes: 125,
                year: 2018,
                thumbnailUrl: 'miasto-cieni.jpg',
                trailerUrl: 'miasto-cieni.mp4',
                sourceUrl: 'miasto-cieni.mp4'
            },
            {
                title: 'Sonata Gwiezdnej Nocy',
                description: 'Ujmująca opowieść o aspirującym muzycy i magicznej podróży w poszukiwaniu prawdziwego powołania. Bohaterowie odkrywają, że muzyka może być kluczem do rozwiązania tajemniczej zagadki. Czy melodia gwiazd może zmienić przeznaczenie?',
                actors: ["agnieszka kowalska", "piotr górny", "marek wolski"],
                creators: ['natalia zielińska'],
                categories: ["Dramat", "Muzyczne"],
                minutes: 135,
                year: 2017,
                thumbnailUrl: 'sonata-gwiezdnej-nocy.jpg',
                trailerUrl: 'sonata-gwiezdnej-nocy.mp4',
                sourceUrl: 'sonata-gwiezdnej-nocy.mp4'
            },
            {
                title: 'Zapomniana Melodia',
                description: 'Tajemnicza opowieść o zaginionej melodii, która zmienia życie bohaterów. W poszukiwaniu dźwięku, który znalazł się w zapomnieniu, bohaterowie odkrywają prawdy o sobie i świecie. Czy melodia może być kluczem do odnalezienia utraconego piękna?',
                actors: ["karol nowak", "zofia kowalska", "jan kowalczyk"],
                creators: ['michał szymański'],
                categories: ["Dramat", "Romans"],
                minutes: 120,
                year: 2015,
                thumbnailUrl: 'zapomniana-melodia.jpg',
                trailerUrl: 'zapomniana-melodia.mp4',
                sourceUrl: 'zapomniana-melodia.mp4'
            },
            {
                title: 'Ostatni Bastion',
                description: 'Dystopijna wizja przyszłości, gdzie ludzkość zmaga się z ostatecznym wyborem: przeżyć w brutalnym świecie czy poszukać ocalenia w nieznanych krainach. Czy nadzieja może przetrwać w świecie po apokalipsie?',
                actors: ["marek nowak", "zuzanna kowalska", "aleksander wiśniewski"],
                creators: ['kinga woźniak', 'łukasz kozłowski'],
                categories: ["Science Fiction", "Dramat", 'Postapokaliptyczne'],
                minutes: 140,
                year: 2023,
                thumbnailUrl: 'ostatni-bastion.jpg',
                trailerUrl: 'ostatni-bastion.mp4',
                sourceUrl: 'ostatni-bastion.mp4'
            },
            {
                title: 'Labirynt Iluzji',
                description: 'Psychologiczny thriller, w którym bohaterowie znajdują się w labiryncie złudzeń, a granice między rzeczywistością a fantazją zaczynają się rozmazywać. Czy umysł może być największym przeciwnikiem?',
                actors: ["weronika kowalczyk", "paweł nowak", "magdalena zalewska"],
                creators: ['justyna jankowska', 'adrian mazur'],
                categories: ["Thriller", "Psychologiczne"],
                minutes: 125,
                year: 2021,
                thumbnailUrl: 'labirynt-iluzji.jpg',
                trailerUrl: 'labirynt-iluzji.mp4',
                sourceUrl: 'labirynt-iluzji.mp4'
            },
            {
                title: 'Skazani na Wolność',
                description: 'Historia więźniów, którzy próbują odnaleźć wolność w najbardziej nieprzychylnych warunkach. Przyjaźń, poświęcenie i walka o godność stają się kluczowymi elementami ich drogi ku oswobodzeniu. Czy nawet w więziennej celi można znaleźć wolność?',
                actors: ["kamil górczyński", "natalia nowak", "tomasz kowal"],
                creators: ['ewa wojciechowska'],
                categories: ["Dramat", "Akcja"],
                minutes: 130,
                year: 2019,
                thumbnailUrl: 'skazani-na-wolnosc.jpg',
                trailerUrl: 'skazani-na-wolnosc.mp4',
                sourceUrl: 'skazani-na-wolnosc.mp4'
            },
            {
                title: 'Szepty Nocy',
                description: 'Mroczny horror, w którym bohaterowie muszą stawić czoła swoim najgłębszym lękom, gdy w ich życiu zaczynają pojawiać się tajemnicze zjawiska. Czy strach może być silniejszy niż rzeczywistość?',
                warnings: ['16+', 'Przekleństwa', 'Straszne sceny'],
                actors: ["julia kowalska", "marcin nowak", "wiktoria zalewska"],
                creators: ['rafał krawczyk'],
                categories: ["Horror", 'Psychologiczne', 'Paranormalne'],
                minutes: 110,
                year: 2020,
                thumbnailUrl: 'szepty-nocy.jpg',
                trailerUrl: 'szepty-nocy.mp4',
                sourceUrl: 'szepty-nocy.mp4'
            },
            {
                title: 'Złodziej Czasu',
                description: 'Fantastyczna podróż w czasie, gdzie bohaterowie muszą powstrzymać tajemniczego złodzieja, który chce zakrzywiać bieg historii. Czy czas można złapać za ogon?',
                actors: ["adam kowalski", "ewa górczyńska", "robert nowak"],
                creators: ['monika kaczmarek', 'mateusz piotrowski'],
                categories: ["Science Fiction", "Przygodowe"],
                minutes: 135,
                year: 2018,
                thumbnailUrl: 'zlodziej-czasu.jpg',
                trailerUrl: 'zlodziej-czasu.mp4',
                sourceUrl: 'zlodziej-czasu.mp4'
            },
            {
                title: 'Ścieżki Losu',
                description: 'Edukacyjny dramat, który opowiada historię młodych ludzi z różnych środowisk, dążących do osiągnięcia swoich marzeń pomimo przeciwności losu. Czy edukacja może być kluczem do pokonania barier społecznych?',
                actors: ["karina nowak", "bartosz kowalski", "alicja wiśniewska"],
                creators: ['patryk grabowski'],
                categories: ['Dramat', 'Naukowe i Edukacyjne'],
                minutes: 120,
                year: 2017,
                thumbnailUrl: 'sciezki-losu.jpg',
                trailerUrl: 'sciezki-losu.mp4',
                sourceUrl: 'sciezki-losu.mp4'
            },
            {
                title: 'Maskarada Miłości',
                description: 'Romantyczna komedia o splecionych losach kilku par, których życie miłosne staje się skomplikowaną maskaradą. Czy miłość potrafi przezwyciężyć wszelkie trudności?',
                actors: ["mikołaj kowalczyk", "julia nowak", "katarzyna zalewska"],
                creators: ['magdalena nowakowska', 'piotr kowalczyk'],
                categories: ["Romans", "Komedia", 'Komedia Romantyczna'],
                minutes: 110,
                year: 2016,
                thumbnailUrl: 'maskarada-milosci.jpg',
                trailerUrl: 'maskarada-milosci.mp4',
                sourceUrl: 'maskarada-milosci.mp4'
            },
            {
                title: 'Intryga Korporacyjna',
                description: 'Thriller korporacyjny o mrocznych tajemnicach wielkiej korporacji, które wychodzą na jaw, gdy ambitny pracownik zaczyna śledzić ścieżki finansowe. Czy sprawiedliwość może przetrwać w korporacyjnym labiryncie?',
                warnings: ['12+', 'Narkotyki', 'Przestępstwo'],
                actors: ["krzysztof kowalski", "anna nowak", "piotr wiśniewski"],
                creators: ['przemysław pawlak', 'szymon dąbrowski'],
                categories: ["Thriller", "Dramat"],
                minutes: 115,
                year: 2022,
                thumbnailUrl: 'intryga-korporacyjna.jpg',
                trailerUrl: 'intryga-korporacyjna.mp4',
                sourceUrl: 'intryga-korporacyjna.mp4'
            },
            {
                title: 'Duchy Przeszłości',
                description: 'Poruszający dramat o ludzkich losach splątanych w zawiłej historii. Bolesne tajemnice wychodzą na jaw, kiedy bohaterowie muszą zmierzyć się z duchami przeszłości. Czy pojednanie może przynieść ukojenie?',
                actors: ["magdalena kowalczyk", "marcin nowak", "karolina wiśniewska"],
                creators: ['magdalena nowakowska', 'przemysław pawlak'],
                categories: ['Dramat', 'Psychologiczne', 'Paranormalne'],
                minutes: 120,
                year: 2021,
                thumbnailUrl: 'duchy-przeszlosci.jpg',
                trailerUrl: 'duchy-przeszlosci.mp4',
                sourceUrl: 'duchy-przeszlosci.mp4'
            },
            {
                title: 'Słodki Przypadek',
                description: 'Romantyczna komedia o przypadkowych spotkaniach i miłosnych zawirowaniach. Bohaterowie z różnych światów łączą się w niezwykłych okolicznościach. Czy los może naprawdę kierować naszymi uczuciami?',
                warnings: ['16+', 'Seks'],
                actors: ["adam kowalski", "julia nowak", "michał wiśniewski"],
                creators: ['karolina michalska', 'radosław nowicki'],
                categories: ["Romans", "Komedia", 'Komedia Romantyczna'],
                minutes: 110,
                year: 2020,
                thumbnailUrl: 'slodki-przypadek.jpg',
                trailerUrl: 'slodki-przypadek.mp4',
                sourceUrl: 'slodki-przypadek.mp4'
            },
            {
                title: 'Ostatnia Granica',
                description: 'Epidemiczny thriller o wyścigu z czasem, aby znaleźć lekarstwo na śmiertelną chorobę, zanim dotrze do ostatniej granicy ludzkości. Czy nadzieja może przetrwać w obliczu zagłady?',
                actors: ["karolina kowal", "paweł nowak", "alicja wiśniewska"],
                creators: ['michał szymański', 'julia adamczyk'],
                categories: ["Thriller", "Science Fiction"],
                minutes: 130,
                year: 2019,
                thumbnailUrl: 'ostatnia-granica.jpg',
                trailerUrl: 'ostatnia-granica.mp4',
                sourceUrl: 'ostatnia-granica.mp4'
            },
            {
                title: 'Złoty Szlak',
                description: 'Przygodowy film akcji, w którym grupa poszukiwaczy skarbów wyrusza w niebezpieczną podróż śladem zaginionego złota.',
                actors: ["michał kowalski", "zuzanna nowak", "aleksander wiśniewski"],
                creators: ['dawid duda', 'sandra zając'],
                categories: ["Akcja", "Przygodowe"],
                minutes: 125,
                year: 2018,
                thumbnailUrl: 'zloty-szlak.jpg',
                trailerUrl: 'zloty-szlak.mp4',
                sourceUrl: 'zloty-szlak.mp4'
            }
        ]
    })
}

export default movieSeeder;