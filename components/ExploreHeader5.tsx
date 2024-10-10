/* eslint-disable @typescript-eslint/no-explicit-any */
import {SafeAreaView, StatusBar} from "react-native";
import React from "react";
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const ExploreHeader = () => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    return (
        <SafeAreaView
            style={{
                paddingTop: 10,
                backgroundColor: Colors.background,
            }}
        >
            <StatusBar barStyle={Colors.statusBar} />
        </SafeAreaView>
    );
};

export default ExploreHeader;
