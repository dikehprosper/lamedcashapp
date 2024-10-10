/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Image,
    ActivityIndicator,
} from "react-native";
import { ImageBackground } from "expo-image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Color } from "@/constants/Colors";
import PlayerCircle from "./playerCircle";
import { FixtureDetail } from "@/components/LeagueComponent";
import { useEffect, useState } from "react";
import { LineupType } from "@/constants/interfaces";

export type Player = {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string;
};

type PlayerWrapper = {
    player: Player;
};

type GridPlayer = Player & {
    row: number;
    col: number;
};

export default function Lineups({
    fixture,
    lineups,
    loading,
}: {
    fixture: FixtureDetail;
    lineups: LineupType[];
    loading: boolean;
}) {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const layout = useWindowDimensions();
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const groupedHomeByRow = lineups?.[0]?.startXI.reduce<
        Record<number, GridPlayer[]>
    >((acc, curr) => {
        const [row, col] = curr.player.grid!.split(":").map(Number);
        if (!acc[row]) acc[row] = [];
        //@ts-ignore
        acc[row].push({ ...curr.player, row, col }!);
        return acc;
    }, {});

    const sortedHome = groupedHomeByRow
        ? Object.keys(groupedHomeByRow)
              .sort((a, b) => Number(a) - Number(b))
              .map((row) =>
                  groupedHomeByRow[Number(row)].sort((a, b) => a.col - b.col)
              )
        : null;
    const homeArray = sortedHome?.map((row) => row.map((player) => player));

    // Away lineup
    const groupedAwayByRow = lineups?.[1]?.startXI.reduce<
        Record<number, GridPlayer[]>
    >((acc, curr) => {
        const [row, col] = curr.player.grid!.split(":").map(Number);
        if (!acc[row]) acc[row] = [];
        //@ts-ignore
        acc[row].push({ ...curr.player, row, col });
        return acc;
    }, {});

    const sortedAway = groupedAwayByRow
        ? Object.keys(groupedAwayByRow)
              .sort((a, b) => Number(a) - Number(b))
              .map((row) =>
                  groupedAwayByRow[Number(row)].sort((a, b) => a.col - b.col)
              )
        : null;
    const awayArray = sortedAway?.map((row) => row.map((player) => player));

    return loading ? (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <ActivityIndicator color={Colors.default1} />
        </View>
    ) : lineups.length === 0 ? (
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
        <ScrollView style={{ ...styles.container }}>
            <View style={{ paddingVertical: 20 }}>
                <View style={styles.homeDetails}>
                    <Text
                        style={{
                            ...styles.clubTitle,
                            color: Colors.welcomeText,
                        }}
                    >
                        {lineups?.[0]?.team.name}
                    </Text>
                    <Text
                        style={{
                            ...styles.formation,
                            color: Colors.welcomeText,
                        }}
                    >
                        {lineups?.[0]?.formation}
                    </Text>
                </View>
                <ImageBackground
                    source={require("../../../assets/images/field.jpg")}
                    style={{}}
                >
                    <View
                        style={{
                            ...styles.pitchContainer,
                            height: (layout.width - 40) * 1.807,
                        }}
                    >
                        <View
                            style={{
                                ...styles.homeHalf,
                                gap:
                                    homeArray?.length === 4
                                        ? (layout.width - 40) * 1.807 * 0.09
                                        : (layout.width - 40) * 1.807 * 0.055,
                            }}
                        >
                            {homeArray?.map((item, key) => (
                                <View
                                    key={key}
                                    style={{
                                        flexDirection: "row",
                                        gap:
                                            item.length == 5
                                                ? layout.width * 0.11
                                                : layout.width * 0.15,
                                    }}
                                >
                                    {item.map((item, e) => (
                                        <PlayerCircle
                                            key={e}
                                            backgroundColor="#C94038"
                                            borderColor="#FFA39E"
                                            player={item}
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                        <View
                            style={{
                                ...styles.awayHalf,
                                flexDirection: "column-reverse",
                                gap:
                                    awayArray?.length === 4
                                        ? (layout.width - 40) * 1.807 * 0.09
                                        : (layout.width - 40) * 1.807 * 0.055,
                            }}
                        >
                            {awayArray?.map((item, key) => (
                                <View
                                    key={key}
                                    style={{
                                        flexDirection: "row-reverse",
                                        gap:
                                            item.length === 5
                                                ? layout.width * 0.08
                                                : layout.width * 0.15,
                                    }}
                                >
                                    {item.map((item, e) => (
                                        <PlayerCircle
                                            key={e}
                                            player={item}
                                            backgroundColor="#3465D1"
                                            borderColor="#93C5FD"
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.awayDetails}>
                    <Text
                        style={{
                            ...styles.clubTitle,
                            color: Colors.welcomeText,
                        }}
                    >
                        {lineups?.[1]?.team.name}
                    </Text>
                    <Text
                        style={{
                            ...styles.formation,
                            color: Colors.welcomeText,
                        }}
                    >
                        {lineups?.[1]?.formation}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    image: { objectFit: "contain" },
    pitchContainer: { height: "100%" },
    clubTitle: { fontFamily: "sf-bold", fontSize: 15 },
    formation: { fontFamily: "sf-bold", fontSize: 15, marginLeft: "auto" },
    homeDetails: {
        backgroundColor: "#127344",
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: "row",
    },
    awayDetails: {
        backgroundColor: "#127344",
        padding: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: "row",
    },
    homeHalf: {
        alignItems: "center",
        alignContent: "center",
        // gap: 35,
        marginTop: 30,
    },
    awayHalf: {
        alignItems: "center",
        // alignContent: "center",
        // gap: 35,
        marginTop: "auto",
        marginBottom: 30,
    },
});
