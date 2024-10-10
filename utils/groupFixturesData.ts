/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { liveStatus } from "@/constants/fixtures";

interface Fixture {
    fixture: any;
    league: any;
    teams: any;
    goals: any;
    score: any;
}

interface FixtureDocument {
    fixtures: Fixture[];
    date: string;
    lastCall: Date;
}

export function getGroupedFixturesByDate(documents: Fixture[]): any {
    try {
        // Flatten the fixtures array and add the league id to each fixture for easy grouping later
        let allFixtures: any[] = [];
        const fixtures = documents.map((fixture) => ({
            ...fixture,
            leagueId: fixture.league.id,
        }));
        allFixtures = allFixtures.concat(fixtures);

        // Sort the fixtures with the priority for status.short in ["NS", "PT"]
        allFixtures.sort((a, b) => {
            const aPriority = liveStatus.includes(a.fixture.status.short)
                ? 0
                : 1;
            const bPriority = liveStatus.includes(b.fixture.status.short)
                ? 0
                : 1;

            if (aPriority !== bPriority) {
                return aPriority - bPriority;
            }

            // If both fixtures have the same priority, sort by fixture id
            return a.fixture.id - b.fixture.id;
        });

        // Group the fixtures by league
        const groupedFixtures: { [key: string]: any } = {};
        allFixtures.forEach((fixture) => {
            const leagueId = fixture.leagueId;
            if (!groupedFixtures[leagueId]) {
                groupedFixtures[leagueId] = {
                    league: fixture.league,
                    fixtures: [],
                };
            }
            groupedFixtures[leagueId].fixtures.push(fixture);
        });

        // Convert the grouped fixtures object into an array
        const groupedArray = Object.values(groupedFixtures);

        // Sort the grouped array by the number of fixtures with status.short in ["NS", "PT"]
        groupedArray.sort((a, b) => {
            const aCount = a.fixtures.filter((fixture: any) =>
                liveStatus.includes(fixture.fixture.status.short)
            ).length;
            const bCount = b.fixtures.filter((fixture: any) =>
                liveStatus.includes(fixture.fixture.status.short)
            ).length;

            if (aCount !== bCount) {
                return bCount - aCount;
            }

            // Sort by league id if counts are the same
            return a.league.id - b.league.id;
        });

        return groupedArray;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
