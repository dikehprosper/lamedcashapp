/* eslint-disable */

import ExploreHeader from "../components/ExploreHeader";
import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    Animated,
    useWindowDimensions,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Display from "../components/(userscomponent)/(display)/display";
import slides from "@/components/(Utils)/slide2";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome6, AntDesign, FontAwesome } from "@expo/vector-icons";
import TransactionTemplate from "../components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplateHome";
import TransactionTemplate2 from "../components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplateHome2";
import Spinner from "react-native-loading-spinner-overlay";
import { Link } from "@react-navigation/native";
<MaterialCommunityIcons name="hand-wave-outline" size={24} color="black" />;
const screenHeight = Dimensions.get("window").height;
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { Color } from "@/constants/Colors";
import AdvertItem from "@/components/(userscomponent)/advertItem";
import Paginator from "@/components/(Utils)/Paginator2";
import ToastNotification from "@/components/(Utils)/toastNotification";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Clipboard } from "react-native";
import { Language } from "@/constants/languages";
import {getUser, requestAddress} from "@/state/userData/getUserData";
import MarqueeText from "@/components/marqueeText";
import FollowingTab2 from "@/components/forYouTab2";
import useNotification from "@/components/(Utils)/displayNotification";
// Calculate the percentage value

interface Token {
  token: string;
}

