/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
} from "react-native";
import {
    FontAwesome,
    Ionicons,
    AntDesign,
    MaterialCommunityIcons,
} from "@expo/vector-icons"; // Replace with your icon library
import ExploreHeader5 from "@/components/ExploreHeader5";
import { Color } from "@/constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Language } from "@/constants/languages";
import { getSocials } from "@/state/userData/getUserData";

const HelpScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const ColorsForActivityIndicator =
        parseFloat(colorScheme) === 2 ? "white" : "black";

    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const [socials, setSocials] = useState<any>();

    function getSocial() {
        dispatch(getSocials())
            .then((result) => {
                console.log(result.payload.data, "hjvhuvhjvuhv");
                setSocials(result.payload.data);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getSocial();
    }, []);

    const openWhatsApp = () => {
        const url = `${socials.whatsapp}`; // Note: Add proper WhatsApp number
        Linking.canOpenURL(url)
            .then((supported: any) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("WhatsApp is not installed");
                }
            })
            .catch((err: any) => console.error("Error opening WhatsApp", err));
    };

    const sendEmail = () => {
        const email = `mailto:${socials.email}`;
        Linking.openURL(email).catch((err) =>
            console.error("Error sending email", err),
        );
    };

    // Function to handle Twitter link
    const openTwitter = () => {
        const twitterUrl = `https://twitter.com/${socials.twitter.replace("@", "")}`;
        Linking.openURL(twitterUrl).catch((err) =>
            console.error("Error opening Twitter", err),
        );
    };

    // Function to handle Phone call
    const makePhoneCall = () => {
        const phoneNumber = `tel:${socials.phone}`; // Add the phone number
        if (socials.phone) {
            Linking.openURL(phoneNumber).catch((err) =>
                console.error("Error making phone call", err),
            );
        } else {
            console.log("Phone number is not available");
        }
    };

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
                        width: "100%",
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
                        {languageText.text108}
                    </Text>
                    <Text></Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <MaterialCommunityIcons
                        name="timeline-help"
                        size={120}
                        color={Colors.default1}
                    />
                </View>

                <Text
                    style={[styles.headerText, { color: Colors.welcomeText }]}
                >
                    {languageText.text150}
                </Text>
                <Text
                    style={[
                        styles.descriptionText,
                        { color: Colors.welcomeText },
                    ]}
                >
                    {languageText.text151}
                </Text>
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        style={[
                            styles.card,
                            { backgroundColor: Colors.default3 },
                        ]}
                        onPress={openWhatsApp}
                    >
                        <FontAwesome
                            name="whatsapp"
                            size={35}
                            style={[
                                styles.cardIcon,
                                { color: Colors.default1 },
                            ]}
                        />
                        <Text
                            style={[
                                styles.cardHeader,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            Whatsapp
                        </Text>
                        {!socials ? (
                            <ActivityIndicator
                                size="small"
                                color={ColorsForActivityIndicator}
                            />
                        ) : (
                            <Text style={styles.cardSubheader}>
                                {languageText.text340}
                            </Text>
                        )}
                    </TouchableOpacity>
                    {/* Repeat the card structure for other sections */}
                    <TouchableOpacity
                        style={[
                            styles.card,
                            { backgroundColor: Colors.default3 },
                        ]}
                        onPress={sendEmail}
                    >
                        <FontAwesome
                            name="envelope"
                            size={35}
                            style={[
                                styles.cardIcon,
                                { color: Colors.default1 },
                            ]}
                        />
                        <Text
                            style={[
                                styles.cardHeader,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            Email
                        </Text>

                        {!socials ? (
                            <ActivityIndicator
                                size="small"
                                color={ColorsForActivityIndicator}
                            />
                        ) : (
                            <Text style={styles.cardSubheader}>
                                {socials?.email}
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.card,
                            { backgroundColor: Colors.default3 },
                        ]}
                        onPress={openTwitter}
                    >
                        <AntDesign
                            name="twitter"
                            size={35}
                            style={[
                                styles.cardIcon,
                                { color: Colors.default1 },
                            ]}
                        />
                        <Text
                            style={[
                                styles.cardHeader,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            Twitter
                        </Text>
                        {!socials ? (
                            <ActivityIndicator
                                size="small"
                                color={ColorsForActivityIndicator}
                            />
                        ) : (
                            <Text style={styles.cardSubheader}>
                   
                                   { languageText.text341}
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.card,
                            { backgroundColor: Colors.default3 },
                        ]}
                        onPress={makePhoneCall}
                    >
                        <FontAwesome
                            name="phone"
                            size={35}
                            style={[
                                styles.cardIcon,
                                { color: Colors.default1 },
                            ]}
                        />
                        <Text
                            style={[
                                styles.cardHeader,
                                { color: Colors.welcomeText },
                            ]}
                        >
                            Phone
                        </Text>

                        {!socials ? (
                            <ActivityIndicator
                                size="small"
                                color={ColorsForActivityIndicator}
                            />
                        ) : (
                            <Text style={styles.cardSubheader}>
                                { languageText.text152
                               }
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 45,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 30,
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 13,
        marginBottom: 34,
        textAlign: "center",
    },
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
    },
    card: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginHorizontal: 2,
        marginVertical: 5,
        borderRadius: 12,
        height: 170,
        width: "48%",
    },
    cardIcon: {
        marginBottom: 5,
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cardSubheader: {
        fontSize: 14,
        color: "#777",
    },
});

export default HelpScreen;
