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
// import Button from "@/components/(Utils)/button";
import formatNumberWithCommasAndDecimal from "@/components/(Utils)/formatNumber";
import FormatDateAndTime from "@/components/(Utils)/formatedDateAndTime";
import ExploreHeader3 from "@/components/ExploreHeader3";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
// import { printToFile } from "@/components/(Utils)/htmlTemplate2";
import { Language } from "@/constants/languages";
const currency = "$";

const SentReceipt = ({route, navigation}: any) => {
  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
  );
  const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;
  const specificData: any = route.params;

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

  // const specificData = {
  //     amount: "5000",
  //     fundingType: "send",
  //     identifierId: "20ec4da9-6770-433b-8a10-3222d917561d",
  //     paymentConfirmation: "Successful",
  //     recipientid: "6638bee610e3cacb2ed1056c",
  //     registrationDateTime: "2024-05-17T14:09:39.515Z",
  //     status: "Successful",
  //     totalAmount: "5000",
  //     recipientTag: "rertyuio",
  //     recipientName: "hgfdssdfgh"
  // };

  // function onPress(specificData: any) {
  //     printToFile(specificData);
  // }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ExploreHeader3 />
      <ToastNotification
        show={show}
        text={`ID de pari copié avec succès ${specificData?.identifierId}`}
        textColor={Colors.toastText}
        backgroundColor={Colors.welcomeText}
        marginTop={40}
        icon={
          <AntDesign name='checkcircleo' size={40} color={Colors.default1} />
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
        <TouchableOpacity onPress={() => navigation.navigate("wallet")}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: Colors.welcomeText,
            }}
          >
            {languageText.text211}
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
        <ScrollView style={{marginBottom: 20}}>
          <View style={{flex: 1, flexDirection: "column", gap: 20}}>
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
                  -
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    color: Colors.welcomeText,
                    fontWeight: "800",
                    marginRight: 2,
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
                    parseFloat(specificData.amount)
                  )}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  justifyContent: "center",
                  marginBottom: 35,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    color: Colors.default1,
                  }}
                >
                  {languageText.text59}
                </Text>
              </View>
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
                      name='check'
                      color='white'
                      fontWeight='bold'
                    />
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    borderRadius: 15,
                    backgroundColor: Colors.default1,
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
                      name='check'
                      color='white'
                      fontWeight='bold'
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
                    {languageText.text272}
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
                    {languageText.text273}
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.welcomeText,
                      fontSize: 12,
                    }}
                  >
                    {FormatDateAndTime(specificData.registrationDateTime)}
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
                    {languageText.text274}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.default1,
                      fontSize: 15,
                      fontWeight: "900",
                      flexWrap: "wrap",
                      marginBottom: 4,
                    }}
                  >
                    @{specificData.recipientTag}
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      color: Colors.welcomeText,
                      fontSize: 12,
                    }}
                  >
                    {FormatDateAndTime(specificData.registrationDateTime)}
                  </Text>
                </View>
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
                {languageText.text74}
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
                    {languageText.text275}
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
                        fontSize: 13,
                        color: Colors.welcomeText,
                      }}
                    >
                      {specificData.recipientName} ||{" "}
                      {specificData.recipientTag}
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
                    {languageText.text75}
                  </Text>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 13,
                        color: Colors.welcomeText,
                      }}
                    >
                      {languageText.text276}
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
                    {languageText.text80}
                  </Text>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 13,
                        color: Colors.welcomeText,
                      }}
                    >
                      {FormatDateAndTime(specificData.registrationDateTime)}
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
                    {languageText.text81}
                  </Text>
                  <View
                    style={{
                      width: "50%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: 13,
                        color: Colors.welcomeText,
                      }}
                    >
                      {specificData.identifierId}

                      <TouchableOpacity
                        onPress={() =>
                          displayNotification(specificData.identifierId)
                        }
                      >
                        <MaterialIcons
                          name='file-copy'
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
        {/* <Button
                    color="white"
                    text={"Partager"}
                    onPress={() => onPress(specificData)}
                /> */}
      </View>
    </View>
  );
};

export default SentReceipt;
