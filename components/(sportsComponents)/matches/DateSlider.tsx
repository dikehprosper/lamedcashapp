/* eslint-disable no-empty */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import {
    addDays,
    eachDayOfInterval,
    eachWeekOfInterval,
    format,
    subDays,
} from "date-fns";
// import PagerView from "react-native-pager-view";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Color } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
    getDateFixtures,
    removeDateFilter,
    setDateFilter,
} from "@/state/fixtures";

export default function DateSlider({
    navigation,
    scrollToTargetContent,
    scrollViewRef,
    todayContentRef,
    dateRefs,
}: any) {
    const dispatch = useDispatch<AppDispatch>();
    const [scrollViewWidth, setScrollViewWidth] = useState(0);

    useEffect(() => {
        scrollToTargetContent(todayContentRef);
    }, [scrollViewWidth]);
    const dateFilter = useSelector(
        (state: RootState) => state.fixturesSlice.dateFilter,
    );
    const layout = useWindowDimensions();
    const dates = eachWeekOfInterval(
        {
            start: subDays(new Date(), 14),
            end: addDays(new Date(), 14),
        },
        {
            weekStartsOn: 1,
        },
    ).reduce((acc: Date[][], cur) => {
        const allDays = eachDayOfInterval({
            start: cur,
            end: addDays(cur, 6),
        });
        acc.push(allDays);

        return acc;
    }, []);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) == 2 ? Color.darkMode : Color.lightMode;
    return (
        <ScrollView
            onLayout={(e) => {
                setScrollViewWidth(e.nativeEvent.layout.width);
            }}
            ref={scrollViewRef}
            horizontal
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 25,
                    padding: 10,
                    paddingVertical: 16,
                }}
            >
                {dates.map((week, i) => {
                    return (
                        <View key={i} style={{ flexDirection: "row", gap: 34 }}>
                            {week.map((day, e) => {
                                const today = new Date();
                                const todayDay = today.getDate();
                                const todayMonth = format(today, "MMM");

                                const dayText = format(day, "E");
                                const monthText = format(day, "MMM");
                                const dayNumber = day.getDate();

                                const isToday =
                                    todayDay === dayNumber &&
                                    todayMonth === monthText;

                                const formattedDate = `${format(
                                    day,
                                    "yyyy",
                                )}-${format(day, "MM")}-${format(day, "dd")}`;
                                const inDateFilter =
                                    dateFilter === formattedDate;
                                return (
                                    <TouchableOpacity
                                        ref={
                                            isToday
                                                ? todayContentRef
                                                : (el) =>
                                                      (dateRefs.current[
                                                          Number(`${i}${e}`)
                                                      ] = el!)
                                        }
                                        key={Number(`${i}${e}`)}
                                        onPress={() => {
                                            if (isToday) {
                                                scrollToTargetContent(
                                                    todayContentRef,
                                                );
                                                dispatch(removeDateFilter());
                                            } else {
                                                scrollToTargetContent(
                                                    dateRefs.current[
                                                        Number(`${i}${e}`)
                                                    ],
                                                );

                                                dispatch(
                                                    setDateFilter(
                                                        formattedDate,
                                                    ),
                                                );
                                                dispatch(
                                                    getDateFixtures(
                                                        formattedDate,
                                                    ),
                                                );
                                                // navigation.navigate(
                                                //     "FixturesDay",
                                                //     {
                                                //         date: formattedDate,
                                                //     },
                                                // );
                                            }
                                        }}
                                    >
                                        <View
                                            key={i}
                                            style={{ alignItems: "center" }}
                                        >
                                            <Text
                                                style={{
                                                    color: isToday
                                                        ? Colors.default1
                                                        : inDateFilter
                                                          ? "#1987ff"
                                                          : Colors.welcomeText,
                                                    fontWeight: isToday
                                                        ? "900"
                                                        : "900",
                                                    fontSize: isToday ? 13 : 12,
                                                }}
                                            >
                                                {dayText.toLocaleUpperCase()}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: isToday
                                                        ? Colors.default1
                                                        : inDateFilter
                                                          ? "#1987ff"
                                                          : Colors.welcomeText,
                                                    fontWeight: isToday
                                                        ? "900"
                                                        : "900",
                                                    fontSize: isToday ? 13 : 12,
                                                }}
                                            >
                                                {monthText} {dayNumber}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}
