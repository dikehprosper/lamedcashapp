/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LeagueComponent from "@/components/LeagueComponent";
import {
    FlatList,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DatePicker2 from "react-native-modern-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useState } from "react";

export default function LiveGames({
    navigation,
    Colors,
}: {
    navigation: any;
    Colors: any;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const fixtures = useSelector(
        (state: RootState) => state.fixturesSlice.liveFixtures
    );
    const [date, setDate] = useState<any>();
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    function selectedStart(dateStr: any) {
        // const selectedDate = convertToISODate(dateStr);
        setDate(dateStr);
        // console.log(dateStr, "000000000");
    }
    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };
    return (
        <View>
            {fixtures.length === 0 ? (
                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Text
                        style={{
                            marginTop: 20,
                            color: Colors.welcomeText,
                            fontSize: 16,
                            fontFamily: "sf-bold",
                        }}
                    >
                        No live games currently
                    </Text>
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
    );
}
