/* eslint-disable */
import React from "react";
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Color } from "@/constants/Colors";
import ExploreHeader3 from "@/components/ExploreHeader3";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Ionicons } from "@expo/vector-icons";
import { Language } from "@/constants/languages";
// Calculate the percentage value

const WalletRules = ({ navigation, route }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

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
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    paddingLeft: 12,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={26}
                        color={Colors.welcomeText}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: Colors.welcomeText,
                    }}
                >
                    {languageText.text183}
                </Text>
                <Text></Text>
            </View>

            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: Colors.default3,
                    paddingTop: 10,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1, height: 200 }}></View>
                <View
                    style={{
                        width: "90%",
                        alignSelf: "center",
                        padding: 20,
                        borderRadius: 10,
                        backgroundColor: Colors.background,
                        marginBottom: 60,
                    }}
                >
                    <Text
                        style={{
                            width: "100%",
                            color: Colors.welcomeText,
                            fontSize: 18,
                            fontWeight: "500",
                            textAlign: "center",
                            marginBottom: 20,
                        }}
                    >
                        {languageText.text185}
                    </Text>
                    <Text
                        style={{
                            width: "100%",
                            color: Colors.default1,
                            fontSize: 14,
                            fontWeight: "300",
                        }}
                    >
                        {languageText.text187}
                    </Text>

                    <Text
                        style={{
                            width: "100%",
                            color: Colors.welcomeText,
                            fontSize: 14,
                            fontWeight: "300",
                            marginTop: 20,
                            lineHeight: 22,
                        }}
                    >
                        {languageText.text186}
                    </Text>

                    <Text
                        style={{
                            width: "100%",
                            color: Colors.default1,
                            fontSize: 14,
                            fontWeight: "300",
                            marginTop: 40,
                        }}
                    >
                        {languageText.text191}
                    </Text>

                    <Text
                        style={{
                            width: "100%",
                            color: Colors.welcomeText,
                            fontSize: 14,
                            fontWeight: "300",
                            marginTop: 20,
                            lineHeight: 22,
                        }}
                    >
                        {languageText.text188}
                    </Text>
                    <Text
                        style={{
                            width: "100%",
                            color: Colors.welcomeText,
                            fontSize: 14,
                            fontWeight: "300",
                            marginTop: 3,
                            lineHeight: 22,
                        }}
                    >
                        {languageText.text189}
                    </Text>
                    <Text
                        style={{
                            width: "100%",
                            color: Colors.welcomeText,
                            fontSize: 14,
                            fontWeight: "300",
                            marginTop: 3,
                            lineHeight: 22,
                        }}
                    >
                        {languageText.text190}
                    </Text>

                    <Text
                        style={{
                            width: "100%",
                            color: Colors.default1,
                            fontSize: 14,
                            fontWeight: "300",
                            marginTop: 40,
                        }}
                    >
                        {languageText.text193}
                    </Text>

                    <Text
                        style={{
                            width: "100%",
                            color: Colors.welcomeText,
                            fontSize: 14,
                            fontWeight: "300",
                            marginTop: 20,
                            lineHeight: 22,
                        }}
                    >
                        {languageText.text192}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default WalletRules;
