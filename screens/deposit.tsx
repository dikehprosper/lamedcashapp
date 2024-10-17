/* eslint-disable */

import ExploreHeader from "../components/ExploreHeader";
import React, { useState, useEffect, useRef, useContext } from "react";
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
    Platform,
    Button,
    Alert,
    SafeAreaView,
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
    formatNumber,
    formatNumberWithCommasAndDecimal2,
} from "../components/(Utils)/formatNumber";
import CountryCode from "@/components/(Utils)/countrySelector";
import VerifyMobileNumber from "@/components/(Utils)/VerifyMobileNumber";
import NetworkModalPage from "@/components/(Utils)/NetworkModalPage";
import ToastNotification from "@/components/(Utils)/toastNotification";
import { Color } from "@/constants/Colors";
import NoticeModalPage from "@/components/(Utils)/noticeModal";
import NoticeModalPage4 from "@/components/(Utils)/noticeModal4";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { deposit } from "@/state/userData/getUserData";
import Allnetwork from "../components/(Utils)/network";
// import Feexpay from "@feexpay/react-sdk";
// import styled from "styled-components/native";
// import { WebView } from "react-native-webview";
// import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import LoadingComponent from "@/components/loadingComponentForDeposit";
import { CommonActions } from "@react-navigation/native";
import modalContext from "@/components/modalContext";
import ModalContext from "@/components/modalContext";
import { Language } from "@/constants/languages";
const Currency = "XOF";
interface formData {
    betId: string;
    amount: number;
    email: string;
    momoNumber: number;
    network: string;
    service: string;
    bonusBalance: number;
}

