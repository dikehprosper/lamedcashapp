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
} from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { TextInput } from "@react-native-material/core";
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
import slide4 from "@/components/(Utils)/slide4";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { deposit, walletdeposit } from "@/state/userData/getUserData";
import Allnetwork from "../components/(Utils)/network";
import LoadingComponent from "@/components/loadingComponentForDeposit";
import { CommonActions } from "@react-navigation/native";
import NoticeModalPage4 from "@/components/(Utils)/noticeModal4";
import { Language } from "@/constants/languages";
import ModalContext from "@/components/modalContext";

const Currency = "XOF";

interface formData {
    betId: string;
    amount: number;
    email: string;
    momoNumber: number;
    service: string;
    bonusBalance: number;
}

// Calculate the percentage value
const percentageHeight = screenHeight * 0.375;
const percentageHeight2 = screenHeight * 1;
const DepositFromWallet = (props: any) => {
  const data = useSelector((state: RootState) => state.getUserData.data);
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

  const isLoading = useSelector(
    (state: RootState) => state.getUserData.isLoading
  );
  const dispatch = useDispatch<AppDispatch>();

  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("HomeScreen must be used within a ModalProvider");
  }
  const {showModal, hideModal} = modalContext;

  const [loading] = useState(false);
  const [index, setIndex] = useState(0);
  const [openNotice4, setOpenNotice4] = useState(false);
  const [details, setDetails] = useState<any>({});

  function closeNotice4() {
    setOpenNotice4(false);
  }
  // EXTRA SETTINGS ........
  // Input fucus and blur setting
  async function setItemOnFocus(index: React.SetStateAction<number>) {
    setIndex(index);
  }

  function setItemOnBlur() {
    setIndex(0);
  }

  const [betId, setBetId] = useState<any>(data?.supplementaryBetId[0]);

  const [amount, setAmount] = useState<any>();
  const [number, setNumber] = useState(data?.number.toString());

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

  // verifying amount
  const [amountError, setAmountError] = useState(false);
  const [amountError2, setAmountError2] = useState(false);
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

  // Getting the Network
  const numberPrefix = number.substring(0, 2).toString();
  const network = VerifyMobileNumber({numberPrefix});
  const [network2, setNetwork2] = useState<any>();
  const [currentNetwork, setCurrentNetwork] = useState<any>();
  const [networkModal, setNetworkModal] = useState<string>("");
  function openNetworkModal() {
    if (network.length === 0) {
      triggerHapticFeedback();
      setNetworkModal("first");
    } else if (network.length === 1) {
      triggerHapticFeedback();
      setNetworkModal("second");
    } else if (network.length > 2 || network.length === 2) {
      triggerHapticFeedback();
      setNetworkModal("third");
    }
  }

  // Verifying Phone Number field
  const [numberCollector, setNumberCollector] = useState<any>();
  const [numberCollectorCorrect, setNumberCollectorCorrect] =
    useState<any>(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
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
        setCurrentNetwork(network);
        setPhoneNumberLoadingSymbol("false");
        setTriggerPhoneNumberRevalidation(true);
      }
    }, 300);
  };

  function closeNetworkModal() {
    setIndex(0);
    setNetworkModal("");
    setPhoneNumberLoadingSymbol("");
  }

  function closeNetworkModal2() {
    setIndex(0);
    setNetworkModal("");
    setPhoneNumberLoadingSymbol("false");
  }

  function changeNetworkModal() {
    closeNetworkModal();
    // setNetworkModal(false);
  }
  function proceedWithNetworkModal() {
    setIndex(0);
    setNetworkModal("");
    setPhoneNumberLoadingSymbol("false");
  }
  function proceedWithNetworkModal2(value: any) {
    setIndex(0);
    setNetworkModal("");
    setPhoneNumberLoadingSymbol("false");
    setNetwork2(value);
  }

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
          if (network.length === 0) {
            setPhoneNumberLoadingSymbol("");
          } else if (network.length === 1) {
            setPhoneNumberLoadingSymbol("true");
          } else if (network.length > 2 || network.length === 2) {
            setPhoneNumberLoadingSymbol("true");
          }
          setIndex(0);
          // openNetworkModal();
          setReOccur(false);
        }
      }, 300);
    }
    // }
  }

  useEffect(() => {
    if (numberCollector === number) {
      SignUpPhoneNumberVerification();
    }
    const network = VerifyMobileNumber({numberPrefix});
    setNetwork2(network);
  }, [number]);

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
        if (network.length === 0) {
          setPhoneNumberLoadingSymbol("");
        } else if (network.length === 1) {
          setPhoneNumberLoadingSymbol("true");
        } else if (network.length > 2 || network.length === 2) {
          setPhoneNumberLoadingSymbol("true");
        }
        setIndex(0);
        // openNetworkModal();
        setReOccur(false);
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
    if (amountLoadingSymbol !== "false") {
      triggerHapticFeedback();
      setAmountError(true);
      setTriggerAmountRevalidation2(true);
    }
    if (choosenNetwork === "") {
      triggerHapticFeedback();
      setNetworkError(true);
    }

    if (betIdLoadingSymbol !== "false" || amountLoadingSymbol !== "false") {
      setLoading2(false);
      return;
    }

    const formData: formData = {
      betId: betId,
      amount: amount,
      email: data.email,
      momoNumber: data.number,
      service: "1xbet",
      bonusBalance: data.bonusBalance,
    };
    dispatch(walletdeposit(formData))
      .then(async (result) => {
        if (result.payload.success === true || result.payload.success === 209) {
          if (result.payload.userTransaction.customErrorCode === 300) {
            triggerHapticFeedback();

            console.log("rrrr");
            showModal(
              <NoticeModalPage4
                closeNotice={hideModal}
                customErrorCode={result.payload.userTransaction.customErrorCode}
                totalAmount={result.payload.userTransaction.totalAmount}
                id={result.payload.userTransaction.betId}
              />
            );
            setLoading2(false);
          } else {
            triggerHapticFeedback();
            props.navigation.push(
              "depositReceipt",
              result.payload.userTransaction
            );
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

        if (result.payload.status === 503 || result.payload.status === 504) {
          displayNotification3();
          setLoading2(false);
        }

        if (result.payload.status === 506) {
          displayNotification6();
          setLoading2(false);
        }
      })
      .catch((err) => {
        setLoading2(false);
        return console.log(err);
      });
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
  useEffect(() => {
    SignUpBetIdVerification();
    wrapperSignUpPhoneNumberVerification();
  }, []);

  //FOR TOAstNotification
  const [show, setShow] = useState(0);
  const [display, setDisplay] = useState(0);
  const text1 = `L'utilisateur n'existe pas`;
  const text2 = `L'utilisateur est désactivé`;
  const text3 = `Actuellement en maintenance`;
  const text4 = `Impossible de lancer la transaction`;
  const text5 = `Montant invalide`;
  const text6 = `tu n'as pas un solde suffisant`;

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

  function displayNotification6() {
    setShow(6);
    setDisplay(6);
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
  const toggleSwitch = () => {
    if (!isEnabled) {
      setOpenNotice(true);
    }
    setIsEnabled((previousState) => !previousState);
  };
  function closeNotice() {
    setOpenNotice(false);
  }

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
            {languageText.text209}
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
              : display === 5
              ? text5
              : text6
          }
          textColor='white'
          backgroundColor='red'
          icon={<AntDesign name='exclamationcircleo' size={40} color='white' />}
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
                  padding: 18,
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

              {/* <View
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
                                                fontWeight: "700",
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
                                                * Veuillez entrer un réseau
                                                valide
                                            </Text>
                                        )}
                                    </View>

                                    <View
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            flexDirection: "row",
                                            justifyContent: "space-evenly",
                                            gap: 20,
                                            marginTop: 10,
                                        }}
                                    >
                                        {Allnetwork.map((network, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={{
                                                        paddingVertical: 7,
                                                        paddingHorizontal: 15,
                                                        borderColor:
                                                            choosenNetwork ===
                                                            network.network
                                                                ? Colors.default1
                                                                : "transparent",
                                                        borderWidth: 2,

                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",

                                                        flexDirection: "row",
                                                        gap: 10,
                                                        borderRadius: 7,
                                                    }}
                                                    onPress={() =>
                                                        handlePress(index)
                                                    }
                                                >
                                                    {network.network ===
                                                    "mtn" ? (
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
                                                                    objectFit:
                                                                        "cover",
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
                                                                    objectFit:
                                                                        "cover",
                                                                    borderRadius: 40,
                                                                }}
                                                            />
                                                        </View>
                                                    )}
                                                    <Text
                                                        style={{
                                                            color: Colors.welcomeText,
                                                            fontSize: 15,
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {network.network ===
                                                        "mtn"
                                                            ? "Mtn"
                                                            : "Moov"}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View> */}

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
                  marginTop: 50,
                  marginBottom: 27,
                  opacity: loading2 ? 0.5 : 1,
                }}
                onPress={() => handleSubmit()}
                disabled={loading2}
              >
                {loading2 && <ActivityIndicator size='small' color='white' />}
                <Text style={defaultStyles.btnText}>
                  {languageText.text199}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {loading2 && <LoadingComponent />}
      {betIdModal ? (
        <BetIdModalPage
          betId={betId}
          closeBetIdModal={closeBetIdModal}
          chooseBetId={chooseBetId}
        />
      ) : null}
      {networkModal === "" ? null : (
        <NetworkModalPage
          changeNetworkModal={changeNetworkModal}
          networkModal={networkModal}
          network={network}
          runNetworkCheck={runNetworkCheck}
          currentNetwork={currentNetwork}
          closeNetworkModal={closeNetworkModal}
          closeNetworkModal2={closeNetworkModal2}
          proceedWithNetworkModal={proceedWithNetworkModal}
          proceedWithNetworkModal2={proceedWithNetworkModal2}
        />
      )}
      {openNotice && <NoticeModalPage closeNotice={closeNotice} />}
      {openNotice4 && (
        <NoticeModalPage4 closeNotice={closeNotice4} details={details} />
      )}
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
});

export default DepositFromWallet;
