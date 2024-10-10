/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import domain from "@/components/(Utils)/domain";
import LeagueComponent from "@/components/LeagueComponent";
import LeagueTilesLoader from "@/components/loader";
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { getGroupedFixturesByDate } from "@/utils/groupFixturesData";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";

export default function FixturesDay({ navigation, route }: any) {
    const [fixtures, setFixtures] = useState();
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) == 2 ? Color.darkMode : Color.lightMode;

    const fetchFixtures = async () => {
        console.log(route.params.date);
        const { data } = await fetch(
            `${domain}/api/fixtures` + `?date=${route.params.date}`,
        ).then((res) => res.json());
        // console.log(data);
        setFixtures(getGroupedFixturesByDate(data));
    };

    useEffect(() => {
        fetchFixtures();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
            <View
                style={{
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    // style={{ left: 10, top: 13 }}
                >
                    <Ionicons
                        name="chevron-back-outline"
                        size={22}
                        color={Colors.welcomeText}
                        opacity={0.3}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: "sf-bold",
                        fontSize: 16,
                        color: Colors.welcomeText,
                    }}
                >
                    Fixtures for {route.params.date}
                </Text>
                <View style={{ width: 22 }} />
            </View>
            <View style={{ paddingTop: 10 }}>
                {!fixtures ? (
                    <View
                        style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center",
                            marginTop: 50,
                        }}
                    >
                        <ActivityIndicator color={Colors.default1} />
                    </View>
                ) : (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 200 }}
                        keyExtractor={(item, index) => index.toString()}
                        initialNumToRender={10}
                        data={fixtures}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 25 }} />
                        )}
                        renderItem={({ item }) => (
                            <LeagueComponent
                                fixture={item}
                                navigation={navigation}
                            />
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