// Calculate the percentage value
const percentageHeight = screenHeight * 0.375;
const percentageHeight2 = screenHeight * 1;
const Deposit = (props: any, { navigation, title }: any) => {
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error("HomeScreen must be used within a ModalProvider");
    }
    const { showModal, hideModal } = modalContext;

    const data = useSelector((state: RootState) => state.getUserData.data);
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
  
    const dispatch = useDispatch<AppDispatch>();
    const [betId, setBetId] = useState<any>(data.betId);
    const [amount, setAmount] = useState<any>();
    const [number, setNumber] = useState<any>(`${data.number}`);

    const [loading] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        SignUpPhoneNumberVerification();
        SignUpBetIdVerification();
    }, []);

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

    // verifying amount
    const [amountError, setAmountError] = useState(false);
    const [amountLoadingSymbol, setAmountLoadingSymbol] = useState("");
    const [triggerAmountRevalidation, setTriggerAmountRevalidation] =
        useState(false);
    console.log(typeof amount);
    const isValidAmount = amount >= 100;

    const SignUpAmountVerification = () => {
        if (amount === "") {
            return;
        }
        if (!triggerAmountRevalidation) {
            setTimeout(() => {
                if (!isValidAmount) {
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
    const [phoneNumberLoadingSymbol, setPhoneNumberLoadingSymbol] =
        useState("");
    const [triggerPhoneNumberRevalidation, setTriggerPhoneNumberRevalidation] =
        useState(false);
    const isValidPhoneNumber = /^\d{8}$/.test(number);
    console.log(isValidPhoneNumber, "uuerer");
    const SignUpPhoneNumberVerification = () => {
        if (!isValidPhoneNumber) {
            setPhoneNumberError(true);
            setPhoneNumberLoadingSymbol("");
        } else {
            setPhoneNumberError(false);
            setPhoneNumberLoadingSymbol("false");
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

    //reverifying amount entry
    const [triggerAmountRevalidation2, setTriggerAmountRevalidation2] =
        useState(false);

    if (triggerAmountRevalidation) {
        setTimeout(() => {
            if (!isValidAmount) {
                console.log("doneeee1");
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

                    setIndex(0);
                    // openNetworkModal();
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
                    setPhoneNumberError(true);
                }
                setPhoneNumberLoadingSymbol("");
            } else {
                setPhoneNumberError(false);

                setIndex(0);
                // openNetworkModal();
                setReOccur(false);
            }
        }, 300);
    }

    const [choosenNetwork, setChoosenNetwork] = useState("");
    const [errorNetwork, setNetworkError] = useState(false);
    function handlePress(index: number) {
        setNetworkError(false);
        if (index === 0) {
            setChoosenNetwork("mtn");
        } else if (index === 1) {
            setChoosenNetwork("moov");
        }
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

    //animation adverts
    // const scrollX = useRef(new Animated.Value(0)).current;
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const viewableItemsChanged = useRef(({viewableItems}: any) => {
    //   setCurrentIndex(viewableItems[0].index);
    // }).current;
    // const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
    // const slidesRef = useRef<any>(null);
    // const {width} = useWindowDimensions();
    // const scrollTo = () => {
    //   if (currentIndex < slides.length - 1) {
    //     slidesRef?.current?.scrollToIndex({index: currentIndex + 1});
    //   } else if (currentIndex === slides.length - 1) {
    //     slidesRef?.current?.scrollToIndex({index: 0});
    //   } else {
    //     console.log("Last item.");
    //   }
    // };

    // useEffect(() => {
    //   setTimeout(() => {
    //     scrollTo();
    //   }, 4000);
    // }, [scrollTo]);

    // Auto-Verifying inputs on first load
    // useEffect(() => {
    //     SignUpBetIdVerification();
    //     wrapperSignUpPhoneNumberVerification();
    // }, []);

    //FOR TOAstNotification
    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(0);
    const text1 = `L'utilisateur n'existe pas`;
    const text2 = `L'utilisateur est désactivé`;
    const text3 = `Actuellement en maintenance`;
    const text4 = `Impossible de lancer la transaction`;
    const text5 = `Entrées invalides`;
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

    const [isEnabled, setIsEnabled] = useState(false);
    const [openNotice, setOpenNotice] = useState(false);
    const [openNotice4, setOpenNotice4] = useState(false);
    const [details, setDetails] = useState<any>({});

    const toggleSwitch = () => {
        if (!isEnabled) {
            showModal(
                <NoticeModalPage
                    // closeNotice={closeNotice}
                    closeNotice={hideModal}
                />,
            );
        }
        setIsEnabled((previousState) => !previousState);
    };
    function closeNotice() {
        setOpenNotice(false);
    }
    function closeNotice4() {
        setOpenNotice4(false);
    }

    const [isLoading, setIsLoading] = useState(false);
    
    function handleSubmit() {
       
         if (isLoading) return;
         setIsLoading(true);
        if (betIdLoadingSymbol !== "false") {
            console.log(0);
            triggerHapticFeedback();

            setBetIdError(true);
            setTriggerBetIdRevalidation2(true);
        }
        if (phoneNumberLoadingSymbol !== "false") {
            console.log(1);
            triggerHapticFeedback();
            setPhoneNumberError(true);
            // setTriggerPhoneNumberRevalidation2(true);
        }
        if (amountLoadingSymbol !== "false") {
            console.log(2);
            triggerHapticFeedback();
            setAmountError(true);
            setTriggerAmountRevalidation2(true);
        }
        if (choosenNetwork === "") {
            console.log(3);
            triggerHapticFeedback();
            setNetworkError(true);
        }

        if (
            betIdLoadingSymbol !== "false" ||
            phoneNumberLoadingSymbol !== "false" ||
            amountLoadingSymbol !== "false" ||
            choosenNetwork === ""
        ) {
            console.log(4);
            setIsLoading(false);
            return;
        }

        const formData: formData = {
            betId: betId,
            amount: amount,
            email: data.email,
            momoNumber: number,
            network: choosenNetwork,
            service: "1xbet",
            bonusBalance: isEnabled ? data.bonusBalance : null,
        };
        dispatch(deposit(formData))
            .then(async (result) => {
                console.log(result.payload.status, "hjvhuvhjvuhv");
                if (
                    result.payload.success === true ||
                    result.payload.success === 209
                ) {
                    console.log(result.payload.newUserBonus, "deposit done");

                    console.log(result.payload.userTransaction, "deposit done");
                    if (
                        result.payload.userTransaction.customErrorCode === 300
                    ) {
                        triggerHapticFeedback();
                        setOpenNotice4(true);
                        showModal(
                            <NoticeModalPage4
                                closeNotice={hideModal}
                                customErrorCode={
                                    result.payload.userTransaction
                                        .customErrorCode
                                }
                                totalAmount={
                                    result.payload.userTransaction.totalAmount
                                }
                                id={result.payload.userTransaction.betId}
                            />,
                        );
                        setIsLoading(false);
                    } else {
                        triggerHapticFeedback();
                        console.log(
                            result.payload.userTransaction,
                            "hdgvhjvdchd",
                        );
                        props.navigation.push(
                            "depositReceipt",
                            result.payload.userTransaction,
                        );
                        setIsLoading(false);
                    }
                }
                if (result.payload.status === 401) {
                    displayNotification();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "login" }],
                        }),
                    );
                    setIsLoading(false);
                }
                if (result.payload.status === 502) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "login" }],
                        }),
                    );
                    setIsLoading(false);
                }
                if (result.payload.success === 508) {
                    setOpenNotice4(true);
                    setIsLoading(false);
                    console.log("done 2");
                    showModal(
                        <NoticeModalPage4
                            closeNotice={hideModal}
                            customErrorCode={
                                result.payload.userTransaction.customErrorCode
                            }
                            totalAmount={
                                result.payload.userTransaction.totalAmount
                            }
                            id={result.payload.userTransaction.betId}
                        />
                    );
                }
                if (result.payload.status === 502) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "login" }],
                        }),
                    );
                    setIsLoading(false);
                }
                if (
                    result.payload.status === 503 ||
                    result.payload.status === 504
                ) {
                    displayNotification3();
                    setIsLoading(false);
                }
                if (
                    result.payload.status === 505 ||
                    result.payload.status === 505
                ) {
                    displayNotification4();
                    setIsLoading(false);
                }
                if (result.payload.status === 400) {
                    displayNotification5();
                    setIsLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }
    const label =
        Platform.OS === "ios" ? languageText.text194 : languageText.text221;
    const label2 =
        Platform.OS === "ios" ? languageText.text195 : languageText.text222;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          position: "relative",
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
              {languageText.text45}
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

          <TouchableWithoutFeedback>
            <View style={{flex: 1}}>
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
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    marginTop: 5,
                    alignItems: "center",
                    marginBottom: 3,
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
                        fontWeight: "600",
                        color: Colors.welcomeText,
                        opacity: 0.98,
                        marginBottom: 5,
                      }}
                    >
                      -- IMPORTANT --
                    </Text>
                  </View>
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
                          textAlign: "center",
                        }}
                      >
                        {languageText.text228}
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
                  <TextInput
                    // ref={inputRef}
                    variant='outlined'
                    label={languageText.text78}
                    value={betId}
                    onChangeText={setBetId}
                    autoCorrect={false}
                    placeholderTextColor={Colors.welcomeText}
                    color={Colors.welcomeText}
                    inputStyle={{
                      color: Colors.welcomeText,
                      backgroundColor: Colors.inputBackground,
                    }}
                    autoCapitalize='none'
                    style={[
                      {
                        width: "100%",
                        height: 64,
                      },
                    ]}
                    selectionColor={Colors.welcomeText}
                    onEndEditing={SignUpBetIdVerification}
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
                  }}
                >
                  <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    variant='outlined'
                    label={label}
                    autoCorrect={false}
                    placeholderTextColor={Colors.welcomeText}
                    autoCapitalize='none'
                    color={Colors.welcomeText}
                    style={[
                      {
                        width: "100%",
                        height: 64,
                      },
                    ]}
                    selectionColor={Colors.welcomeText}
                    inputStyle={{
                      color: Colors.welcomeText,
                      backgroundColor: Colors.inputBackground,
                    }}
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
                    label={label2}
                    autoCorrect={false}
                    placeholderTextColor={Colors.welcomeText}
                    autoCapitalize='none'
                    color={Colors.welcomeText}
                    style={{
                      width: "100%",
                      height: 64,
                    }}
                    inputStyle={{
                      color: Colors.welcomeText,
                      backgroundColor: Colors.inputBackground,
                    }}
                    selectionColor={Colors.welcomeText}
                    onEndEditing={SignUpPhoneNumberVerification}
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
                    paddingVertical: 18,
                    paddingHorizontal: 18,
                    paddingTop: 32,
                    borderRadius: 5,
                    marginTop: 20,
                    position: "relative",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 18,
                      backgroundColor: "transparent",
                      borderRadius: 8,

                      position: "relative",
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: -34,
                        right: 2,
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "500",
                          color: Colors.welcomeText,
                          opacity: 0.5,
                        }}
                      >
                        Réseau
                      </Text>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: -29,
                        right: 2,
                      }}
                    >
                      {errorNetwork && (
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 12,
                            color: "red",
                          }}
                        >
                          * Please enter a valid network
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        gap: 40,
                        marginTop: 10,
                        justifyContent: "space-evenly",
                      }}
                    >
                      {Allnetwork.map((network, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              paddingVertical: 7,
                              paddingHorizontal: 12,
                              borderRadius: 7,
                              borderColor:
                                choosenNetwork === network.network
                                  ? Colors.default1
                                  : "transparent",
                              borderWidth: 2,

                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row",
                              gap: 10,
                            }}
                            onPress={() => handlePress(index)}
                          >
                            {network.network === "mtn" ? (
                              <View
                                style={{
                                  height: 35,
                                  width: 35,
                                  borderRadius: 40,
                                }}
                              >
                                <Image
                                  source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/MTN-Mobile-Money-Senegal-Logo-1-550x298.webp?alt=media&token=6c70d498-35e3-4054-a2fd-e42a3138f3fb",
                                  }}
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: 40,
                                  }}
                                />
                              </View>
                            ) : (
                              <View
                                style={{
                                  height: 35,
                                  width: 35,
                                  borderRadius: 40,
                                }}
                              >
                                <Image
                                  source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/groupchat-d6de7.appspot.com/o/Moov_Africa_logo.png?alt=media&token=281df10d-fe29-4eeb-83ef-bcb1f3ee2121",
                                  }}
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: 40,
                                  }}
                                />
                              </View>
                            )}

                            <Text
                              style={{
                                color: Colors.welcomeText,
                                fontSize: 18,
                                fontWeight: "500",
                                marginRight: 10,
                              }}
                            >
                              {network.network === "mtn" ? "Mtn" : "Moov"}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
                {data.bonusBalance > 10 && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 12,
                      paddingHorizontal: 10,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: Colors.welcomeText,
                          opacity: 0.8,
                          fontWeight: "400",
                        }}
                      >
                        Prime({Currency}
                        {formatNumberWithCommasAndDecimal(data.bonusBalance)})
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          color: Colors.welcomeText,
                          opacity: isEnabled ? 1 : 0.7,
                          fontWeight: "500",
                        }}
                      >
                        - {Currency}
                        {formatNumberWithCommasAndDecimal(data.bonusBalance)}
                      </Text>
                      <View style={styles.switchContainer}>
                        <Switch
                          trackColor={{
                            false: "#767577",
                            true: Colors.default3,
                          }}
                          thumbColor={isEnabled ? Colors.default1 : "#f4f3f4"}
                          ios_backgroundColor='#3e3e3e'
                          onValueChange={toggleSwitch}
                          value={isEnabled}
                        />
                      </View>
                    </View>
                  </View>
                )}
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

                    opacity: isLoading ? 0.5 : 1,
                  }}
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <ActivityIndicator size='small' color='white' />
                  )}
                  <Text style={defaultStyles.btnText}>
                    {languageText.text199}
                  </Text>
                </TouchableOpacity>
                {isLoading && <LoadingComponent />}

                <TouchableOpacity
                  style={{
                    // backgroundColor: "white",
                    // height: 50,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    marginBottom: 110,
                    opacity: isLoading ? 0.5 : 1,
                    // borderColor: Colors.default1,
                    // borderWidth: 1.3,
                    marginTop: 18,
                  }}
                  onPress={() => props.navigation.push("shareDeposit")}
                >
                  <Text
                    style={[
                      defaultStyles.btnText,
                      {
                        color: Colors.welcomeText,
                        marginLeft: 2,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        textDecorationLine: "underline",
                      }}
                    >
                      {languageText.text198}
                    </Text>
                    <MaterialCommunityIcons name='share' size={20} />
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {betIdModal ? (
          <BetIdModalPage
            betId={betId}
            closeBetIdModal={closeBetIdModal}
            chooseBetId={chooseBetId}
          />
        ) : null}
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 8,
        height: percentageHeight,
        position: "relative",
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
        // color: Colors.welcomeText,
        fontSize: 28,
    },
    xxxxx: {
        fontWeight: "300",
        // color: Colors.welcomeText,
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
    container4: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default Deposit;

{
    /* <View style={styles.container2}>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: Colors.background,
                }}
              >
                <FlatList
                  renderItem={({item}) => <AdvertItem item={item} />}
                  data={slides}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={true}
                  bounces={false}
                  keyExtractor={(item) => item.id}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                  )}
                  scrollEventThrottle={32}
                  onViewableItemsChanged={viewableItemsChanged}
                  viewabilityConfig={viewConfig}
                  ref={slidesRef}
                />
              </View>
              <Paginator data={slides} scrollX={scrollX} />
            </View> */
}
