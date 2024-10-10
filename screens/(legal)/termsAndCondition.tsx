/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import ExploreHeader5 from "@/components/ExploreHeader5";
// import WebView from "react-native-webview";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Language } from "@/constants/languages";
import WebView from "react-native-webview";
import {DOMAIN2} from "@/components/(Utils)/domain";
const TermsAndCondition = ({ navigation }: any) => {
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

        const locale =
          currentLanguage === "english" ? "en" : "fr";

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
                    style={{ flex: 1, paddingHorizontal: 2 }}
                    showsVerticalScrollIndicator={false}
                >
                    <WebView
                        source={{ uri: `${DOMAIN2}/${locale}/about` }}
                        style={{ flex: 1, height: 800, width: "100%" }} // Set an appropriate height
                    />
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

export default TermsAndCondition;
