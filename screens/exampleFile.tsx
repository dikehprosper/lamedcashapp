/* eslint-disable */
import React from "react";
import { View, StatusBar, Text } from "react-native";
import { Color } from "@/constants/Colors";
import ExploreHeader3 from "@/components/ExploreHeader3";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
// Calculate the percentage value

const ExampleFile = ({ navigation, route }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

      

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.background,
                position: "relative",
                paddingTop: 10,
            }}
        >
            <StatusBar backgroundColor={Colors.background} />
            <ExploreHeader3 />
            <View style={{ flex: 1 }}>
                <Text style={{ color: Colors.welcomeText }}></Text>
            </View>
        </View>
    );
};

export default ExampleFile;
