/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable */

 import React, {useState, useEffect, useRef} from "react";
 import * as Haptics from "expo-haptics";
 import {
   View,
   Text,
   StyleSheet,
   Dimensions,

   TouchableOpacity,
   ScrollView,
   TextInput,
   TouchableWithoutFeedback,
   ActivityIndicator,
   Share,
 } from "react-native";
 import {

   MaterialCommunityIcons,
   MaterialIcons,
 } from "@expo/vector-icons";
 import {FontAwesome6, AntDesign} from "@expo/vector-icons";
 <MaterialCommunityIcons name='hand-wave-outline' size={24} color='black' />;
 const screenHeight = Dimensions.get("window").height;
 import {defaultStyles} from "@/constants/Styles";

 import BetIdModalPage from "@/components/(Utils)/BetIdModalPage";
 import ExploreHeader3 from "@/components/ExploreHeader3";
 import slides3 from "@/components/(Utils)/slides3";
 import {

   formatNumberWithCommasAndDecimal2,
 } from "../components/(Utils)/formatNumber";
 
 import { Alert} from "react-native";
 import QRCode from "react-native-qrcode-svg";
 import ViewShot from "react-native-view-shot";
 import ToastNotification from "@/components/(Utils)/toastNotification";
 import { Color } from "@/constants/Colors";
 import {useDispatch, useSelector} from "react-redux";
 import {AppDispatch, RootState} from "@/state/store";
import { genarateQRCode } from "@/state/userData/getUserData";
import {Language} from "@/constants/languages";
const Currency = "XOF";

interface FormData {
  email: string;
  betId: string;
  amount: number;
}

