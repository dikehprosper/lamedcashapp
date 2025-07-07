/* eslint-disable */

import ExploreHeader from "../components/ExploreHeader";
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
import data1 from "../components/(userscomponent)/(TransactionTemplateUsers)/data";
import BetIdModalPage from "@/components/(Utils)/BetIdModalPage";
import ExploreHeader3 from "@/components/ExploreHeader3";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import Paginator from "@/components/(Utils)/Paginator2";
import slides from "@/components/(Utils)/slide2";
import AdvertItem from "@/components/(userscomponent)/advertItem";
import slides3 from "@/components/(Utils)/slides3";
import formatNumberWithCommasAndDecimal, {
    formatNumberWithCommasAndDecimal2,
} from "../components/(Utils)/formatNumber";
import CountryCode from "@/components/(Utils)/countrySelector";
import VerifyMobileNumber from "@/components/(Utils)/VerifyMobileNumber";
import NetworkModalPage from "@/components/(Utils)/NetworkModalPage";
import ToastNotification from "@/components/(Utils)/toastNotification";
import { Color } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { withdrawal } from "@/state/userData/getUserData";
import slide4 from "@/components/(Utils)/slide4";
import { CommonActions } from "@react-navigation/native";
import { Language } from "@/constants/languages";

const Currency = "XOF";

