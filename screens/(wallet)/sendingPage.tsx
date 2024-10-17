/* eslint-disable */

import ExploreHeader from "@/components/ExploreHeader";
import React, { useState, useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,

    TouchableWithoutFeedback,
    ActivityIndicator,
    Animated,
    Easing,
    FlatList,
    useWindowDimensions,
    Pressable,
    Vibration,
    Keyboard,
    Switch,
} from "react-native";
import { TextInput } from "@react-native-material/core";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
<MaterialCommunityIcons name="hand-wave-outline" size={24} color="black" />;
const screenHeight = Dimensions.get("window").height;
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { defaultStyles } from "@/constants/Styles";
const Stack = createNativeStackNavigator();
import data1 from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
import BetIdModalPage from "@/components/(Utils)/BetIdModalPage";
import ExploreHeader3 from "@/components/ExploreHeader3";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import Paginator from "@/components/(Utils)/Paginator2";
import slides from "@/components/(Utils)/slide2";
import AdvertItem from "@/components/(userscomponent)/advertItem";
import slides3 from "@/components/(Utils)/slides3";
import formatNumberWithCommasAndDecimal, {
    formatNumber,
    formatNumberWithCommasAndDecimal2,
} from "@/components/(Utils)/formatNumber";
import CountryCode from "@/components/(Utils)/countrySelector";
import VerifyMobileNumber from "@/components/(Utils)/VerifyMobileNumber";
import NetworkModalPage from "@/components/(Utils)/NetworkModalPage";
import ToastNotification from "@/components/(Utils)/toastNotification";
import { Color } from "@/constants/Colors";
import slide4 from "@/components/(Utils)/slide4";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { walletSend } from "@/state/userData/getUserData";
import LoadingComponent from "@/components/loadingComponentForDeposit";
import { CommonActions } from "@react-navigation/native";
import { Language } from "@/constants/languages";

// Calculate the percentage value
const percentageHeight = screenHeight * 0.375;
const percentageHeight2 = screenHeight * 1;

