/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Language } from "@/constants/languages";
import {
    NavigationState,
    SceneMap,
    SceneRendererProps,
    TabBar,
    TabBarIndicator,
    TabView,
} from "react-native-tab-view";
import Lineups from "./(sportsComponents)/matches/Lineups";
import Statistics from "./(sportsComponents)/matches/Statistics";
import Overview from "./(sportsComponents)/matches/Overview";
import ExploreHeader3 from "./ExploreHeader3";
import { FixtureDetail } from "./LeagueComponent";
import socket from "@/utils/socket";
import { finishedStatus, liveStatus } from "@/constants/fixtures";
import { current } from "@reduxjs/toolkit";

export default function DisplayData({
    navigation,
    route: {
        params: { fixture },
    },
}: {
    navigation: any;
    route: any;
}) {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) == 2 ? Color.darkMode : Color.lightMode;

    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;
    const [currentState, setCurrentState] = useState(languageText.text170);
    const [fixtureData, setFixture] = useState(fixture);
    // const [isLoading, setLoading] = useState(false);
    const [isStatisticsLoading, setStatsLoading] = useState(false);
    const [isEventsLoading, setEventsLoading] = useState(false);
    const [isLineupsLoading, setLineupsLoading] = useState(false);
    const [lineupsData, setLineups] = useState([]);
    const [statisticsData, setStatistics] = useState([]);
    const [eventData, setEvent] = useState([]);

    const layout = useWindowDimensions();
    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case "overview":
                return (
                    <Overview
                        isFulltime={finishedStatus.includes(
                            fixtureData?.fixture.status.short
                        )}
                        fulltimeScores={fixtureData.goals}
                        halftimeScore={fixtureData.score.halftime}
                        loading={isEventsLoading}
                        fixture={fixtureData}
                        events={eventData}
                    />
                );
            case "lineups":
                return (
                    <Lineups
                        loading={isLineupsLoading}
                        lineups={lineupsData}
                        fixture={fixtureData}
                    />
                );
            case "stats":
                return (
                    <Statistics
                        loading={isStatisticsLoading}
                        fixture={fixtureData}
                        statistics={statisticsData}
                    />
                );
            default:
                return null;
        }
    };

    const date = new Date(fixture?.fixture?.date);
    const dayOfWeek = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
    }).format(date);
    const day = new Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(
        date
    );
    const monthYear = new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric",
    }).format(date);
    const time = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);
    const formattedDate = `${dayOfWeek}, ${day} ${monthYear} at ${time}`;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "overview", title: languageText.text170 },
        { key: "lineups", title: languageText.text171 },
        { key: "stats", title: languageText.text172 },
    ]);

    const renderTabBar = (
        props: SceneRendererProps & {
            navigationState: NavigationState<{ key: string; title: string }>;
        }
    ) => {
        return (
            <TabBar
                {...props}
                tabStyle={{ width: "auto" }}
                gap={10}
                style={{
                    backgroundColor: "none",
                    elevation: 0,
                }}
                indicatorStyle={{
                    backgroundColor: Colors.default1,
                }}
                labelStyle={{
                    textTransform: "none",
                    fontSize: 15,
                    fontFamily: "sf-bold",
                }}
                activeColor={Colors.default1}
                inactiveColor={Colors.tabbarLabelColor}
            />
        );
    };

    const fetchDetails = async () => {
        try {
            setStatsLoading(true);
            setLineupsLoading(true);
            setEventsLoading(true);
            console.log("fetching details");

            const { data: events } = await fetch(
                "https://dev.api.betfundr.com/api/fixtures/events" +
                    `?fixture=${fixtureData.fixture.id}`
            ).then((res) => res.json());
            setEventsLoading(false);
            setEvent(events);

            const { data: lineups } = await fetch(
                "https://dev.api.betfundr.com/api/fixtures/lineups" +
                    `?fixture=${fixtureData.fixture.id}`
            ).then((res) => res.json());
            setLineups(lineups);
            setLineupsLoading(false);

            const { data: statistics } = await fetch(
                "https://dev.api.betfundr.com/api/fixtures/statistics" +
                    `?fixture=${fixtureData.fixture.id}`
            ).then((res) => res.json());
            setStatistics(statistics);
            setStatsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (
            finishedStatus.includes(fixtureData.fixture.status.short) ||
            liveStatus.includes(fixtureData.fixture.status.short)
        ) {
            fetchDetails();
        }
        if (liveStatus.includes(fixtureData.fixture.status.short)) {
            socket.on("live games", ({ liveFixtures }) => {
                const currentGame = liveFixtures.filter(
                    (item: any) =>
                        item.fixture.fixture.id === fixtureData.fixture.id
                );
                setFixture(currentGame[0]?.fixture);
                setLineups(currentGame[0]?.lineups);
                setStatistics(currentGame[0]?.statistics);
                setEvent(currentGame[0]?.events);
            });
        }

        return () => {
            socket.off("live games", () => console.log("out of live games"));
        };
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.background,
            }}
        >
            <ExploreHeader3 />
            <StatusBar backgroundColor={Colors.background} />
            <View
                style={[
                    styles.container,
                    { backgroundColor: Colors.background, flex: 1 },
                ]}
            >
                <View
                    style={[
                        styles.header,
                        {
                            backgroundColor: Colors.footballBackground,
                            position: "relative",
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ position: "absolute", left: 10, top: 13 }}
                    >
                        <Ionicons
                            name="chevron-back-outline"
                            size={22}
                            color={Colors.welcomeText}
                            opacity={0.3}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: Colors.welcomeText,
                                fontFamily: "sf-bold",
                            },
                        ]}
                    >
                        {fixtureData?.league.name}
                    </Text>
                    <Text style={[styles.date, { color: Colors.welcomeText }]}>
                        {formattedDate}
                    </Text>
                    <View style={[styles.teams, { marginVertical: 12 }]}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                height: 80,
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                source={{
                                    uri: fixtureData.teams.home.logo,
                                }}
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                            />
                            <Text
                                style={[
                                    styles.team,
                                    { color: Colors.welcomeText, marginTop: 5 },
                                ]}
                            >
                                {fixtureData?.teams.home.name}
                            </Text>
                        </View>
                        <View style={[styles.teams2]}>
                            {!liveStatus.includes(
                                fixtureData?.fixture.status.short
                            ) && (
                                <Text
                                    style={[
                                        styles.score2,
                                        {
                                            color: liveStatus.includes(
                                                fixtureData.fixture.status.short
                                            )
                                                ? Colors.default1
                                                : Colors.welcomeText,
                                            opacity: 0.5,
                                            marginBottom: 3,
                                        },
                                    ]}
                                >
                                    {fixtureData.fixture.status.long}
                                </Text>
                            )}
                            <Text
                                style={[
                                    styles.score,
                                    {
                                        color: liveStatus.includes(
                                            fixtureData.fixture.status.short
                                        )
                                            ? Colors.default1
                                            : Colors.welcomeText,
                                    },
                                ]}
                            >
                                {fixtureData.goals.home} -{" "}
                                {fixtureData.goals.away}
                            </Text>
                            {liveStatus.includes(
                                fixtureData.fixture.status.short
                            ) ? (
                                <Text
                                    style={[
                                        styles.score2,
                                        {
                                            color: Colors.default1,
                                            marginTop: 3,
                                            fontSize: 14,
                                        },
                                    ]}
                                >
                                    {fixtureData.fixture.status.long}-{" "}
                                    {fixtureData.fixture.status.elapsed}'
                                </Text>
                            ) : (
                                <Text
                                    style={[
                                        styles.score2,
                                        {
                                            color: Colors.welcomeText,
                                            opacity: 0.5,
                                            marginTop: 3,
                                        },
                                    ]}
                                >
                                    HT {fixtureData.score.halftime.home} -{" "}
                                    {fixtureData.score.halftime.away}
                                </Text>
                            )}
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                height: 80,
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                source={{
                                    uri: fixtureData?.teams.away.logo,
                                }}
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                            />
                            <Text
                                style={[
                                    styles.team,
                                    {
                                        color: Colors.welcomeText,
                                        marginTop: 5,
                                    },
                                ]}
                            >
                                {fixtureData?.teams.away.name}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 3,
                            marginTop: 10,
                            marginBottom: 4,
                        }}
                    >
                        <Text
                            style={[
                                styles.location,
                                {
                                    color: Colors.welcomeText,
                                    fontSize: 15,
                                    fontWeight: "300",
                                },
                            ]}
                        >
                            {fixtureData.fixture.venue.name},
                        </Text>
                        <Text
                            style={[
                                styles.location,
                                { color: Colors.welcomeText, fontSize: 15 },
                            ]}
                        >
                            {fixtureData.fixture.venue.city}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: Colors.background,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                ></View>

                <TabView
                    sceneContainerStyle={{ flex: 1 }}
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        padding: 7,
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
    },
    date: {
        fontSize: 12,
        color: "#666",
        marginBottom: 8,
        opacity: 0.7,
        marginTop: 2,
        fontFamily: "sf",
    },
    teams: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    teams2: {
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 6,
        flex: 1,
    },
    team: {
        fontSize: 16,
        flex: 1,
        textAlign: "center",
        fontWeight: "500",
        flexDirection: "column",
        display: "flex",
        fontFamily: "sf-bold",
    },
    score: {
        fontSize: 20,
        fontWeight: "500",
        color: "#333",
        textAlign: "center",
        fontFamily: "sf-bold",
    },
    score2: {
        fontSize: 12,
        fontWeight: "300",
        textAlign: "center",
        fontFamily: "sf-bold",
    },
    location: {
        fontSize: 16,
        fontFamily: "sf-bold",
    },

    timeline: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        backgroundColor: "#fff",
        marginBottom: 4,
        borderRadius: 4,
    },
    event: {
        fontSize: 14,
        color: "#333",
    },
});
