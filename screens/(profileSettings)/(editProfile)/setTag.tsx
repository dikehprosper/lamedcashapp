/* eslint-disable */
import React, {useState, useEffect, useRef} from "react";
import {
  Vibration,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Keyboard,
  Pressable,
  Platform,
} from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import ExploreHeader3 from "@/components/ExploreHeader3";
import {defaultStyles} from "@/constants/Styles";
import Loader from "@/components/(Utils)/loader";
import ValidateTextInput from "@/components/(Utils)/ValidateTextInput";
import CountryCode from "@/components/(Utils)/countrySelector";
import NetworkModalPage from "@/components/(Utils)/NetworkModalPage";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import VerifyMobileNumber from "@/components/(Utils)/VerifyMobileNumber";
import * as Haptics from "expo-haptics";
import ToastNotification from "@/components/(Utils)/toastNotification";
import {Color} from "@/constants/Colors";
import {AppDispatch, RootState} from "@/state/store";
import {useDispatch, useSelector} from "react-redux";
import {Clipboard} from "react-native";
import { Language } from "@/constants/languages";
// Calculate the percentage value

const SetTag = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const data = useSelector((state: RootState) => state.getUserData.data);
    const isLoading = useSelector(
        (state: RootState) => state.getUserData.isLoading,
    );

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

    const dispatch = useDispatch<AppDispatch>();

    const [index, setIndex] = useState(0);

    // All inputs data initial state
    const [tag, setTag] = useState(data.tag);

    // SETTING MARGIN BOTTOM WHEN KEYBOARD IS BEING DISPLAYED
    // EXTRA SETTINGS ........
    // Input fucus and blur setting
    async function setItemOnFocus(index: React.SetStateAction<number>) {
        setIndex(index);
    }

    function setItemOnBlur() {
        setIndex(0);
        // if (betId === "") {
        //   setBetIdError(false);
        // }
    }

    // const inputRef = useRef<TextInput>(null);

    // // Function to copy text to clipboard in React Native
    // const copyToClipboard = async (text: string) => {
    //   try {
    //     await Clipboard.setString(text);
    //   } catch (error) {
    //     console.error("Error copying to clipboard:", error);
    //   }
    // };

    const [show, setShow] = useState(true);
    function displayNotification(text: string) {
        // copyToClipboard(`@${text}`);
        setShow(false);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(true);
        }, 3800);
    }

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    // // Verifying fullname field
    // const [tagError, setTagError] = useState(false);
    // const [tagLoadingSymbol, setTagLoadingSymbol] = useState("");
    // const [triggerTagRevalidation, setTriggerTagRevalidation] = useState(false);
    // const isValidTag = tag.length > 1;
    // const SignUpTagVerification = () => {
    //   if (tag === "") {
    //     return;
    //   }
    //   if (!triggerTagRevalidation) {
    //     setTagLoadingSymbol("true");
    //     setTimeout(() => {
    //       if (!isValidTag) {
    //         setTagError(true);
    //         setTagLoadingSymbol("");
    //         setTriggerTagRevalidation(true);
    //       } else {
    //         setTagError(false);
    //         setTagLoadingSymbol("false");
    //         setTriggerTagRevalidation(true);
    //       }
    //     }, 300);
    //   }
    // };

    // function handleSubmit() {
    //   setLoading2(true);

    //   if (tagLoadingSymbol !== "false") {
    //     setTagError(true);
    //   }
    //   // {
    //   //   setLoading2(false);
    //   //   return;
    //   // }

    //   //   dispatch(changeUserDetails(formData))
    //   //     .then(async (result) => {
    //   //       if (result.payload.success === true) {
    //   //         displayNotification2();
    //   //       }
    //   //       if (result.payload.status === 402) {
    //   //         displayNotification3();
    //   //       }
    //   //       if (result.payload.status === 400) {
    //   //         displayNotification4();
    //   //       }
    //   //       if (result.payload.status === 502) {
    //   //         navigation.replace("login2", {status: result.payload.status});
    //   //       }
    //   //     })
    //   //     .catch((err) => console.log(err));
    //   // }, 1000);
    // }

    return (
        <TouchableWithoutFeedback
            // onPress={handleDismissKeyboard}
            style={{
                flex: 1,

                position: "relative",
            }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.background,
                    position: "relative",
                }}
            >
                <ExploreHeader3 />
                <ToastNotification
                    show={show}
                    text="Désolé Seuls les numéros béninois sont autorisés"
                    textColor={Colors.toastText}
                    marginTop={Platform.OS === "ios" ? 40 : 0}
                    backgroundColor={Colors.welcomeText}
                    icon={
                        <AntDesign
                            name="checkcircleo"
                            size={40}
                            color={Colors.toastText}
                        />
                    }
                />
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
                        ></Text>
                        <Text></Text>
                    </View>

                    <ScrollView
                        style={{
                            display: "flex",
                            gap: 20,
                            paddingVertical: 20,
                            paddingBottom: 80,
                            flex: 8,
                            backgroundColor: Colors.background,
                        }}
                        // scrollEnabled={true}
                        // // automaticallyAdjustKeyboardInsets={true}
                        // alwaysBounceVertical={true}
                        // showsVerticalScrollIndicator={false}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "800",
                                color: Colors.welcomeText,
                                marginBottom: 3,
                            }}
                        >
                            {languageText.text120}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "300",
                                color: Colors.welcomeText,
                                marginBottom: 10,
                            }}
                        >
                            {languageText.text128}
                        </Text>

                        <View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "700",
                                    color: Colors.welcomeText,
                                    opacity: 0.6,
                                    marginTop: 20,
                                }}
                            >
                             {languageText.text129}
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    marginTop: 6,
                                    backgroundColor: Colors.inputBackground,
                                    borderRadius: 8,
                                    borderColor:
                                        index === 1
                                            ? Colors.default1
                                            : "transparent",
                                    borderWidth: 1.5,
                                    position: "relative",
                                }}
                            >
                                <View
                                    style={{
                                        position: "absolute",
                                        top: -19,
                                        right: 2,
                                    }}
                                >
                                    {/* {tagError && (
                    <Text
                      style={{fontWeight: "600", fontSize: 12, color: "red"}}
                    >
                      * Please enter a valid name
                    </Text>
                  )} */}
                                </View>
                                <Text
                                    style={{
                                        opacity: 1,
                                        fontSize: 17,
                                        fontWeight: "700",
                                        color: Colors.welcomeText,
                                    }}
                                >
                                    @
                                </Text>
                                <TextInput
                                    value={data.tag}
                                    onChangeText={setTag}
                                    // onChange={SignUpFullnameReVerification}
                                    onFocus={() => setItemOnFocus(1)}
                                    onBlur={setItemOnBlur}
                                    placeholderTextColor={
                                        Colors.placeHolderTextColor
                                    }
                                    autoCapitalize="none"
                                    placeholder="Nom et prénom"
                                    autoCorrect={false}
                                    style={[
                                        defaultStyles.inputField,
                                        {
                                            textAlign: "center",
                                            flex: 0,
                                            color: Colors.welcomeText,
                                            padding: 2,
                                        },
                                    ]}
                                    // onEndEditing={SignUpTagVerification}
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        displayNotification(data.tag)
                                    }
                                    style={styles.actionRow_2_background2}
                                >
                                    <Text
                                        style={[
                                            styles.actionRow_2_text2,
                                            { color: Colors.primary4 },
                                        ]}
                                    >
                                        <MaterialIcons
                                            name="file-copy"
                                            size={19}
                                            color={Colors.default1}
                                        />
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ paddingRight: 10.4 }}>
                                    {/* {tagLoadingSymbol === "true" ? (
                    <ActivityIndicator size='small' color={Colors.primary3} />
                  ) : tagLoadingSymbol === "false" ? (
                    <MaterialIcons
                      name='verified'
                      size={19}
                      color={Colors.default1}
                    />
                  ) : null} */}
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.default1,
                                height: 48,
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                                gap: 8,
                                marginTop: 100,
                                opacity: loading2 ? 1 : 0.5,
                            }}
                            // onPress={() => handleSubmit()}
                        >
                            {loading2 && (
                                <ActivityIndicator size="small" color="white" />
                            )}
                            <Text style={defaultStyles.btnText}>
                              {languageText.text124}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <Loader visible={loading} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
 
    position: "relative",
  },
  transaction_template_container_header_1: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "700",
    gap: 12,
    flexDirection: "row",
    flex: 0.5,
  },
  container2: {
    display: "flex",
    gap: 3,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    flex: 1.2,
  },
  actionRow_2_background2: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: 23,
    paddingRight: 6,
    paddingLeft: 6,
    marginLeft: 14,
  },
  actionRow_2_text2: {
    alignSelf: "center",
  },
});

export default SetTag;
