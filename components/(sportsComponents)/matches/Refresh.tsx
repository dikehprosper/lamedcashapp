/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Color } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/state/store";
import { FontAwesome } from "@expo/vector-icons";

import {

    TouchableOpacity,

    View,

} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDateFixtures, setDateFilter } from "@/state/fixtures";

export default function Refresh({ scrollToTargetContent,  todayContentRef }: any) {
    const dispatch = useDispatch<AppDispatch>();
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const todaysDate = getFormattedDate();
    function refresh() {
       
        dispatch(setDateFilter(todaysDate));
        dispatch(getDateFixtures(todaysDate));
        scrollToTargetContent(todayContentRef);
    }
    return (
        <View style={{ flexGrow: 1, justifyContent: "center", marginLeft: 3 }}>
            <TouchableOpacity
                onPress={refresh}
                style={{ padding: 8, paddingRight: 16 }}
            >
                <FontAwesome
                    name="refresh"
                    size={22}
                    color={Colors.welcomeText}
                />
            </TouchableOpacity>
        </View>
    );
}

function getFormattedDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