//   Calculate the percentage value
const percentageHeight = screenHeight * 0.375;
const percentageHeight2 = screenHeight * 1;
const ShareDeposit = (props: any) => {
  const data = useSelector((state: RootState) => state.getUserData.data);
  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
  );
  const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
  const dispatch = useDispatch<AppDispatch>();
  const [index, setIndex] = useState(0);
  const [qrCodeValue, setQRCodeValue] = useState<any>();

  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;

  // EXTRA SETTINGS ........
  // Input fucus and blur setting
  async function setItemOnFocus(index: React.SetStateAction<number>) {
    setIndex(index);
  }

  function setItemOnBlur() {
    setIndex(0);
  }

  //    function to close keyboard
  const inputRef = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);

  const handleDismissKeyboard = () => {
    inputRef.current?.blur();
    inputRef2.current?.blur();
    inputRef3.current?.blur();
    inputRef4.current?.blur();
  };

  const [betId, setBetId] = useState<any>(data?.supplementaryBetId[0]);
  const [amount, setAmount] = useState<any>();

  //    VERIFYING INPUTS
  //     Verifying Bet-Id field
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

  //    reverifying amount entry
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

  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  function generateCode() {
    if (loading3) return;
    setLoading3(true);

    if (betIdLoadingSymbol !== "false") {
      triggerHapticFeedback();
      setBetIdError(true);
      setTriggerBetIdRevalidation2(true);
    }

    if (amountLoadingSymbol !== "false") {
      triggerHapticFeedback();
      setAmountError(true);
      setTriggerAmountRevalidation2(true);
    }

    if (betIdLoadingSymbol !== "false" || amountLoadingSymbol !== "false") {
      setLoading3(false);
      return;
    }

    const formData: FormData = {
      email: data.email,
      betId: betId,
      amount: amount,
    };

    dispatch(genarateQRCode(formData))
      .then(async (result) => {
        if (result.payload.success === true) {
          try {
            setQRCodeValue(
              `https://community.lamedcash.com/deposits/${result.payload.id}`
            );
            setLoading3(false);
          } catch (err) {
            console.log(err);
          }
        }
        if (result.payload.status === 400) {
          //  displayNotification2();
          setLoading3(false);
        }
        if (result.payload.status === 501) {
          //  displayNotification3();
          setLoading3(false);
        }
        if (result.payload.status === 503) {
          //  displayNotification4();
          setLoading3(false);
        }
      })
      .catch((err: any) => console.log(err));
  }

  //    /For BetId Modal Operations
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

  //    animation adverts
  //    const scrollX = useRef(new Animated.Value(0)).current;
  //    const [currentIndex, setCurrentIndex] = useState(0);
  //    const viewableItemsChanged = useRef(({viewableItems}: any) => {
  //      setCurrentIndex(viewableItems[0].index);
  //    }).current;
  //    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  //    const slidesRef = useRef<any>(null);
  //    const {width} = useWindowDimensions();
  //    const scrollTo = () => {
  //      if (currentIndex < slides.length - 1) {
  //        slidesRef?.current?.scrollToIndex({index: currentIndex + 1});
  //      } else if (currentIndex === slides.length - 1) {
  //        slidesRef?.current?.scrollToIndex({index: 0});
  //      } else {
  //        console.log("Last item.");
  //      }
  //    };

  //     useEffect(() => {
  //       setTimeout(() => {
  //         scrollTo();
  //       }, 4000);
  //     }, [scrollTo]);

  // Auto-Verifying inputs on first load
  useEffect(() => {
    SignUpBetIdVerification();
  }, []);

  //    FOR TOAstNotification
  const [show, setShow] = useState(true);
  function displayNotification() {
    setShow(false);
    triggerHapticFeedback();
    setTimeout(() => {
      setShow(true);
    }, 3800);
  }

  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  function chooseAmount(index: number) {
    console.log(index);
    if (index === 0) {
      setAmount("500");
    }
    if (index === 1) {
      setAmount("1000");
    }
    if (index === 2) {
      setAmount("2000");
    }
    if (index === 3) {
      setAmount("5000");
    }
    if (index === 4) {
      setAmount("10000");
    }
    if (index === 5) {
      setAmount("20000");
    }
    SignUpAmountVerification();
  }

  const viewShotRef = useRef<any>(null);

  const shareQRCode = async () => {
    try {
      //    Capture the view containing the QR code and the link as an image
      const uri = await viewShotRef.current?.capture();

      if (!uri) {
        throw new Error("Failed to capture view");
      }

      //    Share the QR code value/link and the captured image
      const result = await Share.share({
        message: `Cliquez/scannez pour compléter/scanner le dépôt pour Moïse sur Lamedcash..... ${qrCodeValue} `,
        url: uri,
      });
      console.log(JSON.stringify(result));

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //    Shared successfully
        } else {
          // Shared successfully
        }
      } else if (result.action === Share.dismissedAction) {
        // Share cancelled
      }
    } catch (error) {
      Alert.alert("Error", "Failed to share QR code");
    }
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
            {languageText.text364}
          </Text>
          <View></View>
        </View>
        <ToastNotification
          show={show}
          text='Désolé Seuls les numéros béninois sont autorisés'
          textColor={Colors.toastText}
          icon={
            <AntDesign
              name='exclamationcircleo'
              size={40}
              color={Colors.toastText}
            />
          }
        />

        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
          <ScrollView
            scrollEnabled={true}
            automaticallyAdjustKeyboardInsets={true}
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            style={styles.container3}
          >
            {/* <View style={styles.container2}>
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
             </View> */}

            <View
              style={{
                display: "flex",
                height: 200,
                justifyContent: "center",

                alignItems: "center",
                margin: 20,
              }}
            >
              <View
                style={{
                  height: 200,
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 2,
                }}
              >
                {loading3 ? (
                  <ActivityIndicator size='large' color={Colors.welcomeText} />
                ) : qrCodeValue ? (
                  <ViewShot
                    ref={viewShotRef}
                    options={{format: "jpg", quality: 1}}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 150,
                        width: 150,
                        flex: 1,
                      }}
                    >
                      <QRCode value={qrCodeValue} size={150} />
                      {/* <Text>{qrCodeValue}</Text> */}
                    </View>
                  </ViewShot>
                ) : (
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      textAlign: "center",
                      color: Colors.welcomeText,
                    }}
                  >
                    {languageText.text363}
                  </Text>
                )}
                {/* <TouchableOpacity onPress={shareQRCode}>
             <Text>Share QR Code</Text>
           </TouchableOpacity> */}
              </View>
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
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 8,
                  borderColor:
                    betIdError || betIdError1 || betIdError2 || betIdError3
                      ? "red"
                      : index === 1
                      ? Colors.default1
                      : betIdLoadingSymbol === "false"
                      ? Colors.default1
                      : "transparent",
                  borderWidth: 1.5,
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
                    Id
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: -18,
                    right: 2,
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  {betIdError && (
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      * Please enter a valid Bet Id
                    </Text>
                  )}
                  {betIdError1 && (
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      * Bet Id too short
                    </Text>
                  )}
                  {betIdError2 && (
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      * Bet Id must be numbers
                    </Text>
                  )}
                  {betIdError3 && (
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      * Too short and not numbers
                    </Text>
                  )}
                </View>
                <TextInput
                  ref={inputRef}
                  value={betId}
                  onChangeText={setBetId}
                  onFocus={() => setItemOnFocus(1)}
                  onBlur={setItemOnBlur}
                  autoCorrect={false}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder='ID'
                  style={[
                    defaultStyles.inputField,
                    {
                      color: Colors.welcomeText,
                      height: 54,
                      fontSize: 19,
                    },
                  ]}
                  selectionColor={Colors.default1}
                  onEndEditing={SignUpBetIdVerification}
                  keyboardType='number-pad'
                ></TextInput>
                <Text
                  style={{
                    paddingLeft: 2,
                    paddingRight: 13.4,
                    opacity: 1,
                  }}
                >
                  <FontAwesome6
                    name='id-card'
                    size={16}
                    color={
                      betIdError || betIdError1 || betIdError2 || betIdError3
                        ? "red"
                        : index === 1
                        ? Colors.default1
                        : betIdLoadingSymbol === "false"
                        ? Colors.default1
                        : "rgba(128, 128, 128, 0.5)"
                    }
                  />
                </Text>
                {/* <TouchableOpacity
                                    onPress={openBetIdModal}
                                    style={{
                                        paddingRight: 10.4,
                                        paddingLeft: 5,
                                    }}
                                >
                                    <MaterialIcons
                                        name="arrow-drop-down"
                                        size={30}
                                        color={Colors.primary3}
                                    />
                                </TouchableOpacity> */}
              </View>
            </View>

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
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: Colors.welcomeText,
                  opacity: 0.5,
                }}
              >
                Montant
              </Text>
              {/* <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 0 }}
                                style={{
                                    marginTop: 15,
                                    height: 60,
                                }}
                            >
                                {slides3.map((choice, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                width: 110,
                                                height: "100%",
                                                marginRight: 15,
                                                aspectRatio: 3 / 2,
                                                backgroundColor:
                                                    Colors.inputBackground,
                                                borderRadius: 8,
                                                marginBottom: 10,
                                            }}
                                            onPress={() => chooseAmount(index)}
                                        >
                                            <View
                                                style={{
                                                    height: 20,
                                                    width: "100%",
                                                    backgroundColor:
                                                        "rgba(73, 166, 106, 0.2)",
                                                    borderTopLeftRadius: 8,
                                                    borderTopRightRadius: 8,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: Colors.default1,
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 11,
                                                        }}
                                                    >
                                                        {" "}
                                                        Pay
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 11,
                                                        }}
                                                    >
                                                        {" "}
                                                        {Currency}
                                                    </Text>{" "}
                                                    {formatNumberWithCommasAndDecimal2(
                                                        choice.amount,
                                                    )}
                                                </Text>
                                            </View>
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
                                                        fontSize: 16.5,
                                                        color: Colors.welcomeText,
                                                        fontWeight: "900",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontWeight: "900",
                                                        }}
                                                    >
                                                        {" "}
                                                        {Currency}
                                                    </Text>{" "}
                                                    {formatNumberWithCommasAndDecimal2(
                                                        choice.amount,
                                                    )}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView> */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 15,
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 8,
                  borderColor: amountError
                    ? "red"
                    : index === 2
                    ? Colors.default1
                    : amountLoadingSymbol
                    ? Colors.default1
                    : "transparent",
                  borderWidth: 1.5,
                  position: "relative",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: -18,
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
                      * Please enter a valid Amount
                    </Text>
                  )}
                </View>

                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  onFocus={() => setItemOnFocus(2)}
                  onBlur={setItemOnBlur}
                  autoCorrect={false}
                  placeholderTextColor={Colors.placeHolderTextColor}
                  autoCapitalize='none'
                  placeholder={languageText.text383}
                  style={[
                    defaultStyles.inputField,
                    {
                      color: Colors.welcomeText,
                      fontSize: 19,
                      height: 54,
                    },
                  ]}
                  selectionColor={Colors.default1}
                  onEndEditing={SignUpAmountVerification}
                  keyboardType='number-pad'
                ></TextInput>
                <Text
                  style={{
                    paddingLeft: 2,
                    paddingRight: 10.4,
                    opacity: 1,
                  }}
                >
                  <FontAwesome6
                    name='money-bill-wave'
                    size={16}
                    color={
                      amountError
                        ? "red"
                        : index === 2
                        ? Colors.default1
                        : amountLoadingSymbol
                        ? Colors.default1
                        : "rgba(128, 128, 128, 0.5)"
                    }
                  />
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                borderColor: Colors.default1,
                borderWidth: 1,

                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                gap: 8,
                marginTop: 30,

                opacity: loading3 ? 0.5 : 1,
              }}
              onPress={generateCode}
              disabled={loading3}
            >
              {loading3 && (
                <ActivityIndicator size='small' color={Colors.welcomeText} />
              )}
              <Text
                style={[defaultStyles.btnText, {color: Colors.welcomeText}]}
              >
                {languageText.text382}
              </Text>
            </TouchableOpacity>

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
                marginTop: 19,
                marginBottom: 27,
                opacity: loading2 ? 0.5 : 1,
              }}
              onPress={shareQRCode}
            >
              {loading2 && <ActivityIndicator size='small' color='white' />}
              <Text style={defaultStyles.btnText}>{languageText.text350}</Text>
            </TouchableOpacity>
            {/* <View
               style={{
                 backgroundColor: Colors.welcomeText,
                 marginBottom: 40,
                 height: 1.5,
                 width: "70%",
                 alignItems: "center",
                 justifyContent: "center",
                 alignSelf: "center",
                 opacity: 0.4,
                  position: "relative",
               }}
             >
               <Text
                 style={{
                   position: "absolute",
                   width: 50,
                   backgroundColor: Colors.background,
                   textAlign: "center",
                   color: Colors.welcomeText,
                   opacity: 2,
                 }}
               >
                 ou
               </Text>
             </View> */}
          </ScrollView>
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
         transform: [{ scaleX: 1 }, { scaleY: 0.8 }],
     },
 });

 export default ShareDeposit;

