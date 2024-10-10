/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { memo } from "react";
import Tile from "./tile";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Color } from "@/constants/Colors";
import { SvgUri } from "react-native-svg";
import fixtures from "@/state/fixtures";

type League = {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
};

type Periods = {
    first: number;
    second: number;
};

type Venue = {
    id: number | null;
    name: string;
    city: string;
};

type Status = {
    long: string;
    short: string;
    elapsed: number;
};

type Fixture = {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: Periods;
    venue: Venue;
    status: Status;
};

type Team = {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
};

type Teams = {
    home: Team;
    away: Team;
};

type Goals = {
    home: number;
    away: number;
};

type ScoreDetail = {
    home: number | null;
    away: number | null;
};

type Score = {
    halftime: ScoreDetail;
    fulltime: ScoreDetail;
    extratime: ScoreDetail;
    penalty: ScoreDetail;
};

export type FixtureDetail = {
    fixture: Fixture;
    league: League;
    teams: Teams;
    goals: Goals;
    score: Score;
    events: any;
    _id: string;
};

export type FixtureData = {
    league: League;
    fixtures: FixtureDetail[];
};

const LeagueComponent = ({
    navigation,
    fixture,
}: {
    navigation: any;
    fixture: FixtureData;
}) => {
    const deviceWidth = Dimensions.get("screen").width * 0.96;
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    return (
        <View
            style={{
                width: deviceWidth,
                alignSelf: "center",
                gap: 4,
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate("LeaguePage", { fixture })}
            >
                <View
                    style={{
                        flexDirection: "row",
                        height: 36,
                        alignItems: "center",
                    }}
                >
                    <View style={{ width: deviceWidth * 0.1 }}>
                        <Image
                            resizeMode="contain"
                            style={{
                                // width: 30,
                                height: 30,
                                marginRight: 10,
                            }}
                            source={{
                                uri: fixture.league.logo,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: deviceWidth * 0.84,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontWeight: "700",
                                fontSize: 14,
                            }}
                        >
                            {fixture.league.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                // width: 66,
                                marginLeft: 10,
                                alignItems: "center",
                            }}
                        >
                            <SvgUri
                                uri={fixture.league.flag}
                                height={16}
                                width={16}
                            />
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    opacity: 0.5,
                                    marginLeft: 5,
                                    fontSize: 12,
                                    fontWeight: "900",
                                }}
                            >
                                {fixture.league.country}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: deviceWidth * 0.2,
                            marginRight: 10,
                            height: 24,
                            alignItems: "flex-start",
                        }}
                    >
                        <MaterialIcons
                            color={Colors.welcomeText}
                            name="keyboard-arrow-right"
                            size={23}
                            fontWeight="900"
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <FlatList
                keyExtractor={(item, index) => item.fixture.id.toString()}
                data={fixture.fixtures.slice(0, 3)}
                renderItem={({ item }: any) => (
                    <Tile fixture={item} navigation={navigation} />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
        </View>
    );
};

export default memo(LeagueComponent);