const SendingPage = ({ navigation, route, title }: any) => {
    const data = useSelector((state: RootState) => state.getUserData.data);
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

    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch<AppDispatch>();

    // EXTRA SETTINGS ........
    // Input fucus and blur setting
    async function setItemOnFocus(index: React.SetStateAction<number>) {
        setIndex(index);
    }

    function setItemOnBlur() {
        setIndex(0);
    }

    const specificData = route.params;

    //function to close keyboard
    const inputRef = useRef<any>(null);
    const inputRef2 = useRef<any>(null);

    const handleDismissKeyboard = () => {
        inputRef.current?.blur();
        inputRef2.current?.blur();
    };

    const [betId, setBetId] = useState<any>(data?.supplementaryBetId[0]);
    const [amount, setAmount] = useState<any>();
    const [number, setNumber] = useState(data?.number);

    // verifying amount
    const [amountError, setAmountError] = useState(false);
    const [amountLoadingSymbol, setAmountLoadingSymbol] = useState("");
    const [triggerAmountRevalidation, setTriggerAmountRevalidation] =
        useState(false);

    const isValidAmount = amount >= 100
    const SignUpAmountVerification = () => {
        if (amount === "") {
            return;
        }
        if (!triggerAmountRevalidation) {
            setAmountLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidAmount) {
                    setAmountError(true);
                    setAmountLoadingSymbol("");
                    setTriggerAmountRevalidation(true);
                } else {
                    setAmountError(false);
                    setAmountLoadingSymbol("false");
                    setTriggerAmountRevalidation(true);
                }
            }, 300);
        }
    };

    //reverifying amount entry
    const [triggerAmountRevalidation2, setTriggerAmountRevalidation2] =
        useState(false);

    if (triggerAmountRevalidation) {
        setTimeout(() => {
            if (!isValidAmount) {
                if (amount === "") {
                    setAmountError(false);
                }
                if (amount !== "") {
                    setAmountError(true);
                }
                setAmountLoadingSymbol("");
            } else {
                setAmountError(false);
                setAmountLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerAmountRevalidation2) {
        setTimeout(() => {
            if (!isValidAmount) {
                if (amount === "") {
                    //  setEmailError(false);
                }
                if (amount !== "") {
                    setAmountError(true);
                }
                setAmountLoadingSymbol("");
            } else {
                setAmountError(false);
                setAmountLoadingSymbol("false");
            }
        }, 300);
    }

    const [loading2, setLoading2] = useState(false);

    function handleSubmit() {
        if (loading2) return;
        setLoading2(true);

        if (amountLoadingSymbol !== "false") {
            triggerHapticFeedback();
            setAmountError(true);
            setTriggerAmountRevalidation2(true);
        }

        if (amountLoadingSymbol !== "false") {
            setLoading2(false);
            return;
        }

        const formData = {
            id: data._id,
            amount: amount,
            recipientId: specificData._id,
        };
        console.log(formData);
        dispatch(walletSend(formData))
            .then(async (result) => {
                if (result.payload.success === true) {
                    try {
                        triggerHapticFeedback();
                        navigation.push(
                            "sentReceipt",
                            result.payload.userTransaction,
                        );
                        setLoading2(false);
                    } catch (err) {
                        console.log(err);
                        setLoading2(false);
                    }
                }
                if (result.payload.status === 401) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "login" }],
                        }),
                    );
                    setLoading2(false);
                }
                if (result.payload.status === 502) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "login" }],
                        }),
                    );
                    setLoading2(false);
                }
                if (result.payload.status === 402) {
                    displayNotification();
                    setLoading2(false);
                }
                if (result.payload.status === 503) {
                    displayNotification2();
                    setLoading2(false);
                }
                if (result.payload.status === 504) {
                    displayNotification3();
                    setLoading2(false);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading2(false);
            });
    }

    //animation adverts
    //   const scrollX = useRef(new Animated.Value(0)).current;
    //   const [currentIndex, setCurrentIndex] = useState(0);
    //   const viewableItemsChanged = useRef(({viewableItems}: any) => {
    //     setCurrentIndex(viewableItems[0].index);
    //   }).current;
    //   const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
    //   const slidesRef = useRef<any>(null);
    //   const {width} = useWindowDimensions();
    //   const scrollTo = () => {
    //     if (currentIndex < slides.length - 1) {
    //       slidesRef?.current?.scrollToIndex({index: currentIndex + 1});
    //     } else if (currentIndex === slides.length - 1) {
    //       slidesRef?.current?.scrollToIndex({index: 0});
    //     } else {
    //       console.log("Last item.");
    //     }
    //   };

    // useEffect(() => {
    //   setTimeout(() => {
    //     scrollTo();
    //   }, 4000);
    // }, [scrollTo]);

    const [colorIndex, setColorIndex] = useState<any>();

    function chooseAmount(index: number) {
        console.log(index);
        if (index === 0) {
            if (data.bonusBalance < 500) {
                displayNotification5();
            } else {
                setColorIndex(0);
                const value = (25 / 100) * data.bonusBalance;

                setAmount(`${value}`);
            }
        }

        if (index === 1) {
            if (data.bonusBalance < 500) {
                displayNotification5();
            } else {
                setColorIndex(1);
                const value = (50 / 100) * data.bonusBalance;
                setAmount(`${value}`);
            }
        }
        if (index === 2) {
            if (data.bonusBalance < 500) {
                displayNotification5();
            } else {
                setColorIndex(2);
                const value = (75 / 100) * data.bonusBalance;
                setAmount(`${value}`);
            }
        }
        if (index === 3) {
            if (data.bonusBalance < 500) {
                displayNotification5();
            } else {
                setColorIndex(3);
                const value = (100 / 100) * data.bonusBalance;
                setAmount(`${value}`);
            }
        }

        SignUpAmountVerification();
    }

    //FOR TOAstNotification
    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(2);
    const text1 = `le destinataire n'existe pas`;
    const text2 = `le destinataire a été désactivé`;
    const text3 = `solde insuffisant`;
    const text4 = `Impossible de lancer la transaction`;
    const text5 = `Impossible de lancer la transaction`;

    const icon1 = (
        <AntDesign name="checkcircleo" size={40} color={Colors.toastText} />
    );
    const icon2 = (
        <AntDesign
            name="exclamationcircleo"
            size={40}
            color={Colors.toastText}
        />
    );

    function displayNotification() {
        setShow(1);
        setDisplay(1);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 3800);
    }
    function displayNotification2() {
        setShow(2);
        setDisplay(2);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    function displayNotification3() {
        setShow(3);
        setDisplay(3);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    // function displayNotification4() {
    //     setShow(4);
    //     setDisplay(4);
    //     triggerHapticFeedback();
    //     setTimeout(() => {
    //         setShow(0);
    //     }, 5000);
    // }
    function displayNotification5() {
        setShow(5);
        setDisplay(5);
        triggerHapticFeedback();
        setTimeout(() => {
            setShow(0);
        }, 5000);
    }
    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
        }}
      >
        <ExploreHeader3 />
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.background,
          }}
        >
          <View style={styles.transaction_template_container_header_1}>
            <TouchableOpacity
              onPressIn={() => navigation.goBack()}
              style={{
                paddingTop: 3,
                paddingBottom: 3,
                paddingRight: 3,
                backgroundColor: "transparent",
                borderColor: Colors.welcomeText,
                opacity: 0.6,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <MaterialIcons
                name='arrow-back-ios-new'
                size={21}
                color={Colors.welcomeText}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.welcomeText,
                fontWeight: "600",
                opacity: 0.8,
                fontSize: 21,
              }}
            >
              {languageText.text268}
            </Text>
            <View></View>
          </View>
          <ToastNotification
            show={show === 0 ? true : false}
            text={
              display === 1
                ? text1
                : display === 2
                  ? text2
                  : display === 3
                    ? text3
                    : display === 4
                      ? text4
                      : text5
            }
            textColor='white'
            backgroundColor='red'
            icon={
              <AntDesign name='exclamationcircleo' size={40} color='white' />
            }
          />

          <TouchableOpacity
            style={{
              padding: 18,
              gap: 8,
              display: "flex",
              justifyContent: "center",
              marginHorizontal: 8,
              marginVertical: 13,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: Colors.welcomeText,
                opacity: 0.5,
                marginBottom: 10,
              }}
            >
              {languageText.text270}
            </Text>
            <View style={styles.transaction_result}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: specificData.image
                      ? specificData.image
                      : "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Untitled%20design%20(4)%20(1).png?alt=media&token=7f06a2ba-e4c5-49a2-a029-b6688c9be61d",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
              </View>

              <View style={styles.small_device_group}>
                <Text
                  style={{
                    color: Colors.welcomeText,
                    fontWeight: "700",
                    fontSize: 15,
                    opacity: 0.9,
                  }}
                >
                  {specificData.fullname}
                </Text>

                <Text
                  style={{
                    color: Colors.welcomeText,
                    fontSize: 11,
                    fontWeight: "600",
                    opacity: 0.6,
                    padding: 2.5,
                  }}
                >
                  {specificData.email}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  gap: 3,
                  flexDirection: "column",
                  justifyContent: "center",
                  // backgroundColor: "red",
                }}
              >
                <View
                  style={{
                    padding: 2.5,
                    borderRadius: 3,

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "900",
                      color: Colors.welcomeText,
                      opacity: 0.5,
                    }}
                  >
                    @{specificData.tag}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
            <ScrollView
              scrollEnabled={true}
              automaticallyAdjustKeyboardInsets={true}
              alwaysBounceVertical={true}
              showsVerticalScrollIndicator={false}
              style={styles.container3}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginTop: 18,
                  backgroundColor: Colors.depositBackground,
                  padding: 18,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "700",
                      color: Colors.welcomeText,
                      opacity: 0.5,
                    }}
                  >
                    {languageText.text47}
                  </Text>
                  <View
                    style={{
                      opacity: 0.8,
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "300",
                        color: Colors.welcomeText,
                        textAlign: "center",
                      }}
                    >
                      {languageText.text206}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: Colors.welcomeText,
                        textAlign: "center",
                      }}
                    >
                      {formatNumberWithCommasAndDecimal(
                        parseFloat(data?.bonusBalance)
                      )}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 12,

                    borderRadius: 8,
                    paddingTop: 20,
                    position: "relative",
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 2,
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    {amountError && (
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 12,
                          color: "red",
                        }}
                      >
                        * {languageText.text271}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      top: 20,
                      bottom: 0,
                      left: 140,

                      zIndex: 15,
                      flexDirection: "row",
                      width: "100%",
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "space-around",
                      position: "absolute",
                    }}
                  >
                    {slide4.map((choice, index) => {
                      if (choice.percentage === "100%") {
                        return (
                          <TouchableOpacity
                            style={{
                              width: 70,
                              height: 37,

                              borderRadius: 8,
                              marginBottom: 10,
                            }}
                            onPress={() => chooseAmount(index)}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 14.5,
                                  color: Colors.welcomeText,
                                  fontWeight: "600",
                                }}
                              >
                                MAX
                                {/* {choice.percentage} */}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    })}
                  </View>

                  <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    variant='outlined'
                    label='Entrer le montant'
                    autoCorrect={false}
                    placeholderTextColor={Colors.placeHolderTextColor}
                    placeholder='200 et plus'
                    autoCapitalize='none'
                    color={Colors.default1}
                    style={[
                      {
                        width: "100%",
                        height: 64,
                      },
                    ]}
                    selectionColor={Colors.default1}
                    onEndEditing={SignUpAmountVerification}
                    keyboardType='number-pad'
                  />
                </View>
              </View>
              {loading2 && <LoadingComponent />}
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.default1,
                  height: 50,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  marginTop: 30,
                  marginBottom: 27,
                  opacity: loading2 ? 0.5 : 1,
                }}
                onPress={handleSubmit}
                disabled={loading2}
              >
                {loading2 && <ActivityIndicator size='small' color='white' />}
                <Text style={defaultStyles.btnText}>
                  {languageText.text199}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
        padding: 10,
        backgroundColor: "transparent",
        borderRadius: 8,
        height: percentageHeight,
    },
    container2: {
        alignSelf: "center",
        height: 100,
        position: "relative",
        marginBottom: 10,

        width: "100%",
        borderRadius: 12,
    },
    container3: {
        display: "flex",
        borderRadius: 8,
        flex: 1,
        height: percentageHeight2,
        paddingHorizontal: 12,
    },
    transaction_template_container_header_1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: "700",
        flexDirection: "row",
        padding: 15,
    },
    child: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
    },
    switchContainer: {
        transform: [{ scaleX: 1 }, { scaleY: 0.8 }], // Scale the switch up to 150% of its original size
    },
    small_device_group: {
        display: "flex",
        flex: 1,
        gap: 3,
        flexDirection: "column",
        justifyContent: "center",
        // backgroundColor: "red",
        // whiteSpace: 'nowrap'
    },
    transaction_result: {
        gap: 8,
        display: "flex",
        height: 45,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default SendingPage;
