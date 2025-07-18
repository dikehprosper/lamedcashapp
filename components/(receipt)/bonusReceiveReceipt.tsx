/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from "react";
import {
  TouchableOpacity,
  View,
  Clipboard,
  Text,
  ScrollView,
} from "react-native";
// import Button from "../(Utils)/button";
import {MaterialIcons, AntDesign} from "@expo/vector-icons";
import ToastNotification from "@/components/(Utils)/toastNotification";
import * as Haptics from "expo-haptics";
import {Color} from "@/constants/Colors";
import formatNumberWithCommasAndDecimal from "../(Utils)/formatNumber";
import FormatDateAndTime from "../(Utils)/formatedDateAndTime";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Language } from "@/constants/languages";
const currency = "$";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BonusReceiveReceipt = ({specificData, onPress}: any) => {
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
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ToastNotification
        show={show}
        text={`ID de pari copié avec succès ${specificData.transactionId}`}
        textColor={Colors.toastText}
        backgroundColor={Colors.background}
        icon={
          <AntDesign name='checkcircleo' size={40} color={Colors.toastText} />
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
                  +
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
                      name='check'
                      color='white'
                      fontWeight='bold'
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
                  {languageText.text59}
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
                  {languageText.text284}
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
                        fontSize: 18,
                        color: Colors.welcomeText,
                      }}
                    >
                      {languageText.text277}
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
                    {languageText.text283}
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
                      {languageText.text285}
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
                    {languageText.text286}
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
                    text={languageText.text282}
                    onPress={() => onPress(specificData)}
                /> */}
      </View>
    </View>
  );
};

export default BonusReceiveReceipt;