//  import React, {useState, useRef} from "react";
//  import {View, Text, TouchableOpacity, Alert} from "react-native";
//  import QRCode from "react-native-qrcode-svg";
//  import ViewShot from "react-native-view-shot";
//  import * as Sharing from "expo-sharing";

//  const ShareDeposit = () => {
//    const [qrCodeValue, setQRCodeValue] = useState("");
//    const viewShotRef = useRef<any>(null);

//    const generateQRCode = () => {
//       Logic to generate the QR code value (e.g., user's deposit link or data)
//       This can be replaced with your actual QR code generation logic
//      const depositLink = "https:example.com/deposit";  Example deposit link
//      setQRCodeValue(depositLink);
//    };

//    const shareQRCode = async () => {
//      try {
//            Capture the view containing the QR code and the link as an image
//        const uri = await viewShotRef.current?.capture();

//        await Sharing.shareAsync(uri);
//      } catch (error) {
//        Alert.alert("Error", "Failed to share QR code");
//      }
//    };

//    return (
//      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
//        <TouchableOpacity onPress={generateQRCode}>
//          <Text>Generate QR Code</Text>
//        </TouchableOpacity>
//        {qrCodeValue ? (
//          <ViewShot ref={viewShotRef} options={{format: "jpg", quality: 1}}>
//            <View
//              style={{
//                alignItems: "center",
//                height: 200,
//                width: 200,
//                backgroundColor: "red",
//              }}
//            >
//              <QRCode value={qrCodeValue} size={200} />
//              <Text>{qrCodeValue}</Text>
//            </View>
//          </ViewShot>
//        ) : (
//          <Text>No QR Code generated yet</Text>
//        )}
//        <TouchableOpacity onPress={shareQRCode}>
//          <Text>Share QR Code</Text>
//        </TouchableOpacity>
//      </View>
//    );
//  };

