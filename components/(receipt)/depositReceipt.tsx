/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from "react";
import {
  TouchableOpacity,
  View,
  Clipboard,
  Text,
  ScrollView,
  Image
} from "react-native";
import Button from "../(Utils)/button";
import {MaterialIcons, AntDesign} from "@expo/vector-icons";
import ToastNotification from "@/components/(Utils)/toastNotification";
import * as Haptics from "expo-haptics";
import { Color } from "@/constants/Colors";
import formatNumberWithCommasAndDecimal from "../(Utils)/formatNumber";
import FormatDateAndTime from "../(Utils)/formatedDateAndTime";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Language } from "@/constants/languages";
const currency = "XOF";

const DepositReceipt = ({ specificData, onPress }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

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

    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <ToastNotification
                show={show}
                text={`ID de pari copié avec succès ${specificData.identifierId}`}
                textColor={Colors.toastText}
                backgroundColor={Colors.default1}
                icon={
                    <AntDesign
                        name="checkcircleo"
                        size={40}
                        color={Colors.toastText}
                    />
                }
            />

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
                {specificData.customErrorCode && (
                    <View
                        style={{
                            width: "100%",
                            paddingVertical: 13,
                            backgroundColor: "#FFF4E5",
                            marginBottom: 15,
                            borderRadius: 10,
                            flexDirection: "row",
                        }}
                    >
                        <View
                            style={{
                                width: "16%",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <AntDesign
                                name="exclamationcircleo"
                                size={22}
                                color="#FF9100"
                            />
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flex: 1,
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#FF9100",
                                    fontSize: 12,
                                    width: "98%",
                                }}
                            >
                                {
                                    specificData.customErrorCode === 301 &&
                                        languageText.text82
                                    //The transaction wasn't completed because the POS currency does not match the customer's account currency.
                                }
                                {
                                    specificData.customErrorCode === 302 &&
                                        languageText.text83
                                    //The transaction wasn't completed because Your Payment wasn't accepted by you
                                }
                                {specificData.customErrorCode === 300 &&
                                    `${languageText.text84} ${specificData.totalAmount} ${languageText.text85} #${specificData.id}. ${languageText.text86}`}
                            </Text>
                        </View>
                    </View>
                )}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 20 }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            gap: 20,
                        }}
                    >
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
                                        fontWeight: "400",
                                        marginRight: 4,
                                    }}
                                >
                                    {currency}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 30,
                                        color: Colors.welcomeText,
                                        fontWeight: "800",
                                    }}
                                >
                                    {formatNumberWithCommasAndDecimal(
                                        parseFloat(specificData.totalAmount),
                                    )}
                                </Text>
                            </View>

                            {specificData.status === "Successful" && (
                                <View
                                    style={{
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 5,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "700",
                                            fontSize: 16,
                                            marginBottom: 35,
                                            color:
                                                specificData.status ===
                                                "Pending"
                                                    ? "rgba(120, 120, 120, 1)"
                                                    : specificData.status ===
                                                        "Failed"
                                                      ? "red"
                                                      : Colors.default1,
                                        }}
                                    >
                                        {languageText.text59}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 5,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignSelf: "center",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                height: 1,
                                                gap: 15,
                                                width: "60%",
                                                marginBottom: 20,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    borderRadius: 15,
                                                    backgroundColor:
                                                        Colors.default3,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: 10,
                                                        backgroundColor:
                                                            Colors.default1,
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <MaterialIcons
                                                        name="check"
                                                        color="white"
                                                        fontWeight="bold"
                                                    />
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    height: 1,
                                                    borderRadius: 15,
                                                    backgroundColor:
                                                        Colors.default1,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flex: 1,
                                                }}
                                            ></View>

                                            <View
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    borderRadius: 15,
                                                    backgroundColor:
                                                        Colors.default3,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: 10,
                                                        backgroundColor:
                                                            Colors.default1,
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <MaterialIcons
                                                        name="check"
                                                        color="white"
                                                        fontWeight="bold"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignSelf: "center",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                width: "100%",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "50%",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {
                                                        languageText.text66
                                                        //initialize
                                                    }
                                                </Text>
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        flexWrap: "wrap",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {
                                                        languageText.text45
                                                        //Deposit
                                                    }
                                                </Text>

                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {FormatDateAndTime(
                                                        specificData.registrationDateTime,
                                                    )}
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    width: "50%",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        flexWrap: "wrap",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {
                                                        languageText.text45
                                                        //Deposit
                                                    }
                                                </Text>
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        flexWrap: "wrap",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {
                                                        languageText.text67
                                                        //Completed
                                                    }
                                                </Text>

                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {FormatDateAndTime(
                                                        specificData.registrationDateTime,
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignSelf: "center",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            width: "100%",
                                            marginTop: 20,
                                            paddingHorizontal: 25,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: Colors.welcomeText,
                                                fontSize: 15,
                                                fontWeight: "500",
                                                marginBottom: 4,
                                                opacity: 0.55,
                                            }}
                                        >
                                            {
                                                languageText.text68
                                                //amount Payed
                                            }
                                        </Text>

                                        <Text
                                            style={{
                                                textAlign: "center",
                                                color: Colors.welcomeText,
                                                fontSize: 15,
                                                fontWeight: "500",
                                                flexWrap: "wrap",
                                                marginBottom: 4,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: Colors.welcomeText,
                                                        fontWeight: "400",
                                                        marginRight: 4,
                                                    }}
                                                >
                                                    {currency}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: Colors.welcomeText,
                                                        fontWeight: "800",
                                                    }}
                                                >
                                                    {formatNumberWithCommasAndDecimal(
                                                        parseFloat(
                                                            specificData.amount,
                                                        ),
                                                    )}
                                                </Text>
                                            </View>
                                        </Text>
                                    </View>
                                    {specificData?.bonusBalance ? (
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignSelf: "center",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                width: "100%",
                                                paddingHorizontal: 25,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: Colors.welcomeText,
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    marginBottom: 4,
                                                    opacity: 0.55,
                                                }}
                                            >
                                                {
                                                    languageText.text69
                                                    //Bonus used
                                                }
                                            </Text>

                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    color: Colors.welcomeText,
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    flexWrap: "wrap",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            color: Colors.welcomeText,
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        -
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            color: Colors.welcomeText,
                                                            fontWeight: "400",
                                                            marginRight: 4,
                                                        }}
                                                    >
                                                        {currency}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            color: Colors.welcomeText,
                                                            fontWeight: "800",
                                                        }}
                                                    >
                                                        {formatNumberWithCommasAndDecimal(
                                                            parseFloat(
                                                                specificData?.bonusBalance,
                                                            ),
                                                        )}
                                                    </Text>
                                                </View>
                                            </Text>
                                        </View>
                                    ) : null}
                                </View>
                            )}
                            {specificData.status === "Failed" && (
                                <>
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
                                                backgroundColor:
                                                    "rgba(256, 0, 0, 0.4)",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    borderRadius: 10,
                                                    backgroundColor: "red",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: "white",
                                                        fontWeight: "900",
                                                    }}
                                                >
                                                    X
                                                </Text>
                                            </View>
                                        </View>
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                fontSize: 16,
                                                color:
                                                    specificData.status ===
                                                    "Pending"
                                                        ? "rgba(120, 120, 120, 1)"
                                                        : specificData.status ===
                                                            "Failed"
                                                          ? "red"
                                                          : Colors.default1,
                                            }}
                                        >
                                            {
                                                languageText.text70
                                                //Failed
                                            }
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "column",
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
                                            {
                                                languageText.text71
                                                // Failed to use for deposit.
                                            }
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: "300",
                                                fontSize: 18,
                                                color: Colors.welcomeText,
                                            }}
                                        >
                                            {FormatDateAndTime(
                                                specificData.registrationDateTime,
                                            )}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignSelf: "center",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            width: "100%",
                                            marginTop: 20,
                                            paddingHorizontal: 25,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: Colors.welcomeText,
                                                fontSize: 15,
                                                fontWeight: "500",
                                                marginBottom: 4,
                                                opacity: 0.55,
                                            }}
                                        >
                                            {
                                                languageText.text68
                                                //amount payed
                                            }
                                        </Text>

                                        <Text
                                            style={{
                                                textAlign: "center",
                                                color: Colors.welcomeText,
                                                fontSize: 15,
                                                fontWeight: "500",
                                                flexWrap: "wrap",
                                                marginBottom: 4,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: Colors.welcomeText,
                                                        fontWeight: "400",
                                                        marginRight: 4,
                                                    }}
                                                >
                                                    {currency}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        color: Colors.welcomeText,
                                                        fontWeight: "800",
                                                    }}
                                                >
                                                    {formatNumberWithCommasAndDecimal(
                                                        parseFloat(
                                                            specificData.amount,
                                                        ),
                                                    )}
                                                </Text>
                                            </View>
                                        </Text>
                                    </View>
                                    {specificData?.bonusBalance ? (
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignSelf: "center",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                width: "100%",
                                                paddingHorizontal: 25,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: Colors.welcomeText,
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    marginBottom: 4,
                                                    opacity: 0.55,
                                                }}
                                            >
                                                {
                                                    languageText.text69
                                                    // bonus used
                                                }
                                            </Text>

                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    color: Colors.welcomeText,
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    flexWrap: "wrap",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            color: Colors.welcomeText,
                                                            fontWeight: "400",
                                                            marginRight: 4,
                                                        }}
                                                    >
                                                        {currency}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            color: Colors.welcomeText,
                                                            fontWeight: "800",
                                                        }}
                                                    >
                                                        {formatNumberWithCommasAndDecimal(
                                                            parseFloat(
                                                                specificData?.bonusBalance,
                                                            ),
                                                        )}
                                                    </Text>
                                                </View>
                                            </Text>
                                        </View>
                                    ) : null}
                                </>
                            )}
                            {specificData.status === "Pending" && (
                                <View
                                    style={{
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 5,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "700",
                                            fontSize: 16,
                                            marginBottom: 35,
                                            color:
                                                specificData.status ===
                                                "Pending"
                                                    ? "rgba(120, 120, 120, 1)"
                                                    : specificData.status ===
                                                        "Failed"
                                                      ? "red"
                                                      : Colors.default1,
                                        }}
                                    >
                                        {
                                            languageText.text72
                                            //awaiting approval
                                        }
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 5,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignSelf: "center",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                height: 1,
                                                gap: 15,
                                                width: "60%",
                                                marginBottom: 20,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    borderRadius: 15,
                                                    backgroundColor:
                                                        Colors.default3,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: 10,
                                                        backgroundColor:
                                                            Colors.default1,
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <MaterialIcons
                                                        name="check"
                                                        color="white"
                                                        fontWeight="bold"
                                                    />
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    height: 1,
                                                    borderRadius: 15,
                                                    backgroundColor:
                                                        Colors.default1,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flex: 1,
                                                }}
                                            ></View>

                                            <View
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    borderRadius: 15,
                                                    backgroundColor:
                                                        "rgba(120, 120, 120, 0.4)",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: 10,
                                                        backgroundColor:
                                                            "rgba(120, 120, 120, 1)",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <MaterialIcons
                                                        name="check"
                                                        color="white"
                                                        fontWeight="bold"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignSelf: "center",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                width: "100%",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: "50%",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {
                                                        languageText.text66
                                                        //initialize
                                                    }
                                                </Text>
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        flexWrap: "wrap",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {
                                                        languageText.text45
                                                        //Deposit
                                                    }
                                                </Text>

                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {FormatDateAndTime(
                                                        specificData.registrationDateTime,
                                                    )}
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    width: "50%",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        flexWrap: "wrap",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {
                                                        languageText.text60
                                                        //Pending
                                                    }
                                                </Text>
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        flexWrap: "wrap",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {
                                                        languageText.text73
                                                        //Approval
                                                    }
                                                </Text>

                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 12,
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
                                                alignSelf: "center",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                width: "100%",
                                                marginTop: 20,
                                                paddingHorizontal: 25,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: Colors.welcomeText,
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    marginBottom: 4,
                                                    opacity: 0.55,
                                                }}
                                            >
                                                {
                                                    languageText.text68
                                                    //amount payed
                                                }
                                            </Text>

                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    color: Colors.welcomeText,
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    flexWrap: "wrap",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            color: Colors.welcomeText,
                                                            fontWeight: "400",
                                                            marginRight: 4,
                                                        }}
                                                    >
                                                        {currency}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            color: Colors.welcomeText,
                                                            fontWeight: "800",
                                                        }}
                                                    >
                                                        {formatNumberWithCommasAndDecimal(
                                                            parseFloat(
                                                                specificData.amount,
                                                            ),
                                                        )}
                                                    </Text>
                                                </View>
                                            </Text>
                                        </View>
                                        {specificData?.bonusBalance ? (
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignSelf: "center",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "flex-start",
                                                    width: "100%",
                                                    paddingHorizontal: 25,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        marginBottom: 4,
                                                        opacity: 0.55,
                                                    }}
                                                >
                                                    {
                                                        languageText.text69
                                                        //bonus used
                                                    }
                                                </Text>

                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.welcomeText,
                                                        fontSize: 15,
                                                        fontWeight: "500",
                                                        flexWrap: "wrap",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                color: Colors.welcomeText,
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            -
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                color: Colors.welcomeText,
                                                                fontWeight:
                                                                    "400",
                                                                marginRight: 4,
                                                            }}
                                                        >
                                                            {currency}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                color: Colors.welcomeText,
                                                                fontWeight:
                                                                    "800",
                                                            }}
                                                        >
                                                            {formatNumberWithCommasAndDecimal(
                                                                parseFloat(
                                                                    specificData?.bonusBalance,
                                                                ),
                                                            )}
                                                        </Text>
                                                    </View>
                                                </Text>
                                            </View>
                                        ) : null}
                                    </View>
                                </View>
                            )}
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
                                {
                                    languageText.text74
                                    //Transaction Details
                                }
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
                                        {
                                            languageText.text75
                                            //payment method
                                        }
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
                                            {
                                                languageText.text76
                                                //For Deposit
                                            }
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
                                        {
                                            languageText.text77
                                            //payment confirmation
                                        }
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: 17,
                                                color:
                                                    specificData.paymentConfirmation ===
                                                    "Pending"
                                                        ? "rgba(120, 120, 120, 1)"
                                                        : specificData.paymentConfirmation ===
                                                            "Failed"
                                                          ? "red"
                                                          : "green",
                                            }}
                                        >
                                            {specificData.paymentConfirmation ===
                                            "Pending"
                                                ? languageText.text60
                                                : specificData.paymentConfirmation ===
                                                    "Failed"
                                                  ? languageText.text70
                                                  : languageText.text59}
                                            {/* {specificData.paymentConfirmation} */}
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
                                        {
                                            languageText.text78
                                            //ID
                                        }
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
                                            {specificData.betId}
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
                                        {
                                            languageText.text79
                                            //Number
                                        }
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
                                            {specificData.momoNumber}
                                        </Text>
                                    </View>
                                </View>
                                {/* <View
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
                                        Service
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
                                            {specificData.service ===
                                            "1xbet" ? (
                                                <Image
                                                    source={require("../../assets/images/1xbet.png")}
                                                    style={{
                                                        height: 30,
                                                        width: 65,
                                                        resizeMode: "contain",
                                                    }}
                                                />
                                            ) : (
                                                specificData.service
                                            )}
                                        </Text>
                                    </View>
                                </View> */}

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
                                        {
                                            languageText.text80
                                            // Transaction Date
                                        }
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
                                        {
                                            languageText.text81
                                            //Transaction ID
                                        }
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
                {specificData.status === "Pending" ||
                specificData.status === "Successful" ? (
                    <Button
                        color="white"
                        text={languageText.text282}
                        onPress={() => onPress(specificData)}
                    />
                ) : null}
            </View>
        </View>
    );
};

export default DepositReceipt;