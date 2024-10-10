/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LeagueComponent from "@/components/LeagueComponent";
import {
    FlatList,
    Modal,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import DatePicker2 from "react-native-modern-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useState } from "react";

export default function FinishedGames({
    navigation,
    Colors,
}: {
    navigation: any;
    Colors: any;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const fixtures = useSelector(
        (state: RootState) => state.fixturesSlice.finishedFixtures
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
            {/* <DatePicker
                textColor={Colors.welcomeText}
                backgroundColor={Colors.background}
                defaultColor={Colors.default1}
                onPress={handleOnPressStartDate}
            /> */}
            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                keyExtractor={(item: any, index) => item.league.id.toString()}
                initialNumToRender={10}
                data={fixtures}
                ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
                renderItem={({ item }) => (
                    <LeagueComponent fixture={item} navigation={navigation} />
                )}
            />
            {/* <View style={{ flex: 1, backgroundColor: Colors.background }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openStartDatePicker}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={handleOnPressStartDate}
                            activeOpacity={1}
                        >
                            <View
                                style={{
                                    backgroundColor: Colors.datePickerBackground,
                                    margin: 20,
                                    justifyContent: "center",
                                    paddingVertical: 12,
                                    alignItems: "center",
                                    borderRadius: 20,
                                    padding: 20,
                                    width: "90%",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}
                            >
                                {/* <DatePicker2
                                    mode="date"
                                    onDateChange={(date) => handleOnPressStartDate}
                                    onSelectedChange={(dateStr) =>
                                        selectedStart(dateStr)
                                    }
                                    options={{
                                        backgroundColor:
                                            Colors.datePickerBackground,
                                        textHeaderColor: Colors.welcomeText,
                                        textDefaultColor: Colors.welcomeText,
                                        selectedTextColor: Colors.toastText,
                                        mainColor: Colors.welcomeText,
                                        textSecondaryColor: Colors.welcomeText,
                                        borderColor: Colors.welcomeText,
                                    }}
                                /> 
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View> 
            </View>*/}
        </View>
    );
}
