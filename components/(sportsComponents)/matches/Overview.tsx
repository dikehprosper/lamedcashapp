/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    FlatList,
    StatusBar,
    useWindowDimensions,
    ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Language } from "@/constants/languages";
import { overviewData } from "@/constants/dummy";
import { FixtureDetail } from "@/components/LeagueComponent";
import OverviewItem from "./OverviewItem";

export interface Time {
    elapsed: number;
    extra: number | null;
}

export interface Team {
    id: number;
    name: string;
    logo: string;
}

export interface Player {
    id: number;
    name: string;
}

export interface Assist {
    id: number | null;
    name: string | null;
}

export interface Event {
    time: Time;
    team: Team;
    player: Player;
    assist: Assist;
    type: string;
    detail: string;
    comments: string | null;
}

export default function Overview({
    fixture,
    events,
    loading,
    halftimeScore,
    fulltimeScores,
    isFulltime,
}: {
    fixture: FixtureDetail;
    events: Event[];
    loading: boolean;
    halftimeScore: any;
    fulltimeScores: any;
    isFulltime: any;
}) {
    const today = new Date(fixture.fixture.date);
    const invertedEvents = [...events].reverse();
    const indexOfHalfTime = invertedEvents.findIndex(
        (e) => e.time.elapsed <= 45
    );
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) == 2 ? Color.darkMode : Color.lightMode;

    return loading ? (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <ActivityIndicator color={Colors.default1} />
        </View>
    ) : events.length === 0 ? (
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
        <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
            <View
                style={{
                    height: 32,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 6,
                }}
            >
                <Image
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/left-icon%20(1).png?alt=media&token=7ebeb5a8-bdce-434f-a522-1246aa9f1390",
                    }}
                    style={{
                        width: 16,
                        height: 16,
                    }}
                />
                <Text
                    style={{ color: Colors.welcomeText, fontFamily: "sf-bold" }}
                >
                    {fixture.fixture.referee}
                </Text>
            </View>

            <FlatList
                snapToStart={true}
                contentContainerStyle={{
                    paddingVertical: 16,
                }}
                data={invertedEvents}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 8,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: Colors.greyPost,
                                height: 20,
                                width: 1,
                            }}
                        />
                    </View>
                )}
                keyExtractor={(item) => JSON.stringify(item)}
                renderItem={({ item }) => (
                    <OverviewItem
                        isFulltime={isFulltime}
                        fulltimeItem={invertedEvents[0] === item}
                        fulltimeScores={fulltimeScores}
                        halftimeScores={halftimeScore}
                        halftimeItem={invertedEvents[indexOfHalfTime] === item}
                        colors={Colors}
                        homeTeam={fixture.teams.home.id}
                        awayTeam={fixture.teams.away.id}
                        item={item}
                    />
                )}
            />

            <View
                style={{
                    // height: 150,
                    backgroundColor: Colors.toastText,
                    flexDirection: "row",
                    gap: 13,
                    padding: 20,
                    flexWrap: "wrap",
                }}
            >
                <View
                    style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: Colors.welcomeText,
                            opacity: 0.5,
                            fontSize: 13,
                            fontFamily: "sf-bold",
                        }}
                    >
                        {languageText.text173}
                    </Text>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/substitution.png?alt=media&token=2951725e-2dc6-4e43-a4c9-341d0b9533d4",
                        }}
                        style={{
                            width: 18,
                            height: 18,
                        }}
                    />
                </View>
                <View
                    style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: Colors.welcomeText,
                            opacity: 0.5,
                            fontSize: 13,
                            fontFamily: "sf-bold",
                        }}
                    >
                        {languageText.text174}
                    </Text>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/red-card.png?alt=media&token=f5a23dab-e6ad-4d24-8f48-e74983e1be75",
                        }}
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    />
                </View>
                <View
                    style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: Colors.welcomeText,
                            opacity: 0.5,
                            fontSize: 13,
                        }}
                    >
                        {languageText.text175}
                    </Text>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/yellow-card.png?alt=media&token=ed39704b-70cc-4e57-8594-fa27d118378a",
                        }}
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    />
                </View>

                <View
                    style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: Colors.welcomeText,
                            opacity: 0.5,
                            fontSize: 13,
                        }}
                    >
                        {languageText.text176}
                    </Text>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/corner.png?alt=media&token=22653787-8b20-4b7a-acd5-84a26e69ba59",
                        }}
                        style={{
                            width: 14,
                            height: 16,
                        }}
                    />
                </View>
                <View
                    style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: Colors.welcomeText,
                            opacity: 0.5,
                            fontSize: 13,
                        }}
                    >
                        {languageText.text177}
                    </Text>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Goal.png?alt=media&token=3d88a3a8-82b4-4f50-8bc4-45802a525f7e",
                        }}
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    />
                </View>
                <View
                    style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: Colors.welcomeText,
                            opacity: 0.5,
                            fontSize: 13,
                        }}
                    >
                        {languageText.text178}
                    </Text>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Own-goal.png?alt=media&token=d80d592d-8406-4791-b4ee-b7bb8e3bbe15",
                        }}
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    />
                </View>
                <View
                    style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: Colors.welcomeText,
                            opacity: 0.5,
                            fontSize: 13,
                        }}
                    >
                        {languageText.text179}
                    </Text>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/penalty.png?alt=media&token=f3ac62bd-a7f2-4f39-b70e-908896bc72d9",
                        }}
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    />
                </View>
                <View
                    style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}
                >
                    <Text
                        style={{
                            fontWeight: 400,
                            color: Colors.welcomeText,
                            opacity: 0.5,
                            fontSize: 13,
                        }}
                    >
                        {languageText.text180}
                    </Text>
                    <Image
                        source={{
                            uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/penalty-missed.png?alt=media&token=2e92c395-137d-4450-a51c-009158678ed1",
                        }}
                        style={{
                            width: 14,
                            height: 16,
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

function FootballSections({ Colors, data }: any) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    height: 30,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    width: "97%",
                    backgroundColor: Colors.footballBackground,
                    borderRadius: 7,
                }}
            >
                <Text
                    style={{
                        color: Colors.welcomeText,
                        fontSize: 14,
                        fontWeight: "500",
                    }}
                >
                    {data.secondHalf?.scores}
                </Text>
            </View>
            {data.secondHalf.notifications.map((data: any, index: number) => (
                <FootballMinimalSections
                    Colors={Colors}
                    substitutionForHomeEntry={data.substitutionForHomeEntry}
                    substitutionForHomeOut={data.substitutionForHomeOut}
                    substitutionForAwayEntry={data.substitutionForAwayEntry}
                    substitutionForAwayOut={data.substitutionForAwayOut}
                    goalScorer={data.goalScorer}
                    currentScore={data.currentScore}
                    image={
                        <Image
                            source={{
                                uri: data.image,
                            }}
                            style={{
                                width: 18,
                                height: 18,
                            }}
                        />
                    }
                    time={data.time}
                    key={index}
                />
            ))}

            <View
                style={{
                    flex: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 6,
                }}
            >
                <Text
                    style={{
                        backgroundColor: Colors.footballBackgroundLinking,
                    }}
                ></Text>
            </View>

            <View
                style={{
                    height: 30,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    width: "97%",
                    backgroundColor: Colors.footballBackground,
                    borderRadius: 7,
                }}
            >
                <Text
                    style={{
                        color: Colors.welcomeText,
                        fontSize: 14,
                        fontWeight: "500",
                    }}
                >
                    {data.firstHalf?.scores}
                </Text>
            </View>
            {data.firstHalf.notifications.map((data: any, index: number) => (
                <FootballMinimalSections
                    Colors={Colors}
                    substitutionForHomeEntry={data.substitutionForHomeEntry}
                    substitutionForHomeOut={data.substitutionForHomeOut}
                    substitutionForAwayEntry={data.substitutionForAwayEntry}
                    substitutionForAwayOut={data.substitutionForAwayOut}
                    goalScorer={data.goalScorer}
                    currentScore={data.currentScore}
                    image={
                        <Image
                            source={{
                                uri: data.image,
                            }}
                            style={{
                                width: 16,
                                height: 16,
                            }}
                        />
                    }
                    time={data.time}
                    key={index}
                />
            ))}
            <View
                style={{
                    flex: 1,
                    height: 32,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 6,
                }}
            >
                {/* <Image
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Group.png?alt=media&token=36ef1eb3-280f-4bfa-b26a-48454b4cdc84",
                    }}
                    style={{
                        width: 14,
                        height: 16,
                    }}
                /> */}
                <Image
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/left-icon%20(1).png?alt=media&token=7ebeb5a8-bdce-434f-a522-1246aa9f1390",
                    }}
                    style={{
                        width: 16,
                        height: 16,
                    }}
                />

                <Text style={{ fontSize: 14, color: Colors.welcomeText }}>
                    M. Oliver
                </Text>
            </View>
        </View>
    );
}
function FootballMinimalSections({
    Colors,
    substitutionForHomeEntry,
    substitutionForHomeOut,
    image,
    time,
    substitutionForAwayEntry,
    substitutionForAwayOut,
    goalScorer,
    currentScore,
}: any) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "97%",
                borderRadius: 7,
            }}
        >
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 7,
                }}
            >
                <Text
                    style={{
                        backgroundColor: Colors.footballBackgroundLinking,
                    }}
                ></Text>
            </View>
            <View
                style={{
                    flex: 1,
                    width: "100%",

                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 22,
                    marginBottom: 7,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                    }}
                >
                    {substitutionForHomeEntry && substitutionForHomeOut ? (
                        <>
                            <Text
                                style={{
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: Colors.welcomeText,
                                }}
                            >
                                {substitutionForHomeEntry}
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "300",
                                    fontSize: 12,
                                    color: Colors.welcomeText,
                                }}
                            >
                                {substitutionForHomeOut}
                            </Text>
                        </>
                    ) : null}
                    {goalScorer && (
                        <Text
                            style={{
                                fontWeight: "400",
                                fontSize: 12,
                                color: Colors.welcomeText,
                            }}
                        >
                            {goalScorer}
                        </Text>
                    )}
                </View>

                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        height: "100%",
                    }}
                >
                    {image}
                    <Text
                        style={{
                            fontSize: 14,
                            color: Colors.welcomeText,
                            marginLeft: 3,
                            marginTop: 3,
                        }}
                    >
                        {time}
                    </Text>

                    {currentScore && (
                        <View
                            style={{
                                marginTop: 4,
                                paddingHorizontal: 7,
                                paddingVertical: 3,
                                borderRadius: 10,
                                backgroundColor: Colors.default3,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: Colors.welcomeText,
                                }}
                            >
                                {currentScore}
                            </Text>
                        </View>
                    )}
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                    }}
                >
                    {substitutionForAwayEntry && substitutionForAwayOut ? (
                        <>
                            <Text
                                style={{
                                    fontWeight: "400",
                                    fontSize: 12,
                                    color: Colors.welcomeText,
                                }}
                            >
                                {substitutionForAwayEntry}
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "300",
                                    fontSize: 12,
                                    color: Colors.welcomeText,
                                }}
                            >
                                {substitutionForAwayOut}
                            </Text>
                        </>
                    ) : null}
                </View>
            </View>
        </View>
    );
}