//  export default ShareDeposit;

// import React, {useState, useRef} from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Share,
//   Alert,
//   Platform,
//   Dimensions,
// } from "react-native";
// import QRCode from "react-native-qrcode-svg";
// import ViewShot from "react-native-view-shot";

// const ShareDeposit = () => {
//   const [qrCodeValue, setQRCodeValue] = useState("");
//   const viewShotRef = useRef<any>(null);

//   const generateQRCode = () => {
//      Logic to generate the QR code value (e.g., user's deposit link or data)
//      This can be replaced with your actual QR code generation logic
//     const depositLink = "https:www.betfundr.com/";  Example deposit link
//     setQRCodeValue(depositLink);
//   };

//   const shareQRCode = async () => {
//     try {
//        Capture the view containing the QR code and the link as an image
//       const uri = await viewShotRef.current?.capture();

//       if (!uri) {
//         throw new Error("Failed to capture view");
//       }

//        Share the QR code value/link and the captured image
//       const result = await Share.share({
//         message: `Click to complete the deposit on Betfundr ${qrCodeValue} .... Ou scannez le code QR ci-dessous`,  Share the QR code value or link
//         url: uri,
//       });
//       console.log(JSON.stringify(result));

//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//            Shared successfully
//         } else {
//           // Shared successfully
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // Share cancelled
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to share QR code");
//     }
//   };


//   return (
//     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
   
//       {qrCodeValue ? (
//         <ViewShot ref={viewShotRef} options={{format: "jpg", quality: 1}}>
//           <View style={{alignItems: "center", height: 200, width: 200}}>
//             <QRCode value={qrCodeValue} size={200} />
//             <Text>{qrCodeValue}</Text>
//           </View>
//         </ViewShot>
//       ) : (
//         <Text>No QR Code generated yet</Text>
//       )}
//       <TouchableOpacity onPress={shareQRCode}>
//         <Text>Share QR Code</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ShareDeposit;
