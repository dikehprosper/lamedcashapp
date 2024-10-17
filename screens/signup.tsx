/* eslint-disable */

import React, {useState, useEffect, useRef} from "react";
import {
  Vibration,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Keyboard,
  Platform,
  StatusBar,
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
import {colorScheme} from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {signUpUser} from "@/state/userData/getUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExploreHeader8 from "@/components/ExploreHeader8";
import { Language } from "@/constants/languages";
import { lang } from "moment";

// Calculate the percentage value
interface FormData {
    fullname: string;
    email: string;
    betId: string;
    number: number;
    password: string;
    referId: string;
}
const Signup = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);

    const [iconVisibility, setIconVisibility] = useState(false);
    const [validationMessage, SetValidationMessage] = useState("");
    const [index, setIndex] = useState(0);

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    // All inputs data initial state
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [betId, setBetId] = useState("");
    const [number, setNumber] = useState<any>("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [referId, setReferId] = useState("");
  

  

    // SETTING MARGIN BOTTOM WHEN KEYBOARD IS BEING DISPLAYED
    // EXTRA SETTINGS ........
    // Input fucus and blur setting
    async function setItemOnFocus(index: React.SetStateAction<number>) {
        setReOccur(true);
        setIndex(index);
    }

    function setItemOnBlur() {
        setIndex(0);
        // if (betId === "") {
        //   setBetIdError(false);
        // }
    }

    // Password visibility settingr
    function changePasswordVisibility() {
        setIconVisibility((prev) => {
            return !prev;
        });
    }

    // VERIFYINGING ALL INPUTS ......
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

    // Verifying email field
    const [emailError, setEmailError] = useState(false);
    const [emailLoadingSymbol, setEmailLoadingSymbol] = useState("");
    const [triggerEmailRevalidation, setTriggerEmailRevalidation] =
        useState(false);
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    const SignUpEmailVerification = () => {
        if (email === "") {
            return;
        }
        if (!triggerEmailRevalidation) {
            setEmailLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidEmail) {
                    setEmailError(true);
                    setEmailLoadingSymbol("");
                    setTriggerEmailRevalidation(true);
                } else {
                    setEmailError(false);
                    setEmailLoadingSymbol("false");
                    setTriggerEmailRevalidation(true);
                }
            }, 300);
        }
    };

    // Verifying Bet-Id field
    const [betIdError, setBetIdError] = useState(false);
    const [betIdError1, setBetIdError1] = useState(false);
    const [betIdError2, setBetIdError2] = useState(false);
    const [betIdError3, setBetIdError3] = useState(false);
    const [betIdLoadingSymbol, setBetIdLoadingSymbol] = useState("");
    const [triggerBetIdRevalidation, setTriggerBetIdRevalidation] =
        useState(false);
    const isValidBetId = betId.length !== 0;
    const isValidBetId1 = betId.length >= 4;
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
    const [numberCollector, setNumberCollector] = useState<any>();
    const [phoneNumberError, setPhoneNumberError] = useState(false);
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
        setPhoneNumberLoadingSymbol("true");
        setTimeout(() => {
            if (!isValidPhoneNumber) {
                setPhoneNumberError(true);
                // setPhoneNumberLoadingSymbol("");
                // setTriggerPhoneNumberRevalidation(true);
            } else {
                setPhoneNumberError(false);
                // if (network.length === 0) {
                //     setPhoneNumberLoadingSymbol("");
                // } else if (network.length === 1) {
                //     setPhoneNumberLoadingSymbol("true");
                // } else if (network.length > 2 || network.length === 2) {
                //     setPhoneNumberLoadingSymbol("true");
                // }
                setTriggerPhoneNumberRevalidation(true);
                setPhoneNumberLoadingSymbol("false");
                // openNetworkModal();
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

    const [reoccur, setReOccur] = useState(true);

    // Verifying Password field
    const [passwordError, setPasswordError] = useState(false);
    const [passwordLoadingSymbol, setPasswordLoadingSymbol] = useState("");
    const [triggerPasswordRevalidation, setTriggerPasswordRevalidation] =
        useState(false);
    const isValidPassword = password.length >= 4;
    const SignUpPasswordVerification = () => {
        if (password === "") {
            return;
        }
        if (!triggerPasswordRevalidation) {
            setPasswordLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidPassword) {
                    setPasswordError(true);
                    setPasswordLoadingSymbol("");
                    setTriggerPasswordRevalidation(true);
                } else {
                    setPasswordError(false);
                    setPasswordLoadingSymbol("false");
                    setTriggerPasswordRevalidation(true);
                }
            }, 300);
        }
    };

    // Verifying Confirm Password field
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordLoadingSymbol, setConfirmPasswordLoadingSymbol] =
        useState("");
    const [
        triggerConfirmPasswordRevalidation,
        setTriggerConfirmPasswordRevalidation,
    ] = useState(false);
    const isValidConfirmPassword = password === confirmPassword;
    const SignUpConfirmPasswordVerification = () => {
        if (confirmPassword === "") {
            return;
        }
        if (!triggerConfirmPasswordRevalidation) {
            setConfirmPasswordLoadingSymbol("true");
            setTimeout(() => {
                if (!isValidConfirmPassword) {
                    setConfirmPasswordError(true);
                    setConfirmPasswordLoadingSymbol("");
                    setTriggerConfirmPasswordRevalidation(true);
                } else {
                    setConfirmPasswordError(false);
                    setConfirmPasswordLoadingSymbol("false");
                    setTriggerConfirmPasswordRevalidation(true);
                }
            }, 300);
        }
    };

    // Verifying Refer Id field
    const [referIdError, setReferIdError] = useState(false);
    const [referIdLoadingSymbol, setReferIdLoadingSymbol] = useState("");
    const SignUpReferIdVerification = async () => {
        if (referId === "") {
            return;
        }
        const isValidReferId = true;
        setReferIdLoadingSymbol("true");
        setTimeout(() => {
            if (!isValidReferId) {
                setReferIdError(true);
                setReferIdLoadingSymbol("");
            } else {
                setReferIdError(false);
                setReferIdLoadingSymbol("false");
            }
        }, 300);
    };

    // REVERIFY ALL INPUTS .........
    // Re-verifying fullname field
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

    // Re-verifying email field
    const [triggerEmailRevalidation2, setTriggerEmailRevalidation2] =
        useState(false);

    if (triggerEmailRevalidation) {
        setTimeout(() => {
            if (!isValidEmail) {
                if (email === "") {
                    setEmailError(false);
                }
                if (email !== "") {
                    setEmailError(true);
                }
                setEmailLoadingSymbol("");
            } else {
                setEmailError(false);
                setEmailLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerEmailRevalidation2) {
        setTimeout(() => {
            if (!isValidEmail) {
                if (email === "") {
                    //  setEmailError(false);
                }
                if (email !== "") {
                    setEmailError(true);
                }
                setEmailLoadingSymbol("");
            } else {
                setEmailError(false);
                setEmailLoadingSymbol("false");
            }
        }, 300);
    }

    // Re-verifying bet id field
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
    const [
        triggerPhoneNumberRevalidation2,
        setTriggerPhoneNumberRevalidation2,
    ] = useState(false);
    if (numberCollector !== number) {
        if (reoccur) {
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
                        handleDismissKeyboard();
                        setPhoneNumberError(false);
                        // if (network.length === 0) {
                        //   setPhoneNumberLoadingSymbol("");
                        // } else if (network.length === 1) {
                        //   setPhoneNumberLoadingSymbol("true");
                        // } else if (network.length > 2 || network.length === 2) {
                        //   setPhoneNumberLoadingSymbol("true");
                        // }
                        setIndex(0);
                        //  openNetworkModal();
                        setTriggerPhoneNumberRevalidation2(false);
                        setReOccur(false);
                    }
                }, 300);
            }
        }
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
                // setPhoneNumberLoadingSymbol("false");
            } else {
                handleDismissKeyboard();
                setPhoneNumberError(false);
                // if (network.length === 0) {
                //   setPhoneNumberLoadingSymbol("");
                // } else if (network.length === 1) {
                //   setPhoneNumberLoadingSymbol("true");
                // } else if (network.length > 2 || network.length === 2) {
                //   setPhoneNumberLoadingSymbol("true");
                // }
                setIndex(0);
                // openNetworkModal();
                setReOccur(false);
            }
        }, 300);
    }

    // Re-verifying password field
    const [triggerPasswordRevalidation2, setTriggerPasswordRevalidation2] =
        useState(false);
    if (triggerPasswordRevalidation) {
        setTimeout(() => {
            if (!isValidPassword) {
                if (password === "") {
                    setPasswordError(false);
                }
                if (password !== "") {
                    setPasswordError(true);
                }
                setPasswordLoadingSymbol("");
            } else {
                setPasswordError(false);
                setPasswordLoadingSymbol("false");
            }
        }, 300);
    }

    if (triggerPasswordRevalidation2) {
        setTimeout(() => {
            if (!isValidPassword) {
                if (password === "") {
                    // setPasswordError(false);
                }
                if (password !== "") {
                    setPasswordError(true);
                }
                setPasswordLoadingSymbol("");
            } else {
                setPasswordError(false);
                setPasswordLoadingSymbol("false");
            }
        }, 300);
    }

    // Re-verifying Confirm password field
    const [
        triggerConfirmPasswordRevalidation2,
        setTriggerConfirmPasswordRevalidation2,
    ] = useState(false);
    if (triggerConfirmPasswordRevalidation) {
        setTimeout(() => {
            if (!isValidConfirmPassword) {
                if (confirmPassword === "") {
                    setConfirmPasswordError(false);
                }
                if (confirmPassword !== "") {
                    setConfirmPasswordError(true);
                }
                setConfirmPasswordLoadingSymbol("");
            } else {
                setConfirmPasswordError(false);
                setConfirmPasswordLoadingSymbol("false");
            }
        }, 300);
    }
    if (triggerConfirmPasswordRevalidation2) {
        const isValidConfirmPassword2 =
            password === confirmPassword &&
            password !== "" &&
            confirmPassword !== "";

        setTimeout(() => {
            if (!isValidConfirmPassword2) {
                if (confirmPassword === "") {
                    // setConfirmPasswordError(false);
                }
                if (confirmPassword !== "") {
                    setConfirmPasswordError(true);
                }
                setConfirmPasswordLoadingSymbol("");
            } else {
                setConfirmPasswordError(false);
                setConfirmPasswordLoadingSymbol("false");
            }
        }, 300);
    }

    // Phone Number Verification
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
    const [currentNetwork, setCurrentNetwork] = useState<number>();
    const [networkModal, setNetworkModal] = useState<string>("");
    function openNetworkModal() {
        if (network.length === 0) {
            setNetworkModal("first");
        } else if (network.length === 1) {
            setNetworkModal("second");
        } else if (network.length > 2 || network.length === 2) {
            setNetworkModal("third");
        }
    }

    const inputRef = useRef<TextInput>(null);
    const inputRef2 = useRef<TextInput>(null);
    const inputRef3 = useRef<TextInput>(null);
    const inputRef4 = useRef<TextInput>(null);
    const inputRef5 = useRef<TextInput>(null);
    const inputRef6 = useRef<TextInput>(null);
    const inputRef7 = useRef<TextInput>(null);
    const handleDismissKeyboard = () => {
        inputRef.current?.blur();
        inputRef2.current?.blur();
        inputRef3.current?.blur();
        inputRef4.current?.blur();
        inputRef5.current?.blur();
        inputRef6.current?.blur();
        inputRef7.current?.blur();
    };

    function runNetworkCheck(value: React.SetStateAction<number | undefined>) {
        Vibration.vibrate(50);
        setCurrentNetwork(value);
    }
    const currentLanguage = useSelector(
        (state: RootState) => state.getUserData.currentLanguage,
    );
    const languageText =
        currentLanguage === "english" ? Language.english : Language.french;

    const [show, setShow] = useState(0);
    const [display, setDisplay] = useState(0);
    const [text1, setText1] = useState(
        languageText.text19,
        // `Sorry Only Beninese numbers are allowed`
    );
    const [text2, setText2] = useState(
        languageText.text20,
        // `user already exists`
    );
    const [text3, setText3] = useState(
        languageText.text21,
        //   `Failed to create your data`,
    );
    const [text4, setText4] = useState(
        languageText.text22,
        // `The referrer does not exist`
    );
     const [text5, setText5] = useState(
         languageText.text311,
         
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

    // const [screenheight, setScreenHeight] = useState({screenheight: 0})
    // function onContentSizeChange(contentWidth: any, contentHeight: any) {
    // setScreenHeight({screenheight: 3000})
    // }
    //  const [height, setHeight] = useState(0);

    //  const onLayout = (event: any) => {
    //    const {height: newHeight} = event.nativeEvent.layout;
    //    setHeight(newHeight);
    //  };
    // const scrollEnabled = screenheight.screenheight !== height;

   
const [ConditionOfRegistrationStateError, setConditionOfRegistrationStateError] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
const [isLoading, setIsLoading] = useState(false);



    function handleSubmit() {

  
         if (isLoading) return;
         setIsLoading(true);

        if (fullnameLoadingSymbol !== "false") {
            setFullNameError(true);
            setTriggerFullNameRevalidation2(true);
        }
      
        if (emailLoadingSymbol !== "false") {
            setEmailError(true);
            setTriggerEmailRevalidation2(true);
        }
       
        if (phoneNumberLoadingSymbol !== "false") {
            setPhoneNumberError(true);
            setTriggerPhoneNumberRevalidation2(true);
        }
        if (passwordLoadingSymbol !== "false") {
            setPasswordError(true);
            setTriggerPasswordRevalidation2(true);
        }
        if (confirmPasswordLoadingSymbol !== "false") {
            setConfirmPasswordError(true);
            setTriggerConfirmPasswordRevalidation2(true);
        }

        if (
            fullnameLoadingSymbol !== "false" ||
            emailLoadingSymbol !== "false" ||
            phoneNumberLoadingSymbol !== "false" ||
            passwordLoadingSymbol !== "false" ||
            confirmPasswordLoadingSymbol !== "false"
        ) {
            setIsLoading(false);
            return;
        }

        const formData: FormData = {
            fullname: fullname,
            email: email,
            betId: betId,
            number: number,
            password: password,
            referId: referId,
        };

        dispatch(signUpUser(formData))
            .then(async (result: any) => {
                if (result.payload.success === true) {
                    try {
                        await AsyncStorage.setItem(
                            "token",
                            result.payload.token,
                        );
                        navigation.replace("setAuthScreen");
                        setIsLoading(false);
                    } catch (err) {
                        console.log(err);
                    }
                }
                if (result.payload.status === 400) {
                    displayNotification2();
                    setIsLoading(false);
                }
                if (result.payload.status === 501) {
                    displayNotification3();
                    setIsLoading(false);
                }
                if (result.payload.status === 503) {
                    displayNotification4();
                    setIsLoading(false);
                }
            })
            .catch((err: any) => console.log(err));
    }

    //   const logout = ()  => {
    //    AsyncStorage.removeItem("token").then(() => {
    //     navigation.replace("login")
    //   }).catch(err => console.log(err))
    //   }
    // logout()

    return (
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.background,
            position: "relative",
            paddingTop: 10,
          }}
        >
          <ExploreHeader8 />
          <StatusBar backgroundColor={Colors.background} />
          <View style={{display: "flex", height: 190}}>
            <View style={styles.transaction_template_container_header_1}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
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
                <Ionicons
                  name='chevron-back'
                  size={27}
                  color={Colors.welcomeText}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.welcomeText,
                  fontWeight: "600",
                  opacity: 1,
                  fontSize: 18.5,
                  marginLeft: "27%",
                }}
              >
                {languageText.text23}
                {/* Register */}
              </Text>
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
                      : display === 5
                        ? text5
                        : text4
              }
              textColor={Colors.toastText}
              icon={
                <AntDesign
                  name='exclamationcircleo'
                  size={40}
                  color={Colors.toastText}
                />
              }
            />
            <View style={styles.container2}>
              <Text
                style={{
                  color: Colors.welcomeText,
                  fontWeight: "600",
                  opacity: 1,
                  fontSize: 23,
                  marginLeft: "2%",
                }}
              >
                {languageText.text24}
                {/* Get Started */}
              </Text>
              <Text
                style={{
                  color: Colors.welcomeText,
                  marginLeft: "2%",
                  marginRight: "9%",
                  fontWeight: "400",
                  opacity: 0.4,
                  fontSize: 14,
                  marginTop: 2,
                }}
              >
                {languageText.text25}
                {/* Create an account to get started. */}
              </Text>
            </View>
          </View>

          <ScrollView
            style={{
              display: "flex",
              gap: 10,
              padding: 20,
              paddingBottom: 80,
              backgroundColor: Colors.inputBackground,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flex: 8,
            }}
            scrollEnabled={true}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                backgroundColor: Colors.background,
                borderRadius: 8,
                borderColor: fullNameError
                  ? "red"
                  : index === 1
                    ? Colors.default1
                    : "transparent",
                borderWidth: 1.5,
                position: "relative",
              }}
            >
              <View style={{position: "absolute", top: -19, right: 2}}>
                {fullNameError && (
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      color: "red",
                    }}
                  >
                    * {languageText.text26}
                    {/* Please enter a valid name */}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  paddingLeft: 12,
                  paddingRight: 2,
                  opacity: 1,
                }}
              >
                <Ionicons
                  name='person-outline'
                  size={18}
                  color={
                    fullNameError
                      ? "red"
                      : index === 1
                        ? Colors.default1
                        : "rgba(128, 128, 128, 0.5)"
                  }
                />
              </Text>
              <TextInput
                ref={
                  Platform.OS === "ios" || Platform.OS === "android"
                    ? inputRef
                    : null
                }
                value={fullname}
                onChangeText={setFullname}
                // onChange={SignUpFullnameReVerification}
                onFocus={() => setItemOnFocus(1)}
                onBlur={setItemOnBlur}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder={
                  languageText.text27
                  //   "First and last name"
                }
                autoCorrect={false}
                style={[defaultStyles.inputField, {color: Colors.welcomeText}]}
                onEndEditing={SignUpFullnameVerification}
              />
              <View style={{paddingRight: 10.4}}>
                {fullnameLoadingSymbol === "true" ? (
                  <ActivityIndicator size='small' color={Colors.primary3} />
                ) : fullnameLoadingSymbol === "false" ? (
                  <MaterialIcons
                    name='verified'
                    size={19}
                    color={Colors.default1}
                  />
                ) : null}
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 18,
                backgroundColor: Colors.background,
                borderRadius: 8,
                borderColor: emailError
                  ? "red"
                  : index === 2
                    ? Colors.default1
                    : "transparent",
                borderWidth: 1.5,
                position: "relative",
              }}
            >
              <View style={{position: "absolute", top: -19, right: 2}}>
                {emailError && (
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      color: "red",
                    }}
                  >
                    * {languageText.text28}
                    {/* Please enter a valid mail */}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  paddingLeft: 12,
                  paddingRight: 2,
                  opacity: 1,
                }}
              >
                <MaterialCommunityIcons
                  name='email-fast-outline'
                  size={18}
                  color={
                    emailError
                      ? "red"
                      : index === 2
                        ? Colors.default1
                        : "rgba(128, 128, 128, 0.5)"
                  }
                />
              </Text>
              <TextInput
                ref={
                  Platform.OS === "ios" || Platform.OS === "android"
                    ? inputRef2
                    : null
                }
                value={email}
                onChangeText={setEmail}
                onFocus={() => setItemOnFocus(2)}
                onBlur={setItemOnBlur}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder='E-mail'
                autoCorrect={false}
                style={[defaultStyles.inputField, {color: Colors.welcomeText}]}
                onEndEditing={SignUpEmailVerification}
              ></TextInput>
              <View style={{paddingRight: 10.4}}>
                {emailLoadingSymbol === "true" ? (
                  <ActivityIndicator size='small' color={Colors.primary3} />
                ) : emailLoadingSymbol === "false" ? (
                  <MaterialIcons
                    name='verified'
                    size={19}
                    color={Colors.default1}
                  />
                ) : null}
              </View>
            </View>

            <TouchableWithoutFeedback
              // onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 18,
                  backgroundColor: Colors.background,
                  borderRadius: 8,
                  borderColor: phoneNumberError
                    ? "red"
                    : index === 4
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
                  {phoneNumberError && (
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      * {languageText.text34}
                      {/* Please enter a valid phone number */}
                    </Text>
                  )}
                </View>
                {phoneNumberLoadingSymbol === "false" && (
                  <PopInAnimation
                    scaleSpeed={0.6}
                    opacitySpeed={800}
                    style={{
                      position: "absolute",
                      top: -15,
                      right: 2,
                      borderRadius: 2,
                      backgroundColor: Colors.default1,
                    }}
                  >
                    {currentNetwork && network.length > 1 && (
                      <Text
                        style={{
                          fontWeight: "900",
                          fontSize: 8,
                          color: "white",

                          paddingLeft: 4,
                          paddingRight: 4,
                        }}
                      >
                        {currentNetwork}
                      </Text>
                    )}
                    {network2 && network.length === 1 && (
                      <Text
                        style={{
                          fontWeight: "900",
                          fontSize: 8,
                          color: "white",

                          paddingLeft: 4,
                          paddingRight: 4,
                        }}
                      >
                        {network2}
                      </Text>
                    )}
                  </PopInAnimation>
                )}

                {/* <Text style={{paddingLeft: 12, paddingRight: 2, opacity: 1}}>
            <Feather
              name='phone-call'
              size={15}
              color={
                phoneNumberError
                  ? "red"
                  : index === 4
                  ? Colors.default1
                  : "rgba(128, 128, 128, 0.5)"
              }
            />
          </Text> */}
                <CountryCode
                  displayNotification={displayNotification}
                  countryFlag={countryFlag}
                  countryCode={countryCode}
                  changeCountryCode={changeCountryCode}
                  changeCountryFlag={changeCountryFlag}
                />
                <View
                  style={{
                    paddingVertical: 1,
                    paddingHorizontal: 5,
                    borderRadius: 3.5,
                    margin: 3,
                    marginRight: 5,
                    backgroundColor: Colors.primary3,
                    opacity: 0.8,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.countrySelectionTextColor,
                      fontWeight: "800",
                      fontSize: 12,
                    }}
                  >
                    {countryCode}
                  </Text>
                </View>
                <TextInput
                  ref={
                    Platform.OS === "ios" || Platform.OS === "android"
                      ? inputRef4
                      : null
                  }
                  value={number}
                  onChangeText={setNumber}
                  onFocus={() => setItemOnFocus(4)}
                  onBlur={setItemOnBlur}
                  autoCorrect={false}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder={
                    languageText.text35
                    // "Numéro de téléphone"
                  }
                  style={{
                    height: 44,
                    opacity: 1,
                    backgroundColor: "transparent",
                    color: Colors.welcomeText,
                    flex: 1,
                    fontWeight: "800",
                    fontSize: 17,
                  }}
                  selectionColor={Colors.default1}
                  onEndEditing={wrapperSignUpPhoneNumberVerification}
                  keyboardType='number-pad'
                ></TextInput>
                <View style={{paddingRight: 10.4}}>
                  {phoneNumberLoadingSymbol === "true" ? (
                    <ActivityIndicator size='small' color={Colors.primary3} />
                  ) : phoneNumberLoadingSymbol === "false" ? (
                    <MaterialIcons
                      name='verified'
                      size={19}
                      color={Colors.default1}
                    />
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 18,
                backgroundColor: Colors.background,
                borderRadius: 8,
                borderColor: passwordError
                  ? "red"
                  : index === 5
                    ? Colors.default1
                    : "transparent",
                borderWidth: 1.5,
                position: "relative",
              }}
            >
              <View style={{position: "absolute", top: -19, right: 2}}>
                {passwordError && (
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      color: "red",
                    }}
                  >
                    * {languageText.text36}
                    {/* Password is too short */}
                  </Text>
                )}
              </View>

              <Text
                style={{
                  paddingLeft: 12,
                  paddingRight: 2,
                  opacity: 1,
                }}
              >
                <MaterialIcons
                  name='password'
                  size={18}
                  color={
                    passwordError
                      ? "red"
                      : index === 5
                        ? Colors.default1
                        : "rgba(128, 128, 128, 0.5)"
                  }
                />
              </Text>
              <TextInput
                ref={
                  Platform.OS === "ios" || Platform.OS === "android"
                    ? inputRef5
                    : null
                }
                value={password}
                onChangeText={setPassword}
                onFocus={() => setItemOnFocus(5)}
                onBlur={setItemOnBlur}
                secureTextEntry={iconVisibility}
                autoCorrect={false}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder={
                  languageText.text37
                  // "Password"
                }
                style={[defaultStyles.inputField, {color: Colors.welcomeText}]}
                selectionColor={Colors.default1}
                onEndEditing={SignUpPasswordVerification}
              ></TextInput>

              <TouchableOpacity
                style={{
                  paddingRight: 15,
                  paddingLeft: 6,
                  opacity: 1,
                }}
                onPress={changePasswordVisibility}
              >
                {iconVisibility ? (
                  <Ionicons
                    name='eye-off'
                    size={18}
                    color={
                      passwordError
                        ? "red"
                        : index === 5
                          ? Colors.default1
                          : "rgba(128, 128, 128, 0.5)"
                    }
                  />
                ) : (
                  <Ionicons
                    name='eye'
                    size={18}
                    color={
                      passwordError
                        ? "red"
                        : index === 5
                          ? Colors.default1
                          : "rgba(128, 128, 128, 0.5)"
                    }
                  />
                )}
              </TouchableOpacity>
              {(passwordLoadingSymbol === "true" ||
                passwordLoadingSymbol === "false") && (
                <View style={{paddingRight: 12}}>
                  {passwordLoadingSymbol === "true" ? (
                    <ActivityIndicator size='small' color={Colors.primary3} />
                  ) : passwordLoadingSymbol === "false" ? (
                    <MaterialIcons
                      name='verified'
                      size={19}
                      color={Colors.default1}
                    />
                  ) : null}
                </View>
              )}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 18,
                backgroundColor: Colors.background,
                borderRadius: 8,
                borderColor: confirmPasswordError
                  ? "red"
                  : index === 6
                    ? Colors.default1
                    : "transparent",
                borderWidth: 1.5,
                position: "relative",
              }}
            >
              <View style={{position: "absolute", top: -19, right: 2}}>
                {confirmPasswordError && (
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 12,
                      color: "red",
                    }}
                  >
                    * {languageText.text38}
                    {/* Does not match password field */}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  paddingLeft: 12,
                  paddingRight: 2,
                  opacity: 1,
                }}
              >
                <MaterialIcons
                  name='password'
                  size={18}
                  color={
                    confirmPasswordError
                      ? "red"
                      : index === 6
                        ? Colors.default1
                        : "rgba(128, 128, 128, 0.5)"
                  }
                />
              </Text>
              <TextInput
                ref={
                  Platform.OS === "ios" || Platform.OS === "android"
                    ? inputRef6
                    : null
                }
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setItemOnFocus(6)}
                onBlur={setItemOnBlur}
                secureTextEntry={iconVisibility}
                autoCorrect={false}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder={
                  languageText.text39
                  // "Confirm the password"
                }
                style={[defaultStyles.inputField, {color: Colors.welcomeText}]}
                onEndEditing={SignUpConfirmPasswordVerification}
              ></TextInput>
              <TouchableOpacity
                style={{
                  paddingLeft: 6,
                  paddingRight: 15,
                  opacity: 1,
                }}
                onPress={changePasswordVisibility}
              >
                {iconVisibility ? (
                  <Ionicons
                    name='eye-off'
                    size={18}
                    color={
                      confirmPasswordError
                        ? "red"
                        : index === 6
                          ? Colors.default1
                          : "rgba(128, 128, 128, 0.5)"
                    }
                  />
                ) : (
                  <Ionicons
                    name='eye'
                    size={18}
                    color={
                      confirmPasswordError
                        ? "red"
                        : index === 6
                          ? Colors.default1
                          : "rgba(128, 128, 128, 0.5)"
                    }
                  />
                )}
              </TouchableOpacity>
              {(confirmPasswordLoadingSymbol === "true" ||
                confirmPasswordLoadingSymbol === "false") && (
                <View style={{paddingRight: 12}}>
                  {confirmPasswordLoadingSymbol === "true" ? (
                    <ActivityIndicator size='small' color={Colors.primary3} />
                  ) : confirmPasswordLoadingSymbol === "false" ? (
                    <MaterialIcons
                      name='verified'
                      size={19}
                      color={Colors.default1}
                    />
                  ) : null}
                </View>
              )}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 18,
                backgroundColor: Colors.background,
                borderRadius: 8,
                borderColor: index === 7 ? Colors.default1 : "transparent",
                borderWidth: 1.5,
                marginBottom: 7,
                position: "relative",
              }}
            >
              <Text
                style={{
                  paddingLeft: 12,
                  paddingRight: 2,
                  opacity: 1,
                }}
              >
                <FontAwesome6
                  name='people-pulling'
                  size={16}
                  color={
                    index === 7 ? Colors.default1 : "rgba(128, 128, 128, 0.5)"
                  }
                />
              </Text>
              <TextInput
                ref={
                  Platform.OS === "ios" || Platform.OS === "android"
                    ? inputRef7
                    : null
                }
                value={referId}
                onChangeText={setReferId}
                onFocus={() => setItemOnFocus(7)}
                onBlur={setItemOnBlur}
                secureTextEntry={iconVisibility}
                autoCorrect={false}
                placeholderTextColor={Colors.placeHolderTextColor}
                autoCapitalize='none'
                placeholder={
                  languageText.text40
                  // "Reference (optional)"
                }
                style={[defaultStyles.inputField, {color: Colors.welcomeText}]}
                onEndEditing={SignUpReferIdVerification}
              ></TextInput>
              <View style={{paddingRight: 10.4}}>
                {referIdLoadingSymbol === "true" ? (
                  <ActivityIndicator size='small' color={Colors.primary3} />
                ) : referIdLoadingSymbol === "false" ? (
                  <MaterialIcons
                    name='verified'
                    size={19}
                    color={Colors.default1}
                  />
                ) : null}
              </View>
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
                marginTop: 10,
                marginBottom: 40,
                opacity: isLoading ? 0.5 : 1,
              }}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && <ActivityIndicator size='small' color='white' />}
              <Text style={defaultStyles.btnText}>
                {languageText.text16}
                {/* Continue */}
              </Text>
            </TouchableOpacity>
          </ScrollView>

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
          <Loader visible={loading} />
        </View>
      </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    padding: 20,
  
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 8,
  },
  transaction_template_container_header_1: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "700",
    gap: 12,
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 12,
    paddingRight: 8,
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
});

export default Signup;
