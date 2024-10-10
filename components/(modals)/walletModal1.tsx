/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Color } from "@/constants/Colors";
import { Language } from "@/constants/languages";
const WalletModal1 = (props: any) => {
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

    const handlePress = () => {
        setTimeout(() => {
            props.navigation.push("walletHistory");
        }, 0.002);
        props.hideModal();
    };
    const handlePress2 = () => {
        setTimeout(() => {
            props.navigation.push("walletRules");
        }, 0.002);
        props.hideModal();
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={props.hideModal}
            style={[
                {
                    flex: 1,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                },
            ]}
        >
            <View
                style={{
                    backgroundColor: Colors.background,
                    borderRadius: 5,
                    position: "absolute",
                    width: "34%",
                    shadowColor: Colors.welcomeText,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    top: 100,
                    right: 40,
                }}
            >
                <TouchableOpacity
                    onPress={handlePress2}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 10,
                        paddingTop: 20,
                        paddingBottom: 10,
                        paddingLeft: 20,
                    }}
                >
                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontSize: 15,
                            fontWeight: "400",
                        }}
                    >
                        <MaterialIcons
                            name="assignment"
                            size={20}
                            color={Colors.welcomeText}
                        />
                    </Text>
                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontSize: 15,
                            fontWeight: "400",
                        }}
                    >
                        {languageText.text183}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlePress}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                        paddingLeft: 20,
                    }}
                >
                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontSize: 15,
                            fontWeight: "500",
                        }}
                    >
                        <FontAwesome5
                            name="history"
                            size={22}
                            color={Colors.welcomeText}
                        />
                    </Text>
                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontSize: 15,
                            fontWeight: "400",
                        }}
                    >
                        {languageText.text184}
                    </Text>
                </TouchableOpacity>
                {/* <Button
                                                    title="Close Modal"
                                                    onPress={hideModal}
                                                /> */}
            </View>
        </TouchableOpacity>
    );
};

export default WalletModal1;
