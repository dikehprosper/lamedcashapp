/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { memo } from "react";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { FixtureDetail } from "./LeagueComponent";
import { liveStatus } from "@/constants/fixtures";

const Tile = ({
    navigation,
    fixture,
}: {
    navigation: any;
    fixture: FixtureDetail;
}) => {
    const tileWidth = Dimensions.get("screen").width * 1;

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const liveMatch = liveStatus.includes(fixture.fixture.status.short);

    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                borderRadius: 8,
                // width: tileWidth,
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: Colors.tileBody,
                gap: 10,
            }}
            onPress={() =>
                navigation.navigate("DisplayData", { fixture: fixture })
            }
        >
            <View
                style={{
                    flexDirection: "row",
                    width: 48,
                    backgroundColor: Colors.tileLeft,
                    borderBottomLeftRadius: 8,
                    borderTopLeftRadius: 8,
                }}
            >
                {liveMatch && (
                    <View
                        style={{
                            width: 3,
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 3,
                                height: 40,
                                backgroundColor: Colors.default1,
                                justifyContent: "flex-start",
                                alignSelf: "flex-start",
                                borderRadius: 90,
                            }}
                        />
                    </View>
                )}

                <View
                    style={{
                        width: 45,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {liveMatch ? (
                        <Text
                            style={{
                                fontSize: 16,
                                color: Colors.default1,
                                fontFamily: "sf-bold",
                            }}
                        >
                            {fixture.fixture.status.elapsed}'
                        </Text>
                    ) : fixture.fixture.status.short === "FT" ? (
                        <View style={{ alignItems: "center" }}>
                            <Text
                                style={{
                                    ...styles.text,
                                    color: Colors.welcomeText,
                                    fontSize: 12,
                                }}
                            >
                                {
                                    new Date(fixture.fixture.date)
                                        .toLocaleTimeString()
                                        .split(":")[0]
                                }
                                :
                                {
                                    new Date(fixture.fixture.date)
                                        .toLocaleTimeString()
                                        .split(":")[1]
                                }
                            </Text>
                            <Text
                                style={{
                                    ...styles.text,
                                    color: Colors.greyPost,
                                }}
                            >
                                FT
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{
                                    ...styles.text,
                                    color: Colors.welcomeText,
                                    fontSize: 12,
                                }}
                            >
                                {
                                    new Date(fixture.fixture.date)
                                        .toLocaleTimeString()
                                        .split(":")[0]
                                }
                                :
                                {
                                    new Date(fixture.fixture.date)
                                        .toLocaleTimeString()
                                        .split(":")[1]
                                }
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            {/* Team */}
            <View
                style={{
                    paddingVertical: 10,
                    width: tileWidth * 0.8,
                    gap: 5,
                    justifyContent: "center",

                    borderBottomRightRadius: 8,
                    borderTopRightRadius: 8,
                }}
            >
                {/* Home Team */}
                <View
                    style={{
                        flexDirection: "row",
                        height: 20,
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        source={{
                            uri: fixture.teams.home.logo,
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: "400",
                            color: Colors.welcomeText,
                            marginLeft: 5,
                            fontSize: 15,
                            width: tileWidth * 0.67,
                        }}
                    >
                        {fixture.teams.home.name}
                    </Text>
                    <View style={{ justifyContent: "center", width: 24 }}>
                        <Text
                            style={{
                                color: liveMatch
                                    ? Colors.default1
                                    : Colors.welcomeText,
                                fontWeight: "900",
                            }}
                        >
                            {fixture.goals.home}
                        </Text>
                    </View>
                </View>

                {/* Away Team */}
                <View
                    style={{
                        flexDirection: "row",
                        height: 20,
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        source={{
                            uri: fixture.teams.away.logo,
                        }}
                    />
                    <Text
                        style={{
                            fontWeight: "400",
                            color: Colors.welcomeText,
                            marginLeft: 5,
                            fontSize: 15,
                            width: tileWidth * 0.67,
                        }}
                    >
                        {fixture.teams.away.name}
                    </Text>
                    <View style={{ justifyContent: "center", width: 24 }}>
                        <Text
                            style={{
                                color: liveMatch
                                    ? Colors.default1
                                    : Colors.welcomeText,
                                fontWeight: "900",
                            }}
                        >
                            {fixture.goals.away}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "sf-bold",
    },
});

export default memo(Tile);
