/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
    View,
    StatusBar,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    Image,
} from "react-native";
import { Color } from "@/constants/Colors";
import ExploreHeader3 from "@/components/ExploreHeader3";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { statisticsData } from "@/constants/dummy";
import { FixtureData } from "@/components/LeagueComponent";

const Standings = ({ fixture }: { fixture: FixtureData }) => {
    const [standings, setStandings] = useState([]);
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const renderItem = ({ item }: any) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: item?.description?.includes("Promotion")
                        ? "#5742A926"
                        : item?.description?.includes("Relegation")
                        ? "#AD151930"
                        : "",
                    paddingVertical: 8,
                }}
            >
                <Text
                    style={[
                        styles.item,
                        {
                            color: Colors.welcomeText,
                        },
                    ]}
                >
                    {item?.rank}
                </Text>
                <View
                    style={[
                        {
                            width: 280,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        },
                    ]}
                >
                    <Image
                        resizeMode="cover"
                        source={{ uri: item.team.logo }}
                        style={{ height: 25, width: 25 }}
                    />
                    <Text
                        style={[
                            styles.item,
                            {
                                color: Colors.welcomeText,
                                flexGrow: 1,
                                textAlign: "left",
                            },
                        ]}
                    >
                        {item?.team.name}
                    </Text>
                </View>
                <Text style={[styles.item, { color: Colors.welcomeText }]}>
                    {item?.all.played}
                </Text>
                <Text style={[styles.item, { color: Colors.welcomeText }]}>
                    {item?.all.win}
                </Text>
                <Text style={[styles.item, { color: Colors.welcomeText }]}>
                    {item?.all.draw}
                </Text>
                <Text style={[styles.item, { color: Colors.welcomeText }]}>
                    {item?.all.lose}
                </Text>
                <Text style={[styles.item, { color: Colors.welcomeText }]}>
                    {item?.goalsDiff}
                </Text>
                <Text style={[styles.item, { color: Colors.welcomeText }]}>
                    {item?.points}
                </Text>
            </View>
        );
    };

    const fetchStandings = async () => {
        try {
            const { success, message, data } = await fetch(
                "https://betfundr-backend.vercel.app/api/fixtures/standings" +
                    `?league=${fixture.league.id}&season=${fixture.league.season}`
            ).then((res) => res.json());

            console.log(data);
            if (success) {
                setStandings(data[0].league.standings[0]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchStandings();
    }, []);

    return (
        <View>
            <ScrollView horizontal={true}>
                <View style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Text
                            style={[
                                styles.title,
                                {
                                    color: Colors.welcomeText,
                                },
                            ]}
                        >
                            #
                        </Text>
                        <Text
                            style={[
                                styles.title,
                                {
                                    color: Colors.welcomeText,
                                    width: 280,
                                    textAlign: "left",
                                },
                            ]}
                        >
                            Team
                        </Text>
                        <Text
                            style={[
                                styles.title,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            MP
                        </Text>
                        <Text
                            style={[
                                styles.title,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            W
                        </Text>
                        <Text
                            style={[
                                styles.title,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            D
                        </Text>
                        <Text
                            style={[
                                styles.title,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            L
                        </Text>
                        <Text
                            style={[
                                styles.title,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            GD
                        </Text>
                        <Text
                            style={[
                                styles.title,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            P
                        </Text>
                    </View>
                    <FlatList
                        data={standings}
                        keyExtractor={(item: any) => item.team.id.toString()}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <View
                                    style={{
                                        width: "95%",
                                        height: 1,
                                        backgroundColor: Colors.welcomeText,
                                        opacity: 0.3,
                                    }}
                                ></View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: "sf-bold",
        fontSize: 16,
        textAlign: "center",
        width: 40,
    },
    item: {
        fontFamily: "sf",
        fontSize: 16,
        textAlign: "center",
        width: 40,
    },
});

export default Standings;
