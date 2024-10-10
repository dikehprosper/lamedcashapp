/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Color } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/state/store";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { getDateFixtures, setDateFilter } from "@/state/fixtures";

export default function DateModal({ scrollToTargetContent, todayContentRef }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation = useNavigation();
    return (
        <View style={{ flexGrow: 1, justifyContent: "center" }}>
            <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{ padding: 8, paddingRight: 16 }}
            >
                <Ionicons
                    name="calendar"
                    size={22}
                    color={Colors.welcomeText}
                />
            </TouchableOpacity>
            <Modal transparent={true} visible={open}>
                <TouchableOpacity
                    onPress={() => setOpen(false)}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableWithoutFeedback>
                        <View style={{ width: "90%" }}>
                            <Calendar
                                enableSwipeMonths={true}
                                style={{ borderRadius: 5 }}
                                onDayPress={(date: any) => {
                                    scrollToTargetContent(todayContentRef);
                                    setOpen(false);
                                    dispatch(setDateFilter(date.dateString));
                                    dispatch(getDateFixtures(date.dateString));
                                }}
                                theme={{
                                    backgroundColor: Colors.background,
                                    calendarBackground: Colors.background,
                                    textSectionTitleColor: Colors.welcomeText,
                                    selectedDayBackgroundColor: Colors.default1,
                                    selectedDayTextColor: Colors.welcomeText,
                                    todayTextColor: Colors.welcomeText,
                                    todayBackgroundColor: Colors.default1,
                                    dayTextColor: Colors.welcomeText,
                                    textDisabledColor: Colors.greyPost,
                                    arrowColor: Colors.default1,
                                    textDayFontFamily: "sf-bold",
                                    monthTextColor: Colors.welcomeText,
                                    // monthFontFamily: "sf-bold",
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
