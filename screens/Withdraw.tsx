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
import { requestAddress, withdrawal } from "@/state/userData/getUserData";
import NoticeModalPage from "@/components/(Utils)/noticeModal3";
import { CommonActions } from "@react-navigation/native";
import { Language } from "@/constants/languages";

const Currency = "XOF";

// Calculate the percentage value
const percentageHeight = screenHeight * 0.375;
const percentageHeight2 = screenHeight * 1;
const Withdraw = (props: any, { navigation }: any) => {
    const data = useSelector((state: RootState) => state.getUserData.data);
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);

    const dispatch = useDispatch<AppDispatch>();
    // EXTRA SETTINGS ........
    // Input fucus and blur setting
    async function setItemOnFocus(index: React.SetStateAction<number>) {
        setIndex(index);
        if (index === 3) {
            setConfirmPhoneNumberError(false);
        }
    }

    const [address, setAddress] = useState<any>({})
    useEffect(() => {
    fetchAddress()
    },[])

function fetchAddress() {
    console.log("dbdjdbdbdb");
 dispatch(requestAddress())
   .then(async (result: any) => {
setAddress(result.payload.address);
   })
   .catch((err: any) => console.log(err));
}



    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    function setItemOnBlur() {
        setIndex(0);
    }

    const [betId, setBetId] = useState<any>(data?.supplementaryBetId[0]);
    const [amount, setAmount] = useState<any>();
    const [number, setNumber] = useState(data?.number.toString());
    const [confirmNumber, setConfirmNumber] = useState(data?.number.toString());
    const [fullname, setFullname] = useState(data?.fullname);
    const [betCode, setBetCode] = useState<any>();

    useEffect(() => {
        console.log(betId, amount, number, "data printed");
    }, [betId, amount, number]);

    function runNetworkCheck(value: React.SetStateAction<number | undefined>) {
        Vibration.vibrate(50);
        setCurrentNetwork(value);
    }

    //VERIFYING INPUTS
    // Verifying Bet-Id field
    const [betIdError, setBetIdError] = useState(false);
    const [betIdError1, setBetIdError1] = useState(false);
    const [betIdError2, setBetIdError2] = useState(false);
    const [betIdError3, setBetIdError3] = useState(false);
    const [betIdLoadingSymbol, setBetIdLoadingSymbol] = useState("");
    const [triggerBetIdRevalidation, setTriggerBetIdRevalidation] =
        useState(false);
    const isValidBetId = betId?.length !== 0;
    const isValidBetId1 = betId?.length >= 4;
    const isValidBetId2 = /^\d+$/.test(betId);
    const SignUpBetIdVerification = () => {
        if (betId === "") {
            return;
        }
        if (!triggerBetIdRevalidation) {
            setBetIdError(false);
            setBetIdError1(false);
            setBetIdError2(false);
            setBetIdError3(false);
            setBetIdLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidBetId) {
                    setBetIdError(true);
                    setBetIdLoadingSymbol("");
                    setTriggerBetIdRevalidation(true);
                } else if (!isValidBetId1 && isValidBetId2) {
                    setBetIdError1(true);
                    setBetIdLoadingSymbol("");
                    setTriggerBetIdRevalidation(true);
                } else if (!isValidBetId2 && isValidBetId1) {
                    setBetIdError2(true);
                    setBetIdLoadingSymbol("");
                    setTriggerBetIdRevalidation(true);
                } else if (!isValidBetId1 && !isValidBetId2) {
                    setBetIdError3(true);
                    setBetIdLoadingSymbol("");
                    setTriggerBetIdRevalidation(true);
                } else {
                    setBetIdError(false);
                    setBetIdLoadingSymbol("false");
                    setTriggerBetIdRevalidation(true);
                }
            }, 300);
        }
    };

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

    // Getting the Network
    const numberPrefix = number.substring(0, 2).toString();
    const network = VerifyMobileNumber({ numberPrefix });
    const [network2, setNetwork2] = useState<any>();
    const [currentNetwork, setCurrentNetwork] = useState<any>();

    // Verifying Phone Number field
    const [numberCollector, setNumberCollector] = useState<any>();
    const [numberCollectorCorrect, setNumberCollectorCorrect] =
        useState<any>(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    const [confirmPhoneNumberError, setConfirmPhoneNumberError] =
        useState(false);
    const [phoneNumberLoadingSymbol, setPhoneNumberLoadingSymbol] =
        useState("");
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

    // Verifying fullname field
    const [fullNameError, setFullNameError] = useState(false);
    const [fullnameLoadingSymbol, setFullnameLoadingSymbol] = useState("");
    const [triggerFullNameRevalidation, setTriggerFullNameRevalidation] =
        useState(false);
    const isValidFullname = fullname.length > 1;
    const SignUpFullnameVerification = () => {
        if (fullname === "") {
            return;
        }
        if (!triggerFullNameRevalidation) {
            setFullnameLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidFullname) {
                    setFullNameError(true);
                    setFullnameLoadingSymbol("");
                    setTriggerFullNameRevalidation(true);
                } else {
                    setFullNameError(false);
                    setFullnameLoadingSymbol("false");
                    setTriggerFullNameRevalidation(true);
                }
            }, 300);
        }
    };

    // verifying amount
    const [amountError, setAmountError] = useState(false);
    const [amountLoadingSymbol, setAmountLoadingSymbol] = useState("");
    const [triggerAmountRevalidation, setTriggerAmountRevalidation] =
        useState(false);

    const isValidAmount = amount >= 500;
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

    // Verifying betCode field
    const [betCodeError, setBetCodeError] = useState(false);
    const [betCodeLoadingSymbol, setBetCodeLoadingSymbol] = useState("");
    const [triggerBetCodeRevalidation, setTriggerBetCodeRevalidation] =
        useState(false);
    const isValidBetCode = betCode?.length > 1;
    const SignUpBetCodeVerification = () => {
        if (betCode === "") {
            return;
        }
        if (!triggerBetCodeRevalidation) {
            setBetCodeLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidBetCode) {
                    setBetCodeError(true);
                    setBetCodeLoadingSymbol("");
                    setTriggerBetCodeRevalidation(true);
                } else {
                    setBetCodeError(false);
                    setBetCodeLoadingSymbol("false");
                    setTriggerBetCodeRevalidation(true);
                }
            }, 300);
        }
    };

    // REVERIFY ALL INPUTS .........
    // reverifying betid entry
    const [triggerBetIdRevalidation2, setTriggerBetIdRevalidation2] =
        useState(false);
    if (triggerBetIdRevalidation) {
        setTimeout(() => {
            if (!isValidBetId) {
                setBetIdError1(false);
                setBetIdError2(false);
                setBetIdError3(false);
                if (betId !== "") {
                    setBetIdError(true);
                }
                if (betId === "") {
                    setBetIdError(false);
                }
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId1 && isValidBetId2) {
                setBetIdError1(true);
                setBetIdError(false);
                setBetIdError2(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId2 && isValidBetId1) {
                setBetIdError2(true);
                setBetIdError(false);
                setBetIdError1(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId1 && !isValidBetId2) {
                setBetIdError3(true);
                setBetIdError(false);
                setBetIdError2(false);
                setBetIdError1(false);
                setBetIdLoadingSymbol("");
            } else {
                setBetIdError(false);
                setBetIdError1(false);
                setBetIdError2(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerBetIdRevalidation2) {
        setTimeout(() => {
            if (!isValidBetId) {
                setBetIdError1(false);
                setBetIdError2(false);
                setBetIdError3(false);
                if (betId !== "") {
                    setBetIdError(true);
                }
                if (betId === "") {
                    // setBetIdError(false);
                }
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId1 && isValidBetId2) {
                setBetIdError1(true);
                setBetIdError(false);
                setBetIdError2(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId2 && isValidBetId1) {
                setBetIdError2(true);
                setBetIdError(false);
                setBetIdError1(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("");
            } else if (!isValidBetId1 && !isValidBetId2) {
                setBetIdError3(true);
                setBetIdError(false);
                setBetIdError2(false);
                setBetIdError1(false);
                setBetIdLoadingSymbol("");
            } else {
                setBetIdError(false);
                setBetIdError1(false);
                setBetIdError2(false);
                setBetIdError3(false);
                setBetIdLoadingSymbol("false");
            }
        }, 300);
    }

    // Re-verifying phone number field
    const [reoccur, setReOccur] = useState(false);
    const [
        triggerPhoneNumberRevalidation2,
        setTriggerPhoneNumberRevalidation2,
    ] = useState(false);
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
                    if (network.length === 0) {
                        setPhoneNumberLoadingSymbol("");
                    } else if (network.length === 1) {
                        setPhoneNumberLoadingSymbol("true");
                    } else if (network.length > 2 || network.length === 2) {
                        setPhoneNumberLoadingSymbol("true");
                    }
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
                if (network.length === 0) {
                    // setPhoneNumberLoadingSymbol("");
                } else if (network.length === 1) {
                    // setPhoneNumberLoadingSymbol("true");
                } else if (network.length > 2 || network.length === 2) {
                    // setPhoneNumberLoadingSymbol("true");
                }
                setIndex(0);

                setReOccur(false);
            }
        }, 300);
    }

    // Re-Verifying fullname field
    const [triggerFullNameRevalidation2, setTriggerFullNameRevalidation2] =
        useState(false);
    if (triggerFullNameRevalidation) {
        setTimeout(() => {
            if (!isValidFullname) {
                if (fullname === "") {
                    setFullNameError(false);
                }
                if (fullname !== "") {
                    setFullNameError(true);
                }
                setFullnameLoadingSymbol("");
            } else {
                setFullNameError(false);
                setFullnameLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerFullNameRevalidation2) {
        setTimeout(() => {
            if (!isValidFullname) {
                if (fullname === "") {
                    // setFullNameError(false);
                }
                if (fullname !== "") {
                    setFullNameError(true);
                }
                setFullnameLoadingSymbol("");
            } else {
                setFullNameError(false);
                setFullnameLoadingSymbol("false");
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

    // Re-Verifying betCode field
    const [triggerBetCodeRevalidation2, setTriggerBetCodeRevalidation2] =
        useState(false);
    if (triggerBetCodeRevalidation) {
        setTimeout(() => {
            if (!isValidBetCode) {
                if (betCode === "") {
                    setBetCodeError(false);
                }
                if (betCode !== "") {
                    setBetCodeError(true);
                }
                setBetCodeLoadingSymbol("");
            } else {
                setBetCodeError(false);
                setBetCodeLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerBetCodeRevalidation2) {
        setTimeout(() => {
            if (!isValidBetCode) {
                if (betCode === "") {
                    // setFullNameError(false);
                }
                if (betCode !== "") {
                    setBetCodeError(true);
                }
                setBetCodeLoadingSymbol("");
            } else {
                setBetCodeError(false);
                setBetCodeLoadingSymbol("false");
            }
        }, 300);
    }

    const [loading2, setLoading2] = useState(false);

    function handleSubmit() {
           if (loading2) return;
        setLoading2(true);

        if (betIdLoadingSymbol !== "false") {
            triggerHapticFeedback();
            setBetIdError(true);
            setTriggerBetIdRevalidation2(true);
        }
        if (phoneNumberLoadingSymbol !== "false") {
            triggerHapticFeedback();
            setPhoneNumberError(true);
            setTriggerPhoneNumberRevalidation2(true);
        }
        if (confirmNumber !== number) {
            triggerHapticFeedback();

            setConfirmPhoneNumberError(true);
        }
        // if (amountLoadingSymbol !== "false") {
        //     triggerHapticFeedback();
        //     setAmountError(true);
        //     setTriggerAmountRevalidation2(true);
        // }
        if (betCodeLoadingSymbol !== "false") {
            triggerHapticFeedback();
            setBetCodeError(true);
            setTriggerBetCodeRevalidation2(true);
        }

        if (
            betIdLoadingSymbol !== "false" ||
            phoneNumberLoadingSymbol !== "false" ||
            betCodeLoadingSymbol !== "false"
        ) {
            setLoading2(false);
            return;
        }

        const formData: any = {
            _id: data._id,
            betId: betId,
            momoNumber: number,
            amount: amount,
            email: data.email,
            withdrawalCode: betCode,
            service: "1xbet",
        };

        dispatch(withdrawal(formData))
            .then(async (result: any) => {
               if (
                   result.payload.success === true ||
                   result.payload.success === 209
               ) {
                   try {
                       triggerHapticFeedback();
                       console.log(result.payload.userTransaction, "kkkk");
                       props.navigation.push(
                           "withdrawalReceipt",
                           result.payload.userTransaction,
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
                            routes: [{ name: "login" }],
                        }),
                    );
                }
                if (result.payload.status === 502) {
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "login" }],
                        }),
                    );
                    setLoading2(false);
                }

                if (
                    result.payload.status === 405 
                ) {
                    displayNotification()
                    setLoading2(false);
                }
                  if (
                      result.payload.status === 402
                  ) {
                      props.navigation.dispatch(
                          CommonActions.reset({
                              index: 0,
                              routes: [{ name: "login" }],
                          }),
                      );
                      setLoading2(false);
                  }
            })
            .catch((err: any) => console.log(err));
    }

    ///For BetId Modal Operations
    const [betIdModal, setBetIdModal] = useState<boolean>(false);
    function openBetIdModal() {
        setBetIdModal(true);
    }

    function closeBetIdModal() {
        setBetIdModal(false);
    }

    function chooseBetId(value: any) {
        console.log(value);
        const value2 = value.toString();
        setBetId(value2);
        setBetIdModal(false);
    }

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
    };

    useEffect(() => {
        SignUpBetIdVerification();
        wrapperSignUpPhoneNumberVerification();
    }, []);

    //FOR TOAstNotification
    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(0);
    const text1 = `Actuellement en maintenance`;
    const text2 = `Impossible de lancer la transaction`;

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

    const triggerHapticFeedback = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const [openNotice, setOpenNotice] = useState(false);
    // useEffect(() => {
    //     setOpenNotice(true);
    // }, []);
    function closeNotice() {
        setOpenNotice(false);
    }

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
            text={display === 1 ? text1 : display === 2 ? text2 : ""}
            textColor='white'
            backgroundColor='red'
            icon={
              <AntDesign name='exclamationcircleo' size={40} color='white' />
            }
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
                  justifyContent: "space-between",
                  backgroundColor: Colors.default3,
                  borderColor: Colors.default1,
                  borderWidth: 1.3,
                  borderRadius: 8,
                  // borderBottomColor: Colors.default1,
                  // borderBottomWidth: 1.5,
                  position: "relative",
                  width: "100%",
                  gap: 7,
                  height: 100,
                  paddingHorizontal: 10,
                  marginTop: 30,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",

                    height: "100%",
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
                        fontSize: 18,
                        fontWeight: "800",
                        color: Colors.welcomeText,
                        opacity: 0.98,
                      }}
                    >
                      -- {languageText.text201} --
                    </Text>
                  </View>
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
                        fontSize: 14,
                        fontWeight: "400",
                        color: Colors.welcomeText,
                        opacity: 0.98,
                      }}
                    >
                      {languageText.text200}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 20,
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
                        }}
                      >
                        {languageText.text355}:
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "800",
                          color: Colors.default1,
                          opacity: 0.98,
                        }}
                      >
                        {address?.street}
                      </Text>
                    </View>
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
                        }}
                      >
                        {languageText.text356}:
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "800",
                          color: Colors.default1,
                          opacity: 0.98,
                        }}
                      >
                        {address?.city}
                      </Text>
                    </View>
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
                <TextInput
                  value={betId}
                  onChangeText={setBetId}
                  variant='outlined'
                  label={languageText.text78}
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
                  borderRadius: 5,
                  marginTop: 20,
                  position: "relative",
                  paddingVertical: 15,
                  paddingHorizontal: 13,
                }}
              >
                <TextInput
                  value={betCode}
                  onChangeText={setBetCode}
                  variant='outlined'
                  label={languageText.text202}
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
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  backgroundColor: Colors.depositBackground,
                  borderRadius: 5,
                  marginTop: 20,
                  position: "relative",
                  paddingVertical: 15,
                  paddingHorizontal: 13,
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
                      width: "45%",
                      height: 64,
                    },
                  ]}
                  selectionColor={Colors.default1}
                  onEndEditing={SignUpAmountVerification}
                  keyboardType='number-pad'
                />
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
                      width: "45%",
                      height: 64,
                    },
                  ]}
                  selectionColor={Colors.default1}
                  onEndEditing={SignUpAmountVerification}
                  keyboardType='number-pad'
                />
              </View>

              {/* <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                backgroundColor: Colors.depositBackground,

                                borderRadius: 5,
                                marginTop: 20,
                                position: "relative",
                                paddingVertical: 15,
                                paddingHorizontal: 13,
                            }}
                        ></View> */}

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
                <Text style={defaultStyles.btnText}>
                  {languageText.text199}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
        {betIdModal ? (
          <BetIdModalPage
            closeBetIdModal={closeBetIdModal}
            chooseBetId={chooseBetId}
          />
        ) : null}
        {openNotice && <NoticeModalPage closeNotice={closeNotice} />}
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

export default Withdraw;
