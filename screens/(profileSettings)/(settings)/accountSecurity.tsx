/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ExploreHeader5 from "@/components/ExploreHeader5";
import {Color} from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
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
}) => {
    const [isEnabled, setIsEnabled] = useState(true);

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
    };
    return index !== 2 ? (
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
                    ? navigation.push("changePassword")
                    : index === 1
                      ? navigation.push("changePin")
                      : null
            }
        >
            <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
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
            <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.welcomeText}
            />
        </TouchableOpacity>
    ) : (
        <View
            key={index}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 12,
            }}
        >
            <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
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
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#3e3e3e" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

const AccountSecurity = ({ navigation }: any) => {
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
            iconName: languageText.text133,
            text: languageText.text134,
            IconName: (
                <MaterialIcons
                    name="my-library-books"
                    size={24}
                    color={Colors.default1}
                />
            ),
        },
        {
            iconName: languageText.text135,
            text: languageText.text136,
            IconName: (
                <MaterialIcons
                    name="password"
                    size={24}
                    color={Colors.default1}
                />
            ),
        },
        // ,
        // {
        //   iconName: "Biometrics",
        //   text: "Activate FaceId or Biometrics",
        //   IconName: (
        //     <MaterialCommunityIcons
        //       name='passport-biometric'
        //       size={24}
        //       color={Colors.default1}
        //     />
        //   ),
        // },
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
                    {languageText.text137}
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

export default AccountSecurity;
