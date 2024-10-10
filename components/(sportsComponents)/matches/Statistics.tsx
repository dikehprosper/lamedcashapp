/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/react-in-jsx-scope */
import { FixtureDetail } from "@/components/LeagueComponent";
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    DimensionValue,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSelector } from "react-redux";

type Team = {
    id: number;
    name: string;
    logo: string;
};

type Statistic = {
    type: string;
    value: number | string | null;
};

type TeamData = {
    team: Team;
    statistics: Statistic[];
};

type ConvertedStatistic = {
    type: string;
    homeTeam: number | string | null;
    awayTeam: number | string | null;
};

export default function Statistics({
    fixture,
    statistics,
    loading,
}: {
    fixture: FixtureDetail;
    loading: boolean;
    statistics: TeamData[];
}) {
    function convertToStatisticsArray(data: TeamData[]): ConvertedStatistic[] {
        const statisticsDict: {
            [key: string]: { [key: string]: number | string | null };
        } = {};

        data.forEach((teamData) => {
            const teamName = teamData.team.name;
            teamData.statistics.forEach((stat) => {
                const statType = stat.type;
                const statValue = stat.value;
                if (!statisticsDict[statType]) {
                    statisticsDict[statType] = {};
                }
                statisticsDict[statType][teamName] = statValue;
            });
        });

        const statisticsArray: ConvertedStatistic[] = [];
        for (const statType in statisticsDict) {
            if (statisticsDict.hasOwnProperty(statType)) {
                statisticsArray.push({
                    type: statType,
                    homeTeam:
                        statisticsDict[statType][data[0].team.name] || null,
                    awayTeam:
                        statisticsDict[statType][data[1].team.name] || null,
                });
            }
        }

        return statisticsArray;
    }

    const statisticsArray = convertToStatisticsArray(statistics);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const getPercentage = (total: number, current: number) => {
        const decimal = current / total;
        return `${decimal * 100}%`;
    };
    function comparePercentages(
        home: string | number | null,
        away: string | number | null
    ) {
        // Remove the percentage sign and convert to number
        if (typeof home === "string" && typeof away === "string") {
            const num1 = parseFloat(home.replace("%", ""));
            const num2 = parseFloat(away.replace("%", ""));
            if (num1 > num2) {
                return "home";
            } else if (num1 < num2) {
                return "away";
            } else {
                return "neutral";
            }
        } else if (typeof home === "number" && typeof away === "number") {
            if (home > away) {
                return "home";
            } else if (home < away) {
                return "away";
            } else {
                return "neutral";
            }
        } else {
            return "neutral";
        }
    }
    return loading ? (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <ActivityIndicator color={Colors.default1} />
        </View>
    ) : statistics.length === 0 ? (
        <View
            style={{
                flex: 1,
                alignContent: "center",
                alignItems: "center",
                marginTop: 20,
            }}
        >
            <Text
                style={{
                    fontFamily: "sf",
                    color: Colors.welcomeText,
                    fontSize: 16,
                }}
            >
                No data available
            </Text>
        </View>
    ) : (
        <ScrollView>
            <View
                style={{ paddingVertical: 20, paddingHorizontal: 20, gap: 20 }}
            >
                {statisticsArray.map((item, e) => (
                    <View key={e} style={{ alignItems: "center", gap: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "sf-bold",
                                    color: Colors.welcomeText,
                                }}
                            >
                                {item.homeTeam ?? 0}
                            </Text>
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontFamily: "sf-bold",
                                }}
                            >
                                {item.type}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "sf-bold",
                                    color: Colors.welcomeText,
                                }}
                            >
                                {item.awayTeam ?? 0}
                            </Text>
                        </View>

                        <View style={styles.progressWrapper}>
                            <View
                                style={{
                                    ...styles.progressContainer,
                                    backgroundColor: Colors.statsContainer,
                                    flex: 1,
                                    justifyContent: "flex-end",
                                }}
                            >
                                <View
                                    style={{
                                        ...styles.progress,
                                        backgroundColor:
                                            comparePercentages(
                                                item.homeTeam,
                                                item.awayTeam
                                            ) === "home"
                                                ? Colors.default1
                                                : Colors.statsProgress,
                                        width:
                                            typeof item.homeTeam == "string"
                                                ? (item.homeTeam as DimensionValue)
                                                : (getPercentage(
                                                      Number(item.homeTeam) +
                                                          Number(item.awayTeam),
                                                      Number(item.homeTeam)
                                                  ) as DimensionValue),
                                    }}
                                ></View>
                            </View>
                            <View
                                style={{
                                    ...styles.progressContainer,
                                    backgroundColor: Colors.statsContainer,
                                    flex: 2,
                                }}
                            >
                                <View
                                    style={{
                                        ...styles.progress,
                                        backgroundColor:
                                            comparePercentages(
                                                item.homeTeam,
                                                item.awayTeam
                                            ) === "away"
                                                ? Colors.default1
                                                : Colors.statsProgress,
                                        width:
                                            typeof item.homeTeam == "string"
                                                ? (item.homeTeam as DimensionValue)
                                                : (getPercentage(
                                                      Number(item.homeTeam) +
                                                          Number(item.awayTeam),
                                                      Number(item.awayTeam)
                                                  ) as DimensionValue),
                                    }}
                                ></View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    progressWrapper: {
        flexDirection: "row",
        gap: 15,
        flex: 2,
    },
    progressContainer: {
        flexGrow: 1,
        height: 10,
        borderRadius: 99,
        flexDirection: "row",
    },
    progress: {
        borderRadius: 99,
        height: "100%",
    },
});
