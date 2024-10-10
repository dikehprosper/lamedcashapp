/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Modal,
    useWindowDimensions,
    Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Dropdown } from "react-native-element-dropdown";
import { Color } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Language } from "@/constants/languages";

const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: "#1e90ff", // Your custom primary color
        accent: "#ff6347", // Your custom accent color
        background: "#f0f0f0",
        surface: "#ffffff",
        text: "#333333",
        disabled: "#aaaaaa",
        placeholder: "#888888",
        backdrop: "#f0f0f0",
        notification: "#ff6347",
    },
};

export default theme;

const Header1 = ({ backgroundColor, textColor }: any) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: backgroundColor,
                paddingVertical: 10,
            }}
        >
            <Text
                style={{
                    color: "#000000",
                    fontSize: 16,
                    fontFamily: "sf-bold",
                    marginRight: 6,
                }}
            >
                {"⚽️"}
            </Text>
            <Text
                style={{
                    color: textColor,
                    fontSize: 16,
                    fontFamily: "sf-bold",
                    marginRight: 12,
                }}
            >
                {"Football"}
            </Text>

            <MaterialIcons
                name="keyboard-arrow-down"
                size={22}
                color={textColor}
            />
        </TouchableOpacity>
    );
};

const Header2 = ({
    textColor,
    active,
    setActive,
    defaultColor,
    fixtures,
}: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const layout = useWindowDimensions();
    const navigation = useNavigation();
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const [value, setValue] = useState("Filter");
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: Colors.background,
                padding: 5,
                gap: 10,
                paddingHorizontal: 10,
                shadowColor: "#746C823B",
                shadowOpacity: 0.2,
                shadowOffset: {
                    width: 0,
                    height: -1,
                },
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.sportsTabBg,
                    padding: 5,
                    borderRadius: 20,
                }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        backgroundColor: active === 1 ? "black" : "transparent",
                        borderRadius: 24,
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                    }}
                    onPress={() => setActive(1)}
                >
                    <Text
                        style={{
                            color: active === 1 ? defaultColor : textColor,
                            fontSize: 14,
                            fontFamily: "sf-bold",
                        }}
                    >
                        {languageText.text63}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        borderRadius: 24,
                        paddingVertical: 5,
                        backgroundColor: active === 2 ? "black" : "transparent",
                        paddingHorizontal: 8,
                    }}
                    onPress={() => setActive(2)}
                >
                    <Text
                        style={{
                            color: active === 2 ? defaultColor : textColor,
                            fontSize: 14,
                            fontFamily: "sf-bold",
                        }}
                    >
                        {languageText.text218}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        borderRadius: 24,
                        paddingVertical: 5,
                        backgroundColor: active === 3 ? "black" : "transparent",
                        paddingHorizontal: 8,
                    }}
                    onPress={() => setActive(3)}
                >
                    <Text
                        style={{
                            color: active === 3 ? defaultColor : textColor,
                            fontSize: 14,
                            fontFamily: "sf-bold",
                        }}
                    >
                        {languageText.text217}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        backgroundColor: active === 4 ? "black" : "transparent",
                        borderRadius: 24,
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                    }}
                    onPress={() => setActive(4)}
                >
                    <Text
                        style={{
                            color: active === 4 ? defaultColor : textColor,
                            fontSize: 14,
                            fontFamily: "sf-bold",
                        }}
                    >
                        {languageText.text219}
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flexGrow: 1,
                    borderRadius: 90,
                    padding: 10,
                    paddingHorizontal: 15,
                    backgroundColor: Colors.sportsTabBg,
                }}
            >
                <Dropdown
                    data={fixtures.map((item: any) => ({
                        ...item,
                        filter: languageText.text220,
                    }))}
                    value={value}
                    search
                    selectedTextStyle={{ color: textColor }}
                    placeholder={languageText.text220}
                    placeholderStyle={{
                        color: textColor,
                        fontFamily: "sf-bold",
                    }}
                    onChange={(item) => {
                        // setValue(item);
                        //@ts-ignore
                        navigation.navigate("LeaguePage", { fixture: item });
                        setValue("Filter");
                        console.log(item);
                    }}
                    // value={value}
                    searchField="league.name"
                    searchPlaceholder="Search for league"
                    activeColor={Colors.default3}
                    inputSearchStyle={{
                        borderWidth: 0,
                        color: textColor,
                        fontWeight: "700",
                    }}
                    fontFamily="sf-bold"
                    renderItem={(item: any) => (
                        <View
                            style={{
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 20,
                            }}
                        >
                            <Image
                                source={{ uri: item.league.logo }}
                                width={30}
                                height={30}
                            />
                            <Text
                                style={{
                                    color: "#ffffff",
                                    fontFamily: "sf-bold",
                                    fontSize: 16,
                                }}
                            >
                                {item.league.name}
                            </Text>
                        </View>
                    )}
                    containerStyle={{
                        marginTop: 16,
                        borderRadius: 10,
                        backgroundColor: Colors.dropdownContainer,
                        borderWidth: 0,
                        position: "absolute",
                        width: layout.width * 0.95,
                        left: layout.width * 0.025,
                        right: 0,
                        top: 120,
                        elevation: 0,
                    }}
                    itemTextStyle={{ fontFamily: "sf-bold", color: textColor }}
                    valueField="league.id"
                    labelField="filter"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: "rgba(120, 120, 120, 0.2)",
    },
    dateItem: {
        marginVertical: 7,
        padding: 2,
        width: 52,
    },
});

export { Header1, Header2 };
