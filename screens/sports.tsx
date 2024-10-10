/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Text,
    StatusBar,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch } from "react-redux";
import {
    Header1,
    Header2,
} from "@/components/(sportsComponents)/matches/matches";
import DatePicker2 from "react-native-modern-datepicker";
import LeagueComponent from "@/components/LeagueComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllGames from "@/components/(sportsComponents)/matches/AllGames";
import {
    fetchFixtures,
    removeDateFilter,
    setFinished,
    setFixtures,
    setLive,
    setUpcoming,
    updateFixtures,
} from "@/state/fixtures";
import socket from "@/utils/socket";
import { getGroupedFixturesByDate } from "@/utils/groupFixturesData";
import { finishedStatus, liveStatus } from "@/constants/fixtures";
import LiveGames from "@/components/(sportsComponents)/matches/LiveGames";
import FinishedGames from "@/components/(sportsComponents)/matches/FinishedGames";
import UpcomingGames from "@/components/(sportsComponents)/matches/UpcomingGames";
import LeagueTilesLoader from "@/components/loader";
import { ActivityIndicator } from "react-native";

export const baseUrl = "https://dev.api.betfundr.com";

const Sports = ({ navigation }: any) => {
    interface DataType {
        // Add the properties you expect in your data objects here
        // For example:
        id?: number;
        name?: string;
    }

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const [active, setActive] = useState(1);
    const fixtures = useSelector(
        (state: RootState) => state.fixturesSlice.fixtures
    );
    const isLoading = useSelector(
        (state: RootState) => state.fixturesSlice.isLoading
    );

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        console.log("about to connect");
        dispatch(fetchFixtures());
        dispatch(removeDateFilter());
        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("fixtures", (msg: any) => {
            console.log("fixtures fetched");
            dispatch(setFixtures(getGroupedFixturesByDate(msg.fixture)));
            dispatch(
                setLive(
                    getGroupedFixturesByDate(
                        msg.fixture.filter((item: any) =>
                            liveStatus.includes(item.fixture.status.short)
                        )
                    )
                )
            );
            dispatch(
                setUpcoming(
                    getGroupedFixturesByDate(
                        msg.fixture.filter(
                            (item: any) => item.fixture.status.short === "NS"
                        )
                    )
                )
            );
            dispatch(
                setFinished(
                    getGroupedFixturesByDate(
                        msg.fixture.filter((item: any) =>
                            finishedStatus.includes(item.fixture.status.short)
                        )
                    )
                )
            );
        });

        return () => {
            socket.off("connect", () => {});
            socket.off("fixtures", () => {});
        };
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.background,
            }}
        >
            <StatusBar backgroundColor={Colors.background} />
            <Header1
                backgroundColor={Colors.background}
                textColor={Colors.welcomeText}
            />
            <Header2
                textColor={Colors.welcomeText}
                defaultColor={Colors.default1}
                setActive={setActive}
                active={active}
                fixtures={fixtures}
            />
            {active === 1 ? (
                <AllGames Colors={Colors} navigation={navigation} />
            ) : active === 2 ? (
                <LiveGames Colors={Colors} navigation={navigation} />
            ) : active === 3 ? (
                <UpcomingGames Colors={Colors} navigation={navigation} />
            ) : (
                <FinishedGames Colors={Colors} navigation={navigation} />
            )}
        </SafeAreaView>
    );
};

export default Sports;
