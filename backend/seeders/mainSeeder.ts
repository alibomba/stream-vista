import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import categorySeeder from "./categorySeeder";
import movieSeeder from "./movieSeeder";
import seriesSeeder from "./seriesSeeder";
import episodeSeeder from "./episodeSeeder";
import userSeeder from "./userSeeder";
import toWatchSeeder from "./toWatchSeeder";
import adminSeeder from "./adminSeeder";
import subtitleSeeder from "./subtitleSeeder";

async function truncate() {
    await prisma.category.deleteMany();
    await prisma.episode.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.series.deleteMany();
    await prisma.subtitle.deleteMany();
    await prisma.toWatch.deleteMany();
    await prisma.track.deleteMany();
    await prisma.user.deleteMany();
    await prisma.contactMessage.deleteMany();
    await prisma.newsletterMember.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.adminRefreshToken.deleteMany();
}

async function main() {
    await truncate();
    await categorySeeder();
    await movieSeeder();
    await seriesSeeder();
    await episodeSeeder();
    await userSeeder();
    await toWatchSeeder();
    await adminSeeder();
    await subtitleSeeder();
}

main();