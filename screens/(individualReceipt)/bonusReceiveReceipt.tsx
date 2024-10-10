/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
    TouchableOpacity,
    View,
    Clipboard,
    Text,
    ScrollView,
} from "react-native";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import ToastNotification from "@/components/(Utils)/toastNotification";
import * as Haptics from "expo-haptics";
import { Color } from "@/constants/Colors";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import FormatDateAndTime from "@/components/(Utils)/formatedDateAndTime";
import Button from "@/components/(Utils)/button";
import { printToFile } from "@/components/(Utils)/htmlTemplate2";
import ExploreHeader3 from "@/components/ExploreHeader3";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Language } from "@/constants/languages";

const BonusReceiveReceipt = ({ route, navigation }: any) => {
        const colorScheme = useSelector(
            (state: RootState) => state.getUserData.colorScheme,
        );
        const Colors =
            parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
              const currentLanguage = useSelector(
                  (state: RootState) => state.getUserData.currentLanguage,
              );
              const languageText =
                  currentLanguage === "english"
                      ? Language.english
                      : Language.french;
                      
    const specificData = route.params;

    //FOR TOAstNotification
    const [show, setShow] = useState(true);
    function displayNotification(text: string) {
        Clipboard.setString(text);
        setShow(false);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(true);
        }, 3800);
    }

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    // const specificData: any = {
    //     amount: 0,
    //     bonusBalance: "9000",
    //     fundingType: "bonus",
    //     identifierId: "2ed55fbb-28bb-4db2-a317-b2f4c8eb5544",
    //     momoNumber: "99999999",
    //     registrationDateTime: "2024-05-16T02:54:37.825Z",
    //     status: "Pending",
    //     totalAmount: "9000",
    // };

    function onPress(specificData: any) {
        printToFile(specificData);
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <ExploreHeader3 />

            <ToastNotification
                show={show}
                text={`ID de pari copié avec succès ${specificData.transactionId}`}
                textColor={Colors.toastText}
                icon={
                    <AntDesign
                        name="checkcircleo"
                        size={40}
                        color={Colors.default1}
                    />
                }
            />
            <View
                style={{
                    width: "100%",
                    display: "flex",
                    height: 50,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    paddingHorizontal: 25,
                    backgroundColor: Colors.background,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("MainNavigator")}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "600",
                            color: Colors.welcomeText,
                        }}
                    >
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: Colors.background,
                    padding: 20,
                    paddingBottom: 50,
                }}
            >
                <ScrollView style={{ marginBottom: 20 }}>
                    <View style={{ flex: 1, flexDirection: "column", gap: 20 }}>
                        <View
                            style={{
                                borderRadius: 9,
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                                backgroundColor: "rgba(120, 120, 120, .2)",
                                paddingVertical: 20,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    marginBottom: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 30,
                                        color: Colors.welcomeText,
                                        fontWeight: "600",
                                    }}
                                >
                                    +
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 30,
                                        color: Colors.welcomeText,
                                        fontWeight: "400",
                                        marginRight: 4,
                                    }}
                                >
                                    XOF
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 30,
                                        color: Colors.welcomeText,
                                        fontWeight: "800",
                                    }}
                                >
                                    {/* {formatNumberWithCommasAndDecimal(
                                        parseFloat(specificData.amount),
                                    )} */}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 5,
                                    justifyContent: "center",
                                    marginBottom: 15,
                                }}
                            >
                                <View
                                    style={{
                                        height: 30,
                                        width: 30,
                                        borderRadius: 15,
                                        backgroundColor: Colors.default3,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 10,
                                            backgroundColor: Colors.default1,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <MaterialIcons
                                            name="check"
                                            color="white"
                                            fontWeight="bold"
                                        />
                                    </View>
                                </View>
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 16,
                                        color: Colors.default1,
                                    }}
                                >
                                    Réussi
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "300",
                                        fontSize: 18,
                                        color: Colors.welcomeText,
                                    }}
                                >
                                    Ajouté au solde de votre portefeuille
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderRadius: 9,
                                flexDirection: "column",
                                padding: 18,
                                backgroundColor: "rgba(120, 120, 120, .2)",
                                paddingVertical: 20,
                                paddingBottom: 30,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "700",
                                    marginBottom: 18,
                                    color: Colors.welcomeText,
                                }}
                            >
                                Détails de la transaction
                            </Text>

                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 15,
                                    justifyContent: "center",
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        gap: 5,
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "600",
                                            fontSize: 14.5,
                                            opacity: 0.5,
                                            color: Colors.welcomeText,
                                        }}
                                    >
                                        Détails du destinataire
                                    </Text>
                                    <View
                                        style={{
                                            width: "50%",
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 18,
                                                color: Colors.welcomeText,
                                            }}
                                        >
                                            Toi
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        gap: 5,
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "600",
                                            fontSize: 14.5,
                                            opacity: 0.5,
                                            color: Colors.welcomeText,
                                        }}
                                    >
                                        Mode de paiement
                                    </Text>
                                    <View
                                        style={{
                                            width: "50%",
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 16,
                                                color: Colors.welcomeText,
                                            }}
                                        >
                                            Crédit wallet
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        gap: 5,
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "600",
                                            fontSize: 14.5,
                                            opacity: 0.5,
                                            color: Colors.welcomeText,
                                        }}
                                    >
                                        Date de la transaction
                                    </Text>
                                    <View
                                        style={{
                                            width: "50%",
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 15,
                                                color: Colors.welcomeText,
                                            }}
                                        >
                                            {FormatDateAndTime(
                                                specificData.registrationDateTime,
                                            )}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        gap: 5,
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "600",
                                            fontSize: 14.5,
                                            opacity: 0.5,
                                            color: Colors.welcomeText,
                                        }}
                                    >
                                        ID de transaction
                                    </Text>
                                    <View
                                        style={{
                                            width: "60%",
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "500",
                                                fontSize: 15,
                                                color: Colors.welcomeText,
                                            }}
                                        >
                                            {specificData.identifierId}

                                            <TouchableOpacity
                                                onPress={() =>
                                                    displayNotification(
                                                        specificData.identifierId,
                                                    )
                                                }
                                            >
                                                <MaterialIcons
                                                    name="file-copy"
                                                    size={16}
                                                    color={Colors.default1}
                                                    marginLeft={10}
                                                />
                                            </TouchableOpacity>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Button
                    color="white"
                    text={languageText.text282}
                    onPress={() => onPress(specificData)}
                />
            </View>
        </View>
    );
};

export default BonusReceiveReceipt;