const Home = (props: any, {navigation}: any) => {
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

  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulating a delay or async operation
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const [isOnline, setIsOnline] = useState(true);

  // Filter deposit transactions
  const allDeposits = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "deposits"
  );

  // Calculate total deposits
  const totalDeposits = allDeposits
    ?.filter((data: {status: string}) => data.status === "Successful")
    .reduce((total: number, transaction: any) => {
      // Use parseFloat to convert transaction.totalAmount to a number
      const amount = parseFloat(transaction.totalAmount);
      // Check if amount is a valid number
      if (!isNaN(amount)) {
        return total + amount;
      } else {
        return total;
      }
    }, 0);

  // Filter deposit transactions with status "pending"
  const pendingDeposits = data?.transactionHistory?.filter(
    (transaction: any) =>
      transaction.fundingType === "deposits" && transaction.status === "Pending"
  );

  // Calculate total cost of pending deposits
  const totalPendingDepositAmount = pendingDeposits?.reduce(
    (total: number, transaction: any) => {
      // Use parseFloat to convert transaction.totalAmount to a number
      const amount = parseFloat(transaction.totalAmount);
      // Check if amount is a valid number
      if (!isNaN(amount)) {
        return total + amount;
      } else {
        return total;
      }
    },
    0
  );

  // Filter withdrawal transactions
  const allWithdrawals = data?.transactionHistory?.filter(
    (transaction: any) => transaction.fundingType === "withdrawals"
  );

  // Calculate total withdrawals
  const totalWithdrawals = allWithdrawals
    ?.filter((data: {status: string}) => data.status === "Successful")
    .reduce((total: number, transaction: any) => {
      // Use parseFloat to convert transaction.totalAmount to a number
      const amount = parseFloat(transaction.totalAmount);
      // Check if amount is a valid number
      if (!isNaN(amount)) {
        return total + amount;
      } else {
        return total;
      }
    }, 0);

  // Filter withdrawal transactions with status "pending"
  const pendingWithdrawals = data?.transactionHistory?.filter(
    (transaction: any) =>
      transaction.fundingType === "withdrawals" &&
      transaction.status === "Pending"
  );

  // Calculate total cost of pending withdrawals
  const totalPendingWithdrawalAmount = pendingWithdrawals?.reduce(
    (total: number, transaction: any) => {
      // Use parseFloat to convert transaction.totalAmount to a number
      const amount = parseFloat(transaction.totalAmount);
      // Check if amount is a valid number
      if (!isNaN(amount)) {
        return total + amount;
      } else {
        return total;
      }
    },
    0
  );

  const [address, setAddress] = useState<any>({});
  useEffect(() => {
    fetchAddress();
  }, []);
  useEffect(() => {
    console.log(address, "address");
  });

  function fetchAddress() {
    console.log("dbdjdbdbdb");
    dispatch(requestAddress())
      .then(async (result: any) => {
        setAddress(result.payload.address);
      })
      .catch((err: any) => console.log(err));
  }

  const [receipt, setReceipt] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(false);
  };

  function showReceipt(
    time: any,
    amount: any,
    identifierId: any,
    betId: any,
    status: any,
    type: any,
    momoName: any,
    momoNumber: any,
    withdrawalCode: any
  ) {
    setIsVisible(true);
    setReceipt({
      time,
      amount,
      identifierId,
      betId,
      status,
      type,
      momoName,
      momoNumber,
      withdrawalCode,
    });
  }

  // <TouchableOpacity onPress={() => dispatch(fetchData())}></TouchableOpacity>;

  //animation adverts
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const slidesRef = useRef<any>(null);
  const {width} = useWindowDimensions();
  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef?.current?.scrollToIndex({index: currentIndex + 1});
    } else if (currentIndex === slides.length - 1) {
      slidesRef?.current?.scrollToIndex({index: 0});
    } else {
      console.log("Last item.");
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     scrollTo();
  //   }, 2000);
  // }, [scrollTo]);

  // Function to copy text to clipboard in React Native
  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setString(text);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  //FOR TOAstNotification
  const [show, setShow] = useState(0);
  function displayNotification(textToCopy: any) {
    copyToClipboard(textToCopy);
    setShow(1);
    triggerHapticFeedback();
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }

  function displayNotification2() {
    setShow(2);
    triggerHapticFeedback();
    setTimeout(() => {
      setShow(0);
    }, 3800);
  }

  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  useEffect(() => {
    console.log(data);
    setTimeout(() => {
      displayNotification2();
    }, 200);
  }, []);

  const {backgroundColor, color, displayNotificationIn, notification, show2} =
    useNotification();

  const [state, setState] = useState(1);

  // const [data, setData] = useState([...Array(20).keys()]);
  //   const loadMoreData = () => {
  //       if (loading) return;

  //       setLoading(true);
  //       setTimeout(() => {
  //           // Simulate fetching data and then append it
  //           const moreData =
  //               data.length +
  //               [...Array(20).keys()].map((i) => i + data.length);
  //           setData(data.concat(moreData));
  //           setLoading(false);
  //       }, 2000); // simulate network request delay
  //   };

  return state === 2 ? (
    <></>
  ) : (
    // <View
    //     style={{
    //         flex: 1,
    //         backgroundColor: Colors.background,
    //     }}
    // >
    //     <StatusBar backgroundColor={Colors.background} />
    //     <ExploreHeader
    //         displayNotification={displayNotification}
    //         props={props}
    //     />
    //     <ToastNotification
    //         show={show === 0 ? true : false}
    //         text={
    //             show === 1
    //                 ? `${languageText.text43} ${data.betId}`
    //                 : `${languageText.text48}`
    //         }
    //         textColor={Colors.toastText}
    //         backgroundColor={Colors.default1}
    //         marginTop={Platform.OS === "ios" ? 0 : 0}
    //         icon={
    //             <AntDesign
    //                 name="checkcircleo"
    //                 size={40}
    //                 color={Colors.toastText}
    //             />
    //         }
    //     />
    //     {!data ? (
    //         <View style={styles.container3}>
    //             <Spinner
    //                 visible={loading}
    //                 textContent={"Loading..."}
    //                 textStyle={{ color: "#FFF" }}
    //             />
    //         </View>
    //     ) : (
    //         <ScrollView
    //             style={{ paddingLeft: 5, paddingRight: 5, flex: 1 }}
    //         >
    //             <View style={styles.container2}>
    //                 <Text
    //                     style={[styles.xxxx, { color: Colors.welcomeText }]}
    //                 >
    //                     {languageText.text44},&nbsp;{" "}
    //                     {data?.fullname?.trim().split(" ")[0]}
    //                 </Text>

    //                 <Image
    //                     source={require("../assets/images/wavingHand.png")}
    //                     style={{ width: 24, height: 24 }}
    //                 />
    //             </View>
    //             <View style={styles.container}>
    //                 <TouchableOpacity
    //                     style={{
    //                         display: "flex",
    //                         flexDirection: "column",
    //                         justifyContent: "center",
    //                         backgroundColor: Colors.default3,
    //                         borderColor: Colors.default1,
    //                         borderWidth: 1.3,
    //                         borderRadius: 7,
    //                         position: "relative",
    //                         width: "100%",
    //                         height: 40,
    //                         paddingHorizontal: 10,
    //                         marginTop: 0,
    //                         alignItems: "center",
    //                         marginBottom: 5,
    //                     }}
    //                 >
    //                     <View
    //                         style={{
    //                             display: "flex",
    //                             flexDirection: "row",
    //                             justifyContent: "center",
    //                             alignItems: "center",
    //                             width: "100%",
    //                         }}
    //                     >
    //                         <View
    //                             style={{
    //                                 width: 40,
    //                                 alignItems: "center",
    //                             }}
    //                         >
    //                             <FontAwesome
    //                                 name="assistive-listening-systems"
    //                                 size={20}
    //                                 color={Colors.welcomeText}
    //                             />
    //                         </View>

    //                         <MarqueeText
    //                             text={languageText.text229}
    //                             textStyle={{
    //                                 fontSize: 16,
    //                                 fontWeight: "700",
    //                                 color: Colors.welcomeText,

    //                                 alignSelf: "center",
    //                             }}
    //                             containerStyle={{
    //                                 width: "85%",
    //                                 alignItems: "center",
    //                             }}
    //                         />
    //                         <View
    //                             style={{
    //                                 width: 40,
    //                             }}
    //                         ></View>
    //                     </View>
    //                 </TouchableOpacity>

    //                 <Display
    //                     props={props}
    //                     title={
    //                         languageText.text45
    //                         //  "Deposit"
    //                     }
    //                     total={totalPendingDepositAmount}
    //                     term={1}
    //                     count={pendingDeposits?.length}
    //                     style={{
    //                         color: "white",
    //                         color2: "white",
    //                         color3: Colors.default1,
    //                         background: Colors.default1,
    //                         icon: (
    //                             <MaterialCommunityIcons
    //                                 name="piggy-bank-outline"
    //                                 size={18}
    //                                 color={Colors.primary1}
    //                             />
    //                         ),
    //                     }}
    //                 />
    //                 <Display
    //                     props={props}
    //                     term={2}
    //                     title={
    //                         languageText.text46
    //                         //  "Withdraw"
    //                     }
    //                     count={pendingWithdrawals?.length}
    //                     total={totalPendingWithdrawalAmount}
    //                     style={{
    //                         color: "white",
    //                         color2: "rgba(256, 256, 256, 0.5)",
    //                         color3: "rgba(256, 256, 256, 1)",
    //                         // background: "rgba(256, 256, 256, .07)",
    //                         background: "rgba(120, 120, 120, 1)",
    //                         icon: (
    //                             <FontAwesome6
    //                                 name="circle-dollar-to-slot"
    //                                 size={18}
    //                                 color={Colors.primary1}
    //                             />
    //                         ),
    //                     }}
    //                 />
    //             </View>
    //             {/* For Adverts*/}
    //             {/* <View style={styles.container4}>
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: Colors.background,
    //       }}
    //     >
    //       <FlatList
    //         renderItem={({item}) => <AdvertItem item={item} />}
    //         data={slides}
    //         horizontal
    //         showsHorizontalScrollIndicator={false}
    //         pagingEnabled={true}
    //         bounces={false}
    //         keyExtractor={(item) => item.id}
    //         onScroll={Animated.event(
    //           [{nativeEvent: {contentOffset: {x: scrollX}}}],
    //           {useNativeDriver: false}
    //         )}
    //         scrollEventThrottle={32}
    //         onViewableItemsChanged={viewableItemsChanged}
    //         viewabilityConfig={viewConfig}
    //         ref={slidesRef}
    //       />
    //     </View>
    //     <Paginator data={slides} scrollX={scrollX} />
    //   </View> */}

    //             <TransactionTemplate
    //                 props={props}
    //                 navigation={navigation}
    //                 title={{
    //                     name: languageText.text50,
    //                     // "Recent Activities"
    //                     icon: (
    //                         <MaterialIcons
    //                             name="history"
    //                             size={20}
    //                             color={Colors.welcomeText}
    //                         />
    //                     ),
    //                 }}
    //                 select={{
    //                     firstSelect: { big: "Voir tout", small: "Tout" },
    //                     secondSelect: {
    //                         big: "Voir les Dépôts",
    //                         small: "Dépôts",
    //                     },
    //                     thirdSelect: {
    //                         big: "Afficher les Retraits",
    //                         small: "Retraits",
    //                     },
    //                 }}
    //                 totalWithdrawals={totalWithdrawals}
    //                 totalDeposits={totalDeposits}
    //                 data={data?.transactionHistory}
    //                 allData={data}
    //                 showReceipt={showReceipt}
    //                 homeState={state}
    //                 setHomeState={setState}
    //             />
    //         </ScrollView>
    //     )}
    // </View>
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <StatusBar backgroundColor={Colors.background} />
      <ToastNotification
        show={show === 0 ? true : false}
        text={
          show === 1
            ? `${languageText.text43} ${data.betId}`
            : `${languageText.text48}`
        }
        textColor={Colors.toastText}
        backgroundColor={Colors.default1}
        marginTop={Platform.OS === "ios" ? 0 : 0}
        icon={
          <AntDesign name='checkcircleo' size={40} color={Colors.toastText} />
        }
      />
      <ToastNotification
        show={show2}
        text={notification.text}
        textColor={color}
        marginTop={Platform.OS === "ios" ? 0 : 0}
        backgroundColor={backgroundColor}
        icon={notification.icon}
      />

      <ExploreHeader
        displayNotification={displayNotification}
        navigation={navigation}
        props={props}
      />

      {!data ? (
        <View style={styles.container3}>
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{color: "#FFF"}}
          />
        </View>
      ) : (
        <View
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            flex: 1,
          }}
        >
          <View style={styles.container2}>
            <Text style={[styles.xxxx, {color: Colors.welcomeText}]}>
              {languageText.text44},&nbsp;{" "}
              {data?.fullname?.trim().split(" ")[0]}
            </Text>

            <Image
              source={require("../assets/images/wavingHand.png")}
              style={{width: 24, height: 24}}
            />
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: Colors.default3,
                borderColor: Colors.default1,
                borderWidth: 1.3,
                borderRadius: 7,
                position: "relative",
                width: "100%",
                height: 40,
                paddingHorizontal: 10,
                marginTop: 0,
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: 40,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name='assistive-listening-systems'
                    size={20}
                    color={Colors.welcomeText}
                  />
                </View>
                {address && (
                  <MarqueeText
                    text={
                      currentLanguage === "english"
                        ? address.marqueTextEng
                        : address.marqueTextFRC
                    }
                    textStyle={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: Colors.welcomeText,

                      alignSelf: "center",
                    }}
                    containerStyle={{
                      width: "85%",
                      alignItems: "center",
                    }}
                  />
                )}

                <View
                  style={{
                    width: 40,
                  }}
                ></View>
              </View>
            </TouchableOpacity>

            <Display
              props={props}
              title={
                languageText.text360
                //  "Deposit"
              }
              title2={
                languageText.text361
                //  "Deposit"
              }
              total={totalPendingDepositAmount}
              term={1}
              count={pendingDeposits?.length}
              style={{
                color: "white",
                color2: "white",
                color3: Colors.default1,
                background: Colors.default1,
                icon: (
                  <MaterialCommunityIcons
                    name='piggy-bank-outline'
                    size={18}
                    color={Colors.primary1}
                  />
                ),
              }}
            />
            <Display
              props={props}
              term={2}
              title={
                languageText.text359
                //  "Withdraw"
              }
              title2={
                languageText.text362
                //  "Deposit"
              }
              count={pendingWithdrawals?.length}
              total={totalPendingWithdrawalAmount}
              style={{
                color: "white",
                color2: "rgba(256, 256, 256, 0.5)",
                color3: "rgba(256, 256, 256, 1)",
                // background: "rgba(256, 256, 256, .07)",
                background: "rgba(120, 120, 120, 1)",
                icon: (
                  <FontAwesome6
                    name='circle-dollar-to-slot'
                    size={18}
                    color={Colors.primary1}
                  />
                ),
              }}
            />
          </View>
          {/* For Adverts*/}
          {/* <View style={styles.container4}>
            <View
              style={{
                flex: 1,
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

          <TransactionTemplate2
            props={props}
            navigation={navigation}
            title={{
              name: languageText.text50,
              // "Recent Activities"
              icon: (
                <MaterialIcons
                  name='history'
                  size={20}
                  color={Colors.welcomeText}
                />
              ),
            }}
            select={{
              firstSelect: {
                big: "Voir tout",
                small: "Tout",
              },
              secondSelect: {
                big: "Voir les Dépôts",
                small: "Dépôts",
              },
              thirdSelect: {
                big: "Afficher les Retraits",
                small: "Retraits",
              },
            }}
            totalWithdrawals={totalWithdrawals}
            totalDeposits={totalDeposits}
            data={data?.transactionHistory}
            allData={data}
            showReceipt={showReceipt}
          />

          {/* <Text
                            style={{
                                width: "100%",
                                fontSize: 19,
                                fontWeight: "bold",
                                marginLeft: 12,
                                color: Colors.welcomeText,
                            }}
                        >
                            Posts
                        </Text>
                        <FollowingTab2
                            displayNotificationIn={displayNotificationIn}
                        /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
        paddingHorizontal: 10,
        backgroundColor: "transparent",
        borderRadius: 8,
        minHeight: 100,
        flex: 1,
    },
    container2: {
        display: "flex",
        gap: 10,
        padding: 10,
        borderRadius: 8,

        height: 45,
        flexDirection: "row",
        alignItems: "center",
    },
    container3: {
        display: "flex",
        borderRadius: 8,
        flex: 1,
    },
    xxxx: {
        fontWeight: "800",

        fontSize: 20,
    },
    container4: {
        alignSelf: "center",
        height: 80,
        position: "relative",
        marginBottom: 10,
        paddingHorizontal: 10,
        width: "100%",
        borderRadius: 12,
    },
});

export default Home;

//  <Text style={{}}>Home</Text>
//       <Link href={"/(modals)/login"}>login</Link>

//       <Link href={"/listing/37"}>Listing details</Link>
//       <Link href={"/(modals)/booking"}>booking</Link>
//       <Link href={"/(modals)/profile"}>profile</Link>
