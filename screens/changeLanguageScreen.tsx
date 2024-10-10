/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { Color } from "@/constants/Colors";

import { Ionicons } from "@expo/vector-icons";

import ExploreHeader5 from "@/components/ExploreHeader5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Language } from "@/constants/languages";
import { MaterialIcons } from "@expo/vector-icons";
import { changeCurrentLanguage } from "@/state/userData/getUserData";
import { StackActions } from "@react-navigation/native";

interface ChoosenLanguageInterface {
    choosenLanguage: string;
}
const ChangeLanguage = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
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

    const [choosenLanguage, setChoosenLanguage] = useState(
        currentLanguage === "english"
            ? Language.english.text168
            : Language.french.text169,
    );
    console.log(choosenLanguage, "hjbksd");

    function setLanguage(choosenLanguage: any) {
        const sentValue: ChoosenLanguageInterface = {
            choosenLanguage: choosenLanguage,
        };
        dispatch(changeCurrentLanguage(sentValue));
        navigation.goBack();
    }

    useEffect(() => {
        setChoosenLanguage(
            currentLanguage === "english"
                ? Language.english.text168
                : Language.french.text169,
        );
    }, [currentLanguage]);
    return (
        <View style={{ flex: 1 }}>
            <ExploreHeader5 />
            <StatusBar backgroundColor={Colors.background} />
            <View
                style={[
                    styles.container,
                    { backgroundColor: Colors.background },
                ]}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.dispatch(StackActions.pop(1))}
                    >
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
                        {languageText.text166}
                    </Text>
                    <Text></Text>
                </View>

                <ScrollView
                    style={{ flex: 1, marginTop: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                            marginBottom: 13,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "500",
                                color: Colors.welcomeText,
                            }}
                        >
                            {languageText.text169}
                        </Text>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => setLanguage("french")}
                        >
                            {choosenLanguage !== languageText.text169 && (
                                <MaterialIcons
                                    name="radio-button-off"
                                    size={24}
                                    color={Colors.welcomeText}
                                />
                            )}
                            {choosenLanguage === languageText.text169 && (
                                <Ionicons
                                    name="radio-button-on"
                                    size={24}
                                    color={Colors.welcomeText}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                            marginBottom: 18,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "500",
                                color: Colors.welcomeText,
                            }}
                        >
                            {languageText.text168}
                        </Text>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => setLanguage("english")}
                        >
                            {choosenLanguage !== languageText.text168 && (
                                <MaterialIcons
                                    name="radio-button-off"
                                    size={24}
                                    color={Colors.welcomeText}
                                />
                            )}
                            {choosenLanguage === languageText.text168 && (
                                <Ionicons
                                    name="radio-button-on"
                                    size={24}
                                    color={Colors.welcomeText}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    cameraIconContainer: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        borderRadius: 20,
        padding: 5,
    },
    cameraIcon: {
        width: 20,
        height: 20,
        tintColor: "white", // Adjust tint based on icon color
    },
});

export default ChangeLanguage;
