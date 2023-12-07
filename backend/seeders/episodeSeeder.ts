import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function episodeSeeder() {
    await prisma.episode.createMany({
        data: [
            {
                id: "013ce5a0-3bd5-45ee-87b1-f03933a0f7ef",
                title: 'Tajemnicze Świątynie Majów',
                description: 'Bohaterowie wyruszają do dżungli w Ameryce Środkowej, aby odnaleźć zapomnianą świątynię Majów. W trakcie eksploracji odkrywają starożytne rytuały i tajemnice związane z kulturą Majów.',
                season: 1,
                episodeNumber: 1,
                minutes: 47,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Zaginione Miasto Atlantydy: Część 1',
                description: 'Grupa badaczy wyrusza na podwodną ekspedycję, aby odnaleźć ślady Atlantydy. Podczas nurkowania odkrywają podwodne ruiny i starożytne artefakty, ale tajemnice Atlantydy pozostają jeszcze nierozwikłane.',
                season: 1,
                episodeNumber: 2,
                minutes: 43,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Zaginione Miasto Atlantydy: Część 2',
                description: 'Badacze kontynuują swoje poszukiwania pod wodą, natykając się na starożytne mapy i inskrypcje sugerujące istnienie zaawansowanej cywilizacji Atlantydy.',
                season: 1,
                episodeNumber: 3,
                minutes: 43,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                id: '6b7bf480-9909-42f3-9f9d-8c5399279607',
                title: 'Ostatni Templariusze: Wstęp',
                description: 'W trzecim sezonie ekipa kieruje się do Europy, aby odnaleźć legendarny skarb templariuszy. Odcinek ten wprowadza widzów w historię templariuszy i ich tajemnicze praktyki.',
                season: 1,
                episodeNumber: 4,
                minutes: 44,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Ostatni Templariusze: Poszukiwania',
                description: 'Bohaterowie odkrywają starożytne mapy i tajemnicze wskazówki, które prowadzą ich do ukrytego miejsca, gdzie może być schowany skarb templariuszy.',
                season: 1,
                episodeNumber: 5,
                minutes: 45,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Zaginione Miasto Inków',
                description: 'Grupa kieruje się do gór Peru, aby odkryć starożytne miasto Inków. Eksplorując góry, natykają się na zaklęcia i praktyki religijne Inków.',
                season: 1,
                episodeNumber: 6,
                minutes: 40,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Odkrycie Tajemniczej Mapy',
                description: 'W finałowym odcinku sezonu badacze znajdują starożytne pergaminowe mapy, które mogą prowadzić do największego tajemniczego miejsca na świecie. Jednak ich odkrycia przyciągają uwagę innych poszukiwaczy przygód.',
                season: 1,
                episodeNumber: 7,
                minutes: 50,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Tajemnice Starożytnej Grecji',
                description: 'Ekipa kieruje się do Grecji, aby odkryć tajemnice starożytnej greckiej cywilizacji. Badacze stają twarzą w twarz z mitami i legendami, próbując odnaleźć ukryte skarby.',
                season: 2,
                episodeNumber: 1,
                minutes: 38,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Wyprawa do Egipskich Piramid',
                description: 'Badacze podążają za śladami starożytnych Egipcjan, wchodząc do wnętrza piramid w poszukiwaniu ukrytych komnat i zaginionych artefaktów.',
                season: 2,
                episodeNumber: 2,
                minutes: 41,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Starożytne Tajemnice Rzymu',
                description: 'Grupa udaje się do Rzymu, aby odkryć tajemnice starożytnego Imperium Rzymskiego. Eksplorują ruiny i odkrywają starożytne spisy, które rzucają nowe światło na historię Rzymu.',
                season: 2,
                episodeNumber: 3,
                minutes: 42,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Ślady Starożytnych Azteków',
                description: 'Bohaterowie kierują się do Meksyku, aby odkryć starożytne tajemnice Azteków. Odkrywają ukryte świątynie i zaginione miasta Azteków.',
                season: 2,
                episodeNumber: 4,
                minutes: 41,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Ostatnia Wyprawa na Antarktydę',
                description: 'Finansjera grupy proponuje ostatnią, epicką wyprawę na Antarktydę, gdzie badacze mają odnaleźć starożytne artefakty ukryte pod lodem. Jednak ekstremalne warunki sprawiają, że zadanie jest niezwykle trudne.',
                season: 2,
                episodeNumber: 5,
                minutes: 45,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Śladami Starożytnych Chin: Wielki Mur Chiński',
                description: 'Badacze kierują się do Chin, aby zbadać starożytny Wielki Mur. W trakcie podróży odkrywają ukryte komnaty i tajemnice związane z budową muru.',
                season: 3,
                episodeNumber: 1,
                minutes: 44,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Odkrywanie Tajemniczych Jaskiń Indii',
                description: 'Ekipa przemieszcza się do Indii, aby badać starożytne jaskinie i góry. Odkrywają rytuały buddyjskie i starożytne inskrypcje na ścianach jaskiń.',
                season: 3,
                episodeNumber: 2,
                minutes: 43,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Zaginione Miasto Machu Picchu: Powrót do Peru',
                description: 'Bohaterowie wracają do Peru, aby zgłębić tajemnice Machu Picchu. Odkrywają ukryte tunele i starożytne rytuały związane z tym tajemniczym miejscem.',
                season: 3,
                episodeNumber: 3,
                minutes: 42,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Szlakiem Starożytnych Karawan: Jedwabny Szlak',
                description: 'Wyprawa śladami historycznego Jedwabnego Szlaku, gdzie badacze odkrywają tajemnicze kultury i skarby związane z handlem jedwabiem.',
                season: 3,
                episodeNumber: 4,
                minutes: 47,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Ostatni Bastion: Forteca w Himalajach',
                description: 'Ekipa podąża do Himalajów, aby odkryć starożytne fortyfikacje i tajemnicze miejsca w tej nieprzeniknionej części świata.',
                season: 3,
                episodeNumber: 5,
                minutes: 49,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Podwodne Miasta: Tajemnice Oceanów',
                description: 'Badacze kierują się pod wodę, aby badać podwodne ruiny i tajemnicze miasta, ukryte głęboko pod powierzchnią oceanów.',
                season: 3,
                episodeNumber: 6,
                minutes: 46,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Tajemnice Starożytnego Tybetu',
                description: 'Grupa podróżuje do Tybetu, aby zbadać starożytne klasztory i mistyczne miejsca związane z buddyzmem.',
                season: 3,
                episodeNumber: 7,
                minutes: 44,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Ostatni Skarb Plemienia Inków',
                description: 'Finiszowy odcinek sezonu skupia się na poszukiwaniu ostatniego skarbu plemienia Inków ukrytego w głębi dżungli Ameryki Południowej.',
                season: 3,
                episodeNumber: 8,
                minutes: 53,
                seriesId: 'df65b3a7-c9d9-4cb0-a9e2-a50ed189e464',
                thumbnailUrl: 'zaginione-swiatlo-odc.png',
                sourceUrl: 'zaginione-swiatlo-odc.mp4'
            },
            {
                title: 'Początek Wyprawy',
                description: 'Załoga wyrusza w swoją pierwszą międzygalaktyczną podróż, docierając do obszaru kosmosu, który nie został jeszcze zbadany.',
                season: 1,
                episodeNumber: 1,
                minutes: 46,
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679',
                thumbnailUrl: 'przestrzen-nieskonczona-odc.png',
                sourceUrl: 'przestrzen-nieskonczona-odc.mp4'
            },
            {
                title: 'Obcy Sygnał',
                description: 'Statek odbiera tajemniczy sygnał z odległej planety, co prowadzi do odkrycia obcej cywilizacji.',
                season: 1,
                episodeNumber: 2,
                minutes: 58,
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679',
                thumbnailUrl: 'przestrzen-nieskonczona-odc.png',
                sourceUrl: 'przestrzen-nieskonczona-odc.mp4'
            },
            {
                title: 'Czasoprzestrzeń',
                description: 'Aurora wpada w dziwną anomalję czasoprzestrzenną, co powoduje nieoczekiwane konsekwencje dla załogi.',
                season: 1,
                episodeNumber: 3,
                minutes: 61,
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679',
                thumbnailUrl: 'przestrzen-nieskonczona-odc.png',
                sourceUrl: 'przestrzen-nieskonczona-odc.mp4'
            },
            {
                title: 'Zagubiona Kolonia',
                description: 'Ekipa odkrywa opuszczoną kolonię na odległej planecie, znikniętą bez śladu na przestrzeni lat.',
                season: 1,
                episodeNumber: 4,
                minutes: 49,
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679',
                thumbnailUrl: 'przestrzen-nieskonczona-odc.png',
                sourceUrl: 'przestrzen-nieskonczona-odc.mp4'
            },
            {
                id: '10acf517-0d84-4f33-8f16-06e7d366940c',
                title: 'Niezbadane Gwiazdy',
                description: 'Statek kosmiczny wprowadza się w obszar kosmosu, w którym gwiazdy wydają się posłuszne innym zasadom fizyki.',
                season: 1,
                episodeNumber: 5,
                minutes: 47,
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679',
                thumbnailUrl: 'przestrzen-nieskonczona-odc.png',
                sourceUrl: 'przestrzen-nieskonczona-odc.mp4'
            },
            {
                title: 'Intruzi na Pokładzie',
                description: 'Niespodziewane pojawienie się obcych na statku stawia załogę w obliczu niebezpieczeństwa.',
                season: 1,
                episodeNumber: 6,
                minutes: 41,
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679',
                thumbnailUrl: 'przestrzen-nieskonczona-odc.png',
                sourceUrl: 'przestrzen-nieskonczona-odc.mp4'
            },
            {
                title: 'Klucz do Nieskończoności',
                description: 'Załoga odkrywa starożytny artefakt, który wydaje się zawierać klucz do nieznanego obszaru kosmosu.',
                season: 1,
                episodeNumber: 7,
                minutes: 55,
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679',
                thumbnailUrl: 'przestrzen-nieskonczona-odc.png',
                sourceUrl: 'przestrzen-nieskonczona-odc.mp4'
            },
            {
                title: 'Epicki Finisz',
                description: 'Sezon kończy się epickim starciem z nieznaną siłą, której istnienie zagraża równowadze w całej galaktyce.',
                season: 1,
                episodeNumber: 8,
                minutes: 64,
                seriesId: '5651f11f-5079-4499-9fa7-01ebca77c679',
                thumbnailUrl: 'przestrzen-nieskonczona-odc.png',
                sourceUrl: 'przestrzen-nieskonczona-odc.mp4'
            },
            {
                title: 'Zniknięcie w Cieniu',
                description: 'Julia bierze udział w śledztwie związane z tajemniczym zniknięciem młodej kobiety, a trop prowadzi ją do nieznanych aspektów paranormalnych.',
                season: 1,
                episodeNumber: 1,
                minutes: 44,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Demoniczna Mroczność',
                description: 'Detektyw Miller staje przed sprawą, w której brutalne morderstwo wydaje się być związane z demonicznymi rytuałami.',
                season: 1,
                episodeNumber: 2,
                minutes: 43,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Uwięziona Dusza',
                description: 'Julia odkrywa tajemnicę nawiedzonego domu, gdzie dusza zmarłej osoby może być kluczem do rozwiązania niewyjaśnionego morderstwa.',
                season: 1,
                episodeNumber: 3,
                minutes: 42,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                id: "5452f540-918b-4266-827a-e5bbf11e88e5",
                title: 'Zagubione Dziecko Widmo',
                description: 'Śledztwo w sprawie zaginionego dziecka prowadzi Julię do zderzenia z zjawiskiem widma, które zdaje się chronić tajemnicę.',
                season: 1,
                episodeNumber: 4,
                minutes: 46,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Krwawa Księga',
                description: 'Julia tropi seryjnego mordercę, którego zbrodnie wydają się być inspirowane starożytną, zakazaną księgą.',
                season: 1,
                episodeNumber: 5,
                minutes: 47,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Cieniste Przeszłości',
                description: 'Detektyw Miller odkrywa, że pewne zbrodnie mają korzenie w przeszłości, która przekracza granice życia i śmierci.',
                season: 1,
                episodeNumber: 6,
                minutes: 53,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Kłamstwo Duchów',
                description: 'Julia jest zmuszona skonfrontować się z kłamstwami i zdradami duchów, gdy śledztwo wiedzie ją do zjawisk paranormalnych związanych z przeszłością.',
                season: 1,
                episodeNumber: 7,
                minutes: 43,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Ostateczne Starcie',
                description: 'Sezon kończy się epickim starciem detektyw Miller z siłami paranormalnymi, które wydają się manipulować każdym jej krokiem.',
                season: 1,
                episodeNumber: 8,
                minutes: 51,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Złowroga Gra w Domu Duchów',
                description: 'Detektyw Julia Miller odkrywa dom pełen duchów, gdzie zjawiska paranormalne są wykorzystywane przez nieznanych sprawców do własnych celów.',
                season: 2,
                episodeNumber: 1,
                minutes: 44,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Zaginięcie w Paranormalnym Kręgu',
                description: 'Kiedy tajemnicze zjawisko paranormalne otacza sprawę zaginięcia, Julia musi wejść w świat tajemniczych kręgów i praktyk paranormalnych.',
                season: 2,
                episodeNumber: 2,
                minutes: 40,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Zakazane Zaklęcia',
                description: 'Śledztwo w sprawie makabrycznych zbrodni odsłania starożytne zaklęcia, których moc zdaje się być używana przez tajemniczego czarnoksiężnika.',
                season: 2,
                episodeNumber: 3,
                minutes: 49,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Śmiercionośna Wizja',
                description: 'Detektyw Miller doświadcza paranormalnej wizji, która wskazuje na przyszłość związana z serią niebezpiecznych zdarzeń. Czy może to pomóc w zapobieżeniu tragedii?',
                season: 2,
                episodeNumber: 4,
                minutes: 50,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Demoniczna Umowa',
                description: 'Julia tropi sprawę, w której ofiary zdają się być powiązane z niebezpiecznymi umowami z demonami. Czy można złamać taką umowę?',
                season: 2,
                episodeNumber: 5,
                minutes: 58,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Przebudzenie Widma',
                description: 'Tajemnicze przebudzenie ducha z przeszłości stawia Julia w obliczu konfrontacji z niewyjaśnionym zdarzeniem sprzed lat.',
                season: 2,
                episodeNumber: 6,
                minutes: 42,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Portale do Innych Światów',
                description: 'Ekipa detektywistyczna odkrywa starożytne portale, które prowadzą do innych wymiarów, otwierając drogę do nieznanych zagrożeń.',
                season: 2,
                episodeNumber: 7,
                minutes: 46,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Ostatnie Uderzenie Duchów',
                description: 'W finałowym odcinku sezonu Julia musi stawić czoła największemu wyzwaniu, gdy siły paranormalne zaczynają kolapsować, wprowadzając chaos do rzeczywistości.',
                season: 2,
                episodeNumber: 8,
                minutes: 62,
                seriesId: '63c83aad-56fe-4494-9139-2a3ac695097e',
                thumbnailUrl: 'mroczne-zagadki-odc.png',
                sourceUrl: 'mroczne-zagadki-odc.mp4'
            },
            {
                title: 'Cień Nad Wisłą',
                description: 'Marek Kowalski wraca do służby, aby rozwiązać sprawę zniknięcia młodej kobiety, której ciało zostaje znalezione nad brzegiem Wisły.',
                season: 1,
                episodeNumber: 1,
                minutes: 40,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Mroczne Ulice Starego Miasta',
                description: 'Detektyw Kowalski tropi mordercę, który działa w zaułkach historycznego Starego Miasta, ukrywając się w mrocznych zakamarkach.',
                season: 1,
                episodeNumber: 2,
                minutes: 43,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Zaginione Dziedzictwo',
                description: 'Marek odkrywa tajemnicę związana z długimi latami historii miasta, prowadzącą do zaginionego dziedzictwa i zemsty.',
                season: 1,
                episodeNumber: 3,
                minutes: 40,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Skomplikowane Relacje',
                description: 'Detektyw musi rozwiązać zagadkę związaną z toksycznymi relacjami w lokalnej społeczności, prowadzącą do tragicznych wydarzeń.',
                season: 1,
                episodeNumber: 4,
                minutes: 45,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Ostatnia Nuta Melancholii',
                description: 'Wstrząsająca seria morderstw wskazuje na tajemniczą melodię, która prowadzi do bolesnej przeszłości jednego z mieszkańców miasta.',
                season: 1,
                episodeNumber: 5,
                minutes: 47,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Zakazane Miłości',
                description: 'Sprawa morderstwa ujawnia skomplikowane relacje miłosne, zdrady i zakazane uczucia.',
                season: 1,
                episodeNumber: 6,
                minutes: 44,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Mroczna Strona Kultury',
                description: 'Detektyw Kowalski bada zbrodnię związane z podziemnym światem kultury, odsłaniając mroczne tajemnice teatru.',
                season: 1,
                episodeNumber: 7,
                minutes: 42,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Ostateczne Rozliczenie',
                description: 'Sezon kończy się dramatycznym starciem detektywa Kowalskiego z mordercą, który jest bliżej niż kiedykolwiek wcześniej.',
                season: 1,
                episodeNumber: 8,
                minutes: 49,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Złote Miasto, Ciemna Tajemnica',
                description: 'Marek Kowalski staje przed zagadką związaną z ukrytym skarbem, który zdaje się być kluczem do tajemniczego spisku.',
                season: 2,
                episodeNumber: 1,
                minutes: 43,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Mroczne Korytarze',
                description: 'Detektyw odkrywa serię podziemnych korytarzy, które kryją w sobie dawne sekrety i zbrodnie, prowadząc do zaskakujących odkryć.',
                season: 2,
                episodeNumber: 2,
                minutes: 44,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Znikające Dusze',
                description: 'Sprawa zaginionych dusz wskazuje na nieznane zjawisko paranormalne, związane z miejscem pochówku zmarłych.',
                season: 2,
                episodeNumber: 3,
                minutes: 44,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Złowroga Galeria',
                description: 'Marek śledzi morderstwo związane z tajemniczą galerią sztuki, odkrywając mroczne obrazy i związki z podziemnym światem sztuki.',
                season: 2,
                episodeNumber: 4,
                minutes: 53,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Ostatni Rozdział Księgi Historii',
                description: 'Sprawa prowadzi do starożytnej księgi historii miasta, której ostatni rozdział zdaje się być napisany krwią.',
                season: 2,
                episodeNumber: 5,
                minutes: 51,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Intrygujące Maski',
                description: 'Detektyw Kowalski bada serię morderstw związanych z tajemniczymi maskami, prowadzącymi do świata ukrytych tożsamości.',
                season: 2,
                episodeNumber: 6,
                minutes: 48,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Mroczny Urok',
                description: 'Kowalski staje przed wyzwaniem rozwikłania zbrodni, w której użyto magii i zaklęć, a ofiary zdają się być pod wpływem tajemniczego uroku.',
                season: 2,
                episodeNumber: 7,
                minutes: 46,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Ostateczny Początek',
                description: 'Sezon kończy się odnalezieniem kluczowego świadka, który może rzucić światło na wszystkie wcześniejsze zbrodnie, a detektyw Kowalski musi stawić czoła swojej własnej przeszłości.',
                season: 2,
                episodeNumber: 8,
                minutes: 58,
                seriesId: '38cd2d1d-ba22-44a3-a922-c820d99e945c',
                thumbnailUrl: 'ostry-cien-odc.png',
                sourceUrl: 'ostry-cien-odc.mp4'
            },
            {
                title: 'Spotkanie nad Jeziorem',
                description: 'Anna, nowa mieszkanka, przypadkiem spotyka Michała nad jeziorem, rozpoczynając nieoczekiwaną historię miłości.',
                season: 1,
                episodeNumber: 1,
                minutes: 50,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Tajemnice Leśnego Zakątka',
                description: 'Magda odkrywa tajemnice starej chaty w lesie, które związane są z rodziną Michała, wywołując konflikty i napięcia.',
                season: 1,
                episodeNumber: 2,
                minutes: 49,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Miłość w Rytmie Przyrody',
                description: 'Jan organizuje festiwal przyrodniczy, a uczestnicy odkrywają, że miłość może zakwitnąć w najmniej spodziewanych miejscach.',
                season: 1,
                episodeNumber: 3,
                minutes: 49,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Rodzinne Wyzwania',
                description: 'Problemy rodzinne wkraczają na pierwszy plan, gdy Anna i Michał muszą zmierzyć się z wyzwaniami związanymi z przeszłością.',
                season: 1,
                episodeNumber: 4,
                minutes: 41,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Niezapomniana Noc Letnia',
                description: 'Mieszkańcy organizują letnią nocną imprezę, która przynosi niezapomniane chwile, a także skomplikowane sytuacje miłosne.',
                season: 1,
                episodeNumber: 5,
                minutes: 40,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Przyjaźń na Mazurskich Wodach',
                description: 'Przyjacielska relacja Magdy i Jana zostaje wystawiona na próbę, gdy pojawia się nowy mieszkaniec z sekretnymi zamiarami.',
                season: 1,
                episodeNumber: 6,
                minutes: 44,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Ostatni Zachód Słońca',
                description: 'Sezon kończy się spektakularnym zachodem słońca nad jeziorem, zamykając jednocześnie pewne rozdziały i otwierając nowe możliwości.',
                season: 1,
                episodeNumber: 7,
                minutes: 50,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Nowe Szanse',
                description: 'Sezon rozpoczyna się od pojawienia się nowych mieszkańców, co przynosi nowe nadzieje, ale także wyzwania dla istniejących związków.',
                season: 2,
                episodeNumber: 1,
                minutes: 44,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                id: "bdf108a3-56b6-4824-9c7e-261db273ca74",
                title: 'Wędrówka Przez Mazurskie Lasy',
                description: 'Bohaterowie decydują się na wędrówkę przez mazurskie lasy, gdzie odkrywają nieznane zakątki i starożytne opowieści.',
                season: 2,
                episodeNumber: 2,
                minutes: 45,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Miłość a Przeszłość',
                description: 'Postacie muszą stawić czoła swoim przeszłościom, gdy tajemnice wypływają na światło dzienne, wpływając na ich obecne związki.',
                season: 2,
                episodeNumber: 3,
                minutes: 44,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Mazurskie Wesela',
                description: 'Seria weselnych przygotowań i ceremonii, która przynosi zarówno radość, jak i konflikty wśród mieszkańców.',
                season: 2,
                episodeNumber: 4,
                minutes: 41,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Niezapomniana Majówka',
                description: 'Społeczność organizuje majówkę, która przynosi ze sobą nowe przyjaźnie, flirt i tajemnicze spotkania.',
                season: 2,
                episodeNumber: 5,
                minutes: 41,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Wakacyjne Zaskoczenia',
                description: 'Bohaterowie spędzają wakacje nad jeziorem, gdzie pojawiają się nowe romanse, ale także niespodziewane trudności.',
                season: 2,
                episodeNumber: 6,
                minutes: 55,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Odkrywając Mroczne Tajemnice',
                description: 'Tym razem postacie odkrywają mroczne tajemnice związane z historią miejscowości, które wpływają na ich współczesne życie.',
                season: 2,
                episodeNumber: 7,
                minutes: 50,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Przełomowe Chwile',
                description: 'Sezon kończy się przełomowymi chwilami dla głównych bohaterów, gdy muszą podjąć decyzje dotyczące swoich relacji i przyszłości.',
                season: 2,
                episodeNumber: 8,
                minutes: 49,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Nowe Pokolenie',
                description: 'Nowe pokolenie mieszkańców wkracza na scenę, a bohaterowie starają się przekazać im mazurską tradycję i wartości.',
                season: 3,
                episodeNumber: 1,
                minutes: 47,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Rozkwit Romantyki',
                description: 'Romantyczne historie rozwijają się na nowo, gdy postacie starają się odkryć magiczną stronę miłości na Mazurach.',
                season: 3,
                episodeNumber: 2,
                minutes: 44,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Wyzwania Rodzinne',
                description: 'Bohaterowie muszą stawić czoła nowym wyzwaniom rodzinnych relacji, rozważając kwestie związane z macierzyństwem, ojcostwem i rodzeństwem.',
                season: 3,
                episodeNumber: 3,
                minutes: 43,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Mazurskie Śluby',
                description: 'Seria mazurskich ślubów przynosi ze sobą zarówno wzruszające ceremonie, jak i nieoczekiwane niespodzianki.',
                season: 3,
                episodeNumber: 4,
                minutes: 47,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Przemiany w Społeczności',
                description: 'Społeczność przeszła zmiany, a bohaterowie starają się dostosować do nowych realiów, czego wynikiem są zarówno pozytywne, jak i trudne momenty.',
                season: 3,
                episodeNumber: 5,
                minutes: 46,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Mazurskie Legendy',
                description: 'Postacie wplątują się w lokalne legendy i opowieści, odkrywając związki między przeszłością a teraźniejszością.',
                season: 3,
                episodeNumber: 6,
                minutes: 48,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Światło Nocy Mazurskiej',
                description: 'Nocne wydarzenia na Mazurach odsłaniają nowe oblicze społeczności, rzucając światło na ukryte tajemnice.',
                season: 3,
                episodeNumber: 7,
                minutes: 48,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Ostatnie Mazurskie Lato',
                description: 'Sezon kończy się na pełnym emocji Mazurskim lecie, gdzie postacie podejmują ważne decyzje dotyczące swoich związków i przyszłości.',
                season: 3,
                episodeNumber: 8,
                minutes: 52,
                seriesId: 'ad1b96b2-d4ce-4f37-a61b-3f40977971e7',
                thumbnailUrl: 'milosc-na-mazurach-odc.png',
                sourceUrl: 'milosc-na-mazurach-odc.mp4'
            },
            {
                title: 'Znikające Minuty',
                description: 'Bohaterowie zaczynają zauważać dziwne znikania minut ze swojego życia, co prowadzi do pierwszego śledztwa.',
                season: 1,
                episodeNumber: 1,
                minutes: 43,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Skradziony Dzień',
                description: 'Kamil Nowak budzi się, aby odkryć, że cały dzień zniknął z pamięci. Razem z detektywem Martą Wiśniewską próbują rozwikłać tę zagadkę.',
                season: 1,
                episodeNumber: 2,
                minutes: 42,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Portale Czasowe',
                description: 'Profesor Ludwik Zając odkrywa, że złodziej czasu może używać portali czasowych, co prowadzi do eksperymentów i niebezpiecznych konsekwencji.',
                season: 1,
                episodeNumber: 3,
                minutes: 45,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Zaklęte Zegary',
                description: 'Zegary w miasteczku zaczynają działać w sposób niestandardowy, a bohaterowie podejrzewają, że klucz do zagadki to magiczne zaklęcia.',
                season: 1,
                episodeNumber: 4,
                minutes: 46,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Złamane Zegary',
                description: 'Bohaterowie tropią złodzieja czasu do zabytkowego zegara wieżowego, gdzie odkrywają sekrety związane z przeszłością miasteczka.',
                season: 1,
                episodeNumber: 5,
                minutes: 42,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Strzał w Czasie',
                description: 'W miasteczku dochodzi do tajemniczego strzału, a bohaterowie zdają sobie sprawę, że skradziony czas może być kluczem do przyszłych wydarzeń.',
                season: 1,
                episodeNumber: 6,
                minutes: 44,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Czasowa Pułapka',
                description: 'Bohaterowie wpadają w pułapkę czasową, gdzie muszą zmierzyć się z własnymi wyborami i konsekwencjami z przeszłości.',
                season: 1,
                episodeNumber: 7,
                minutes: 41,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Ostateczny Złodziej',
                description: 'Sezon kończy się dramatycznym starciem z głównym złodziejem czasu, który zdradza swoje motywacje i wpływ na całą społeczność.',
                season: 1,
                episodeNumber: 8,
                minutes: 55,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Czasowa Nierównowaga',
                description: 'Bohaterowie odkrywają, że złodziej czasu naruszył równowagę czasową, co prowadzi do chaosu w miasteczku.',
                season: 2,
                episodeNumber: 1,
                minutes: 48,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Zaginione Chwile',
                description: 'Kamil Nowak zaczyna tracić wspomnienia z ważnych chwil swojego życia, a detektyw Marta Wiśniewska musi go ochronić przed dalszym utratą czasu.',
                season: 2,
                episodeNumber: 2,
                minutes: 46,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Przeszłość vs Przyszłość',
                description: 'Bohaterowie stają przed wyborem między zmianą przeszłości a ochroną przyszłości, co prowadzi do trudnych decyzji i konfliktów.',
                season: 2,
                episodeNumber: 3,
                minutes: 44,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Wyścig z Czasem',
                description: 'Złodziej czasu wprowadza nowy plan, a bohaterowie muszą wziąć udział w emocjonującym wyścigu, aby go powstrzymać.',
                season: 2,
                episodeNumber: 4,
                minutes: 50,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Ostateczna Konfrontacja',
                description: 'Sezon kończy się ostateczną konfrontacją z głównym złodziejem czasu, gdzie prawda o jego motywacjach wychodzi na jaw, a bohaterowie muszą podjąć ostateczne decyzje dotyczące czasu.',
                season: 2,
                episodeNumber: 5,
                minutes: 57,
                seriesId: '8fa4b473-336c-40cd-92f0-9f002eee1aab',
                thumbnailUrl: 'zlodziej-czasu.png',
                sourceUrl: 'zlodziej-czasu-odc.mp4'
            },
            {
                title: 'Śmiech jako Lekarstwo',
                description: 'Grupa bohaterów z różnymi problemami życiowymi poznaje się na sesji śmiechoterapii, gdzie przekonują się, że śmiech może być potężnym lekarstwem.',
                season: 1,
                episodeNumber: 1,
                minutes: 43,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Humor na Życiowym Zakręcie',
                description: 'Bohaterowie dzielą się swoimi śmiesznymi i jednocześnie trudnymi sytuacjami z życia, co pomaga im spojrzeć na swoje problemy z innej perspektywy.',
                season: 1,
                episodeNumber: 2,
                minutes: 44,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Zabawne Terapie',
                description: 'Terapeuta prowadzi nietypowe sesje terapeutyczne, wykorzystując humor, gry i zabawy, aby pomóc bohaterom w radzeniu sobie z wyzwaniami.',
                season: 1,
                episodeNumber: 3,
                minutes: 44,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Śmiechowe Wyzwania',
                description: 'Bohaterowie podejmują się różnych wyzwań śmiechowych, co prowadzi do niezapomnianych i komicznych sytuacji.',
                season: 1,
                episodeNumber: 4,
                minutes: 44,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Komedie Życia Codziennego',
                description: 'Grupa odkrywa, że codzienne sytuacje życiowe mogą być najbardziej komiczne, a śmiech pomaga im znaleźć radość w prostych chwilach.',
                season: 1,
                episodeNumber: 5,
                minutes: 47,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Przyjaźń w Śmiechu',
                description: 'Bohaterowie budują silne więzi przyjaźni, dzięki wspólnym doświadczeniom z sesji śmiechoterapii.',
                season: 1,
                episodeNumber: 6,
                minutes: 41,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Śmiech na Trudności',
                description: 'Kiedy pojawią się nowe trudności, bohaterowie dowiadują się, że śmiech może być siłą napędową do pokonywania życiowych przeciwności.',
                season: 1,
                episodeNumber: 7,
                minutes: 42,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Finisz na Śmiechu',
                description: 'Sezon kończy się uroczystą sesją śmiechoterapii, gdzie bohaterowie świętują swoje postępy i zdolność do znajdowania radości w codziennym życiu.',
                season: 1,
                episodeNumber: 8,
                minutes: 50,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Nowi Pacjenci, Nowe Komedie',
                description: 'Grupa przyjmuje nowych uczestników do sesji śmiechoterapii, co prowadzi do nowych i nieoczekiwanych sytuacji komediowych.',
                season: 2,
                episodeNumber: 1,
                minutes: 43,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Śmiech i Miłość',
                description: 'Bohaterowie odkrywają, że śmiech może być doskonałym katalizatorem dla romansów i miłosnych perypetii.',
                season: 2,
                episodeNumber: 2,
                minutes: 42,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Komiczne Wyzwania',
                description: 'Terapeuta wprowadza grupę w komiczne wyzwania, które testują ich zdolność do śmiechu nawet w trudnych sytuacjach.',
                season: 2,
                episodeNumber: 3,
                minutes: 40,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Przygoda w Komedii',
                description: 'Bohaterowie decydują się na wspólną przygodę, która prowadzi do serii komediowych perypetii i niezapomnianych chwil.',
                season: 2,
                episodeNumber: 4,
                minutes: 46,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Komiczne Niespodzianki',
                description: 'Grupa doświadcza niespodzianek, które wywołują lawinę śmiechu, a jednocześnie uczą ich radzenia sobie z nieprzewidywalnością życia.',
                season: 2,
                episodeNumber: 5,
                minutes: 43,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Śmiechowe Zakończenie',
                description: 'Sezon zbliża się do końca, a bohaterowie decydują się zakończyć terapię sesją, która przynosi wielkie wybuchy śmiechu i wzruszeń.',
                season: 2,
                episodeNumber: 6,
                minutes: 42,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Radosna Decyzja',
                description: 'W ostatnim odcinku bohaterowie podejmują decyzję, czy kontynuować sesje śmiechoterapii czy też już na zawsze czerpać radość z życia na własny sposób.',
                season: 2,
                episodeNumber: 7,
                minutes: 44,
                seriesId: '6106adf3-20f6-4efc-8534-c981952cf364',
                thumbnailUrl: 'smiechoterapia-odc.png',
                sourceUrl: 'smiechoterapia-odc.mp4'
            },
            {
                title: 'Przybycie do Schroniska',
                description: 'Bohaterowie trafiają do tajemniczego schroniska, próbując ukryć się przed swoimi problemami i zaczynać od nowa.',
                season: 1,
                episodeNumber: 1,
                minutes: 41,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Tajemnice Przeszłości',
                description: 'Każdy z mieszkańców schroniska skrywa tajemnice, które stopniowo zaczynają wychodzić na jaw, wpływając na relacje między nimi.',
                season: 1,
                episodeNumber: 2,
                minutes: 42,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Budowanie Nowych Wspomnień',
                description: 'Bohaterowie próbują budować nowe wspomnienia, jednocześnie stawiając czoła wyzwaniom związanym z przeszłością.',
                season: 1,
                episodeNumber: 3,
                minutes: 41,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Zaginione Osoby',
                description: 'Kiedy jedna z osób znika, reszta grupy angażuje się w poszukiwania, odkrywając, że każdy ma własny powód do ukrywania się.',
                season: 1,
                episodeNumber: 4,
                minutes: 47,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Zamieć Emocji',
                description: 'Zamieć śnieżna izoluje schronisko od reszty świata, a bohaterowie muszą stawić czoła swoim emocjom i konfliktom.',
                season: 1,
                episodeNumber: 5,
                minutes: 45,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Ostateczna Prawda',
                description: 'Sezon kończy się odkryciem ostatecznej prawdy dotyczącej tajemnic schroniska i przeszłości bohaterów, co radykalnie zmienia ich życie.',
                season: 1,
                episodeNumber: 6,
                minutes: 43,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Nowe Twarze, Nowe Tajemnice',
                description: 'Schronisko przyjmuje nowych mieszkańców, co prowadzi do odkrycia nowych tajemnic i intryg.',
                season: 2,
                episodeNumber: 1,
                minutes: 45,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Miłość w Cieniu Tajemnic',
                description: 'Bohaterowie zaczynają rozważać nowe relacje miłosne, ale tajemnice przeszłości stają na ich drodze.',
                season: 2,
                episodeNumber: 2,
                minutes: 42,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Zaginione Wspomnienia',
                description: 'Ktoś traci pamięć, co prowadzi do intensywnych poszukiwań zaginionych wspomnień i ukrytych tajemnic.',
                season: 2,
                episodeNumber: 3,
                minutes: 51,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Szkice Zbrodni',
                description: 'Bohaterowie odkrywają, że ktoś w schronisku może mieć związek z przestępstwem sprzed lat, co prowadzi do rozwoju kryminalnej intrygi.',
                season: 2,
                episodeNumber: 4,
                minutes: 48,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Przeszłość na Powierzchnię',
                description: 'Tajemnice przeszłości bohaterów wychodzą na światło dzienne, a schronisko musi stawić czoła konsekwencjom.',
                season: 2,
                episodeNumber: 5,
                minutes: 48,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Koniec Bezpiecznej Przystani?',
                description: 'Schronisko stoi w obliczu zamknięcia, a bohaterowie muszą podjąć decyzje dotyczące swojej przyszłości i losu wspólnoty.',
                season: 2,
                episodeNumber: 6,
                minutes: 46,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Ostatni Akt',
                description: 'W finałowym odcinku bohaterowie muszą zmierzyć się z ostatecznymi tajemnicami, zdradami i próbą znalezienia bezpiecznej przystani po raz ostatni.',
                season: 2,
                episodeNumber: 7,
                minutes: 59,
                seriesId: '893ccb72-40ea-477f-82ac-5e9a98b92a11',
                thumbnailUrl: 'bezpieczna-przystan.png',
                sourceUrl: 'bezpieczna-przystan-odc.mp4'
            },
            {
                title: 'Otwarcie Portalu',
                description: 'Naukowcy przypadkowo otwierają portal do innego wymiaru, co prowadzi do pierwszych tajemniczych zdarzeń.',
                season: 1,
                episodeNumber: 1,
                minutes: 42,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Eteryczne Zjawiska',
                description: 'Bohaterowie odkrywają, że w nowym wymiarze występują niezwykłe zjawiska, zmieniające ich postrzeganie rzeczywistości.',
                season: 1,
                episodeNumber: 2,
                minutes: 42,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Zaginione Czasoprzestrzenie',
                description: 'Czas zaczyna działać inaczej, a naukowcy muszą odkryć, jak poruszać się między zaginionymi fragmentami czasu i przestrzeni.',
                season: 1,
                episodeNumber: 3,
                minutes: 44,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Labirynt Tajemnic',
                description: 'W nowym wymiarze pojawia się labirynt, który kryje w sobie tajemnice dotyczące przeszłości i przyszłości bohaterów.',
                season: 1,
                episodeNumber: 4,
                minutes: 41,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Eteryczne Decyzje',
                description: 'Sezon kończy się, gdy naukowcy muszą podjąć trudne decyzje dotyczące dalszych eksploracji, zanim zostaną uwięzieni w eterycznym labiryncie na zawsze.',
                season: 1,
                episodeNumber: 5,
                minutes: 49,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Rozbicie Czasu',
                description: 'Portal zaczyna destabilizować czas, powodując rozbicie czasoprzestrzeni i wprowadzając bohaterów w niebezpieczne zakamarki wymiaru.',
                season: 2,
                episodeNumber: 1,
                minutes: 44,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Wymiarowe Spotkania',
                description: 'Naukowcy natykają się na istoty z innego wymiaru, co prowadzi do napięć, współpracy i nowych tajemnic.',
                season: 2,
                episodeNumber: 2,
                minutes: 45,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Labirynt Umysłu',
                description: 'Labirynt zaczyna wpływać na umysły bohaterów, stawiając ich przed wyzwaniami, których nie można pokonać fizycznie.',
                season: 2,
                episodeNumber: 3,
                minutes: 48,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Czasowy Punkt Kulminacyjny',
                description: 'Bohaterowie odkrywają punkt kulminacyjny, który jest kluczowy dla stabilności czasoprzestrzeni, ale jednocześnie jest źródłem wielu zagrożeń.',
                season: 2,
                episodeNumber: 4,
                minutes: 46,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Ostateczne Wybory',
                description: 'W finałowym odcinku naukowcy muszą podjąć ostateczne wybory, aby zakończyć eksperyment z portalem, zanim stanie się on niekontrolowany.',
                season: 2,
                episodeNumber: 5,
                minutes: 53,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Kod Eteru',
                description: 'Naukowcy odkrywają tajemniczy kod w strukturze samego eterycznego labiryntu, który może prowadzić do kluczowych odpowiedzi.',
                season: 3,
                episodeNumber: 1,
                minutes: 41,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Zmiana Zasad Gry',
                description: 'Bohaterowie zdają sobie sprawę, że zasady panujące w eterycznym labiryncie zaczynają się zmieniać, co wprowadza nowe wyzwania i niebezpieczeństwa.',
                season: 3,
                episodeNumber: 2,
                minutes: 50,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Światło na Ciemności',
                description: 'Grupa odkrywa źródło światła w głębi labiryntu, co może być kluczem do zrozumienia istoty tego wymiaru.',
                season: 3,
                episodeNumber: 3,
                minutes: 43,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Czasowe Wyzwania',
                description: 'Bohaterowie muszą stawić czoło coraz trudniejszym wyzwaniom czasowym, aby ostatecznie zrozumieć, jak funkcjonuje eteryczny labirynt.',
                season: 3,
                episodeNumber: 4,
                minutes: 45,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Zaklęcie Eteru',
                description: 'Naukowcy odkrywają zaklęcie, które pozwala manipulować eterycznym labiryntem, ale jednocześnie niesie ze sobą poważne konsekwencje.',
                season: 3,
                episodeNumber: 5,
                minutes: 49,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Ostateczna Przeznaczenie',
                description: 'W ostatnim odcinku bohaterowie zbliżają się do ostatecznego przeznaczenia eterycznego labiryntu, a ich decyzje kształtują losy zarówno tego wymiaru, jak i ich własne.',
                season: 3,
                episodeNumber: 6,
                minutes: 55,
                seriesId: '8c3acd79-361f-49b9-bd5d-f75a25629905',
                thumbnailUrl: 'eteryczny-labirynt-odc.png',
                sourceUrl: 'eteryczny-labirynt-odc.mp4'
            },
            {
                title: 'Granice Sprawiedliwości',
                description: 'Detektyw Zawadzki podejmuje kontrowersyjne środki w staraniach o schwytanie groźnego przestępcy, co prowadzi do konfliktu z prawem.',
                season: 1,
                episodeNumber: 1,
                minutes: 42,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Cieniste Sojusze',
                description: 'Bohaterowie wpadają w sieć cienistych sojuszy i korupcji, odkrywając, że przestępczy świat ma swoje korzenie również w instytucjach prawa.',
                season: 1,
                episodeNumber: 2,
                minutes: 47,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Złamane Lojalności',
                description: 'Detektyw Zawadzki musi stawić czoła złamanym lojalnościom wśród kolegów po feralnej decyzji, która zmienia grę.',
                season: 1,
                episodeNumber: 3,
                minutes: 44,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Gra w Wyższe Prawo',
                description: 'Bohaterowie angażują się w grę, w której zasady naruszają granice prawne, aby osiągnąć sprawiedliwość.',
                season: 1,
                episodeNumber: 4,
                minutes: 49,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Przełamując Rutynę',
                description: 'Detektyw Zawadzki zaczyna przełamywać rutynę śledztwa, co prowadzi do odkrycia nowych faktów, a jednocześnie naraża go na niebezpieczeństwo.',
                season: 1,
                episodeNumber: 5,
                minutes: 42,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Rozdarte Allegro',
                description: 'Konflikt między detektywem a przestępczym światem przybiera na sile, prowadząc do dramatycznych rozterek i wyborów.',
                season: 1,
                episodeNumber: 6,
                minutes: 51,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Ostateczna Sprawiedliwość',
                description: 'Sezon kończy się ostatecznym starciem między detektywem Zawadzkim a przestępczym syndykatem, gdzie pojawią się ostateczne wybory dotyczące sprawiedliwości.',
                season: 1,
                episodeNumber: 7,
                minutes: 53,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Cienie Przeszłości',
                description: 'Detektyw Zawadzki staje twarzą w twarz z cieniami swojej przeszłości, kiedy stary wróg powraca, zagrażając nie tylko jemu, ale również jego bliskim.',
                season: 2,
                episodeNumber: 1,
                minutes: 44,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Granice Sprawiedliwości 2.0',
                description: 'Bohaterowie przekraczają kolejne granice w staraniach o ujawnienie korupcji, co niesie ze sobą nowe wyzwania i zagrożenia.',
                season: 2,
                episodeNumber: 2,
                minutes: 46,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Układanki Zbrodni',
                description: 'Detektyw Zawadzki i jego zespół muszą rozwiązać złożoną układankę zbrodni, która wplątuje ich w sieć kłamstw i manipulacji.',
                season: 2,
                episodeNumber: 3,
                minutes: 43,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Przełomowe Świadectwo',
                description: 'Nowe, przełomowe świadectwo pojawia się w śledztwie, ale jednocześnie pojawiają się wątpliwości co do jego wiarygodności.',
                season: 2,
                episodeNumber: 4,
                minutes: 45,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Intrygujące Sojusze',
                description: 'Bohaterowie nawiązują intrygujące sojusze, aby zwalczyć wspólnego wroga, ale pytanie brzmi, czy wszyscy są na tej samej stronie.',
                season: 2,
                episodeNumber: 5,
                minutes: 50,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            },
            {
                title: 'Konfrontacja Praw',
                description: 'Sezon zbliża się do finału, a detektyw Zawadzki musi stawić czoła konfrontacji nie tylko z przestępcami, ale również z własnym sumieniem.',
                season: 2,
                episodeNumber: 6,
                minutes: 55,
                seriesId: '447b979d-34dc-4e30-ac35-a37273ae90a0',
                thumbnailUrl: 'zlamane-prawo-odc.png',
                sourceUrl: 'zlamane-prawo-odc.mp4'
            }
        ]
    })
}

export default episodeSeeder;