/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import ExploreHeader5 from "@/components/ExploreHeader5";
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Language } from "@/constants/languages";

interface ItemProps {
    index: number;
    iconName: string; // Name of the icon from the icon library
    text: string; // Text to be displayed
    IconName: React.ReactElement;
    navigation: any;
    Colors: any;
}

const Item: React.FC<ItemProps> = ({
    index,
    iconName,
    text,
    IconName,
    navigation,
    Colors,
}) => (
    <TouchableOpacity
        key={index}
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 12,
        }}
        onPress={() =>
            index === 0
                ? navigation.push("privacyPolicy")
                : navigation.push("termsAndCondition")
        }
    >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View
                style={{
                    backgroundColor: Colors.default3,

                    padding: 10,
                    borderRadius: 40,
                    marginRight: 10,
                }}
            >
                {IconName}
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontWeight: "600",
                        fontSize: 15,
                        marginBottom: 2,
                        color: Colors.welcomeText,
                    }}
                >
                    {iconName}
                </Text>
                <Text
                    style={{
                        opacity: 0.6,
                        color: Colors.welcomeText,
                        width: "95%",
                        flexWrap: "wrap",
                    }}
                >
                    {text}{" "}
                </Text>
            </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.welcomeText} />
    </TouchableOpacity>
);

const Legal = ({ navigation }: any) => {
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

    const itemsData = [
        {
            iconName: languageText.text159,
            text: languageText.text160,
            IconName: (
                <MaterialIcons
                    name="security"
                    size={24}
                    color={Colors.default1}
                />
            ),
        },
        {
            iconName: languageText.text161,
            text: languageText.text162,
            IconName: (
                <AntDesign
                    name="notification"
                    size={24}
                    color={Colors.default1}
                />
            ),
        },
    ];

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
                        {languageText.text110}
                       
                    </Text>

                    <Text></Text>
                </View>

                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    {itemsData.map((item, index) => (
                        <Item
                            key={index}
                            index={index}
                            iconName={item.iconName}
                            IconName={item.IconName}
                            text={item.text}
                            navigation={navigation}
                            Colors={Colors}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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

export default Legal;