// Calculate the percentage value
const percentageHeight = screenHeight * 0.375;
const percentageHeight2 = screenHeight * 1;
const WithdrawFromWallet = (props: any) => {
  const data = useSelector((state: RootState) => state.getUserData.data);
  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
  );
  const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;

  const dispatch = useDispatch<AppDispatch>();
  // EXTRA SETTINGS ........
  // Input fucus and blur setting
  async function setItemOnFocus(index: React.SetStateAction<number>) {
    setIndex(index);
    if (index === 3) {
      setConfirmPhoneNumberError(false);
    }
  }

  function setItemOnBlur() {
    setIndex(0);
  }

  const [amount, setAmount] = useState<any>();
  const [number, setNumber] = useState(data?.number.toString());
  const [confirmNumber, setConfirmNumber] = useState(data?.number.toString());

  //VERIFYING INPUTS
  // Verifying Bet-Id field

  // Verifying Phone-Number field
  // Actual Phone Number Verification
  const [countryFlag, setCountryFlag] = useState("🇧🇯");
  const [countryCode, setCountryCode] = useState("+229");

  function changeCountryCode(value: any) {
    setCountryCode(value);
  }
  function changeCountryFlag(value: any) {
    setCountryFlag(value);
  }

  // Verifying Phone Number field
  const [numberCollector, setNumberCollector] = useState<any>();
  const [numberCollectorCorrect, setNumberCollectorCorrect] =
    useState<any>(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [confirmPhoneNumberError, setConfirmPhoneNumberError] = useState(false);
  const [phoneNumberLoadingSymbol, setPhoneNumberLoadingSymbol] = useState("");
  const [triggerPhoneNumberRevalidation, setTriggerPhoneNumberRevalidation] =
    useState(false);
  const isValidPhoneNumber = /^\d{8}$/.test(number);

  function wrapperSignUpPhoneNumberVerification() {
    setNumberCollector(number);
    if (!triggerPhoneNumberRevalidation) {
      SignUpPhoneNumberVerification();
    }
  }
  const SignUpPhoneNumberVerification = () => {
    if (number === "") {
      return;
    }

    setTimeout(() => {
      if (!isValidPhoneNumber) {
        setPhoneNumberError(true);
        setPhoneNumberLoadingSymbol("");
      } else {
        setPhoneNumberError(false);

        setPhoneNumberLoadingSymbol("false");
        setTriggerPhoneNumberRevalidation(true);
      }
    }, 300);
  };

  // verifying amount
  const [amountError, setAmountError] = useState(false);
  const [amountLoadingSymbol, setAmountLoadingSymbol] = useState("");
  const [triggerAmountRevalidation, setTriggerAmountRevalidation] =
    useState(false);

  const isValidAmount = amount >= 100;
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

  // REVERIFY ALL INPUTS .........

  // Re-verifying phone number field
  const [reoccur, setReOccur] = useState(false);
  const [triggerPhoneNumberRevalidation2, setTriggerPhoneNumberRevalidation2] =
    useState(false);
  if (numberCollector !== number) {
    // if (reoccur) {
    if (triggerPhoneNumberRevalidation) {
      setTimeout(() => {
        if (!isValidPhoneNumber) {
          if (number === "") {
            setPhoneNumberError(false);
          }
          if (number !== "") {
            setPhoneNumberError(true);
          }
          setPhoneNumberLoadingSymbol("");
        } else {
          Keyboard.dismiss();
          setPhoneNumberError(false);

          setIndex(0);

          setReOccur(false);
        }
      }, 300);
    }
    // }
  }

  if (triggerPhoneNumberRevalidation2) {
    setTimeout(() => {
      if (!isValidPhoneNumber) {
        if (number === "") {
          // setPhoneNumberError(false);
        }
        if (number !== "") {
          // setPhoneNumberError(true);
        }
        // setPhoneNumberLoadingSymbol("");
      } else {
        setPhoneNumberError(false);

        setIndex(0);

        setReOccur(false);
      }
    }, 300);
  }

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
    if (phoneNumberLoadingSymbol !== "false") {
      triggerHapticFeedback();
      setPhoneNumberError(true);
      setTriggerPhoneNumberRevalidation2(true);
    }
    if (confirmNumber !== number) {
      triggerHapticFeedback();
      setConfirmPhoneNumberError(true);
    }
    if (amountLoadingSymbol !== "false") {
      triggerHapticFeedback();
      setAmountError(true);
      setTriggerAmountRevalidation2(true);
    }

    if (
      phoneNumberLoadingSymbol !== "false" ||
      amountLoadingSymbol !== "false"
    ) {
      console.log("back");
      setLoading2(false);
      return;
    }

    const formData: any = {
      _id: data._id,
      amount: amount,
      email: data.email,
      momoNumber: data.number,
      bonusBalance: data.bonusBalance,
      service: null,
      withdrawalCode: null,
    };

    dispatch(withdrawal(formData))
      .then(async (result: any) => {
        if (result.payload.success === true || result.payload.success === 209) {
          try {
            triggerHapticFeedback();

            props.navigation.push(
              "withdrawalReceipt",
              result.payload.userTransaction
            );
            setLoading2(false);
          } catch (err) {
            console.log(err);
            setLoading2(false);
          }
        }
        if (result.payload.status === 401) {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: "login"}],
            })
          );
          setLoading2(false);
        }
        if (result.payload.status === 502) {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: "login"}],
            })
          );
          setLoading2(false);
        }

        if (result.payload.status === 402) {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: "login"}],
            })
          );
          setLoading2(false);
        }

        if (result.payload.status === 405) {
          displayNotification3();
          setLoading2(false);
        }

        if (result.payload.status === 506) {
          displayNotification4();
          setLoading2(false);
        }
      })
      .catch((err: any) => console.log(err));
  }

  useEffect(() => {
    wrapperSignUpPhoneNumberVerification();
  }, []);

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
  const [display, setDisplay] = useState(0);
  const text1 = `L'utilisateur n'existe pas`;
  const text2 = `L'utilisateur est désactivé`;
  const text3 = `Actuellement en maintenance`;
  const text4 = `tu n'as pas un solde suffisant`;

  const icon1 = (
    <AntDesign name='checkcircleo' size={40} color={Colors.toastText} />
  );
  const icon2 = (
    <AntDesign name='exclamationcircleo' size={40} color={Colors.toastText} />
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
  function displayNotification4() {
    setShow(4);
    setDisplay(4);
    triggerHapticFeedback();
    setTimeout(() => {
      setShow(0);
    }, 5000);
  }

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
            onPressIn={() => props.navigation.goBack()}
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
            {languageText.text46}
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
              : ""
          }
          textColor='white'
          backgroundColor='red'
          icon={<AntDesign name='exclamationcircleo' size={40} color='white' />}
        />

        <TouchableWithoutFeedback>
          <ScrollView
            scrollEnabled={true}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            style={styles.container3}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: Colors.default3,
                borderColor: Colors.default1,
                borderWidth: 1.3,
                borderRadius: 8,
                // borderBottomColor: Colors.default1,
                // borderBottomWidth: 1.5,
                position: "relative",
                width: "100%",
                gap: 7,
                height: 40,
                paddingHorizontal: 10,
                marginTop: 30,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "90%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color: Colors.welcomeText,
                      opacity: 0.5,
                      alignSelf: "center",
                    }}
                  >
                    {languageText.text208}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",

                backgroundColor: Colors.depositBackground,
                paddingVertical: 15,
                paddingHorizontal: 13,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: 10,
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
                  {languageText.text207}
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

              <TextInput
                value={amount}
                onChangeText={setAmount}
                variant='outlined'
                label={languageText.text205}
                autoCorrect={false}
                placeholderTextColor={Colors.placeHolderTextColor}
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
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: Colors.depositBackground,
                paddingVertical: 15,
                paddingHorizontal: 13,
                borderRadius: 5,
                marginTop: 20,
                position: "relative",
              }}
            >
              <TextInput
                value={number}
                onChangeText={setNumber}
                variant='outlined'
                label={languageText.text203}
                autoCorrect={false}
                placeholderTextColor={Colors.placeHolderTextColor}
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

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: Colors.depositBackground,
                paddingVertical: 15,
                paddingHorizontal: 13,
                borderRadius: 5,
                marginTop: 20,
                position: "relative",
              }}
            >
              <TextInput
                value={confirmNumber}
                onChangeText={setConfirmNumber}
                variant='outlined'
                label={languageText.text204}
                autoCorrect={false}
                placeholderTextColor={Colors.placeHolderTextColor}
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
                marginTop: 80,
                opacity: loading2 ? 0.5 : 1,
                width: "96%",
                alignSelf: "center",
              }}
              onPress={handleSubmit}
              disabled={loading2}
            >
              {loading2 && <ActivityIndicator size='small' color='white' />}
              <Text style={defaultStyles.btnText}>{languageText.text199}</Text>
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
    xxxx: {
        fontWeight: "900",

        fontSize: 28,
    },
    xxxxx: {
        fontWeight: "300",

        fontSize: 16,
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
});

export default WithdrawFromWallet;
