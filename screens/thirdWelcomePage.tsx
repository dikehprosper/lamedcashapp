/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-var-requires */

import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {defaultStyles} from "@/constants/Styles";
import ExploreHeader4 from "@/components/ExploreHeader4";
const image = require("@/assets/images/Logo.webp");
const image1 = require("@/assets/images/Logo.webp");
import {Color} from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Language } from "@/constants/languages";

// Calculate the percentage value

const ThirdWelcomePage = ({ navigation }: any) => {
    const data = useSelector((state: RootState) => state.getUserData.data);
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
    function handleSubmit(value: any) {
        if (value === 1) {
            navigation.push("signup");
        } else if (value === 2) {
            navigation.push("login");
        }
    }
    console.log(languageText.text4);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.background,
                position: "relative",
            }}
        >
            <View style={{ display: "flex", height: 150 }}>
                <ExploreHeader4 />
            </View>
            <View
                style={{
                    display: "flex",
                    gap: 10,
                    padding: 20,
                    backgroundColor: Colors.inputBackground,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    flex: 1,
                    paddingBottom: 80,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={Colors.background === "#0C121D" ? image1 : image}
                    style={{ width: 70, height: 60, marginBottom: 30 }}
                />

                <Text
                    style={{
                        color: Colors.welcomeText,
                        fontWeight: "600",
                        opacity: 1,
                        fontSize: 16,
                        marginLeft: "2%",
                        marginBottom: 10,
                    }}
                >
                    {languageText.text4}
                    {/* Welcome to BetFundr */}
                </Text>
                <Text
                    style={{
                        color: Colors.welcomeText,
                        fontWeight: "300",
                        opacity: 0.4,
                        fontSize: 14,
                        marginLeft: "2%",
                        marginBottom: 20,
                        textAlign: "center",
                    }}
                >
                    {languageText.text5}
                    {/* Join the BetFundr community today to simplify your
                    transactions. Make and view posts and predictions from other
                    users, and stay updated on sports events. To get started,
                    please log in to your account or create a new one. */}
                </Text>

                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.default1,
                        height: 50,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        marginTop: 10,
                        width: "100%",
                    }}
                    onPress={() => handleSubmit(1)}
                >
                    <Text style={defaultStyles.btnText}>
                        {languageText.text6}
                        {/* Register */}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: "transparent",
                        height: 50,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        marginBottom: 20,
                        borderWidth: 1.6,
                        borderColor: Colors.default1,
                        width: "100%",
                    }}
                    onPress={() => handleSubmit(2)}
                >
                    <Text
                        style={{
                            color: Colors.default1,
                            fontSize: 16,
                            fontFamily: "mon-b",
                        }}
                    >
                        {languageText.text7}
                        {/* Login */}
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 4,
                        flexDirection: "row",
                        width: "100%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "500",
                            color: Colors.welcomeText,
                            marginRight: 5,
                            textAlign: "center",
                            opacity: 0.6,
                        }}
                    >
                        {languageText.text8}
                        {/* By pressing "Create an account" or "Login", you accept
                        our terms. */}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ThirdWelcomePage;
