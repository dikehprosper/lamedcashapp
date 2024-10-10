/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExploreHeader5 from "@/components/ExploreHeader5";
import { Color } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/state/store";
import { Language } from "@/constants/languages";
import { fetchPrivacyPolicies } from "@/state/userData/getUserData";

const PrivacyPolicy = ({ navigation }: any) => {
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

    const ColorsForActivityIndicator =
        parseFloat(colorScheme) === 2 ? "white" : "black";

    const [policies, setPolicies] = useState<any>();

    function fetchPrivacyPolicy() {
        dispatch(fetchPrivacyPolicies())
            .then((result: any) => {
                console.log(
                    result.payload.policies.frenchPolicy,
                    "result.payload.policies",
                );
                setPolicies(result.payload.policies);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    // Fetch policies when the component mounts
    useEffect(() => {
        fetchPrivacyPolicy();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ExploreHeader5 />
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
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="chevron-back-outline"
                            size={26}
                            color={Colors.welcomeText}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "700",
                                color: Colors.welcomeText,
                            }}
                        >
                            {languageText.text110}
                        </Text>
                    </TouchableOpacity>
                    <Text></Text>
                </View>

                <ScrollView
                    style={{
                        flex: 1,
                        paddingHorizontal: 20,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {policies ? (
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                lineHeight: 19,
                            }}
                        >
                            {languageText.text163 === "english"
                                ? policies?.englishPolicy
                                : policies?.frenchPolicy}
                        </Text>
                    ) : (
                        <View
                            style={{
                                display: "flex",
                                marginTop: 100,
                            }}
                        >
                            <ActivityIndicator
                                size="large"
                                color={ColorsForActivityIndicator}
                            />
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
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

export default PrivacyPolicy;
