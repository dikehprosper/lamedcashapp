/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import TransactionResults from "@/components/(userscomponent)/(TransactionTemplateUsers)/(TransactionResults)/TransactionResults";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
// import data1 from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
// const data = data1[0].transactionHistory;
const screenHeight = Dimensions.get("window").height;
import { Color } from "@/constants/Colors";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Language } from "@/constants/languages";
import { getUpdatedData } from "@/state/userData/getUserData";

interface Payload {
    email: string;
}

// Calculate the percentage value
const percentageHeight = screenHeight * 0.3;
const TransactionTemplate = ({
    props,
    navigation,
    title,
    select,
    totalWithdrawals,
    totalDeposits,
    data,
    allData,
    showReceipt,
}: any) => {
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

    const [state, setState] = useState(select.firstSelect.big);
    const [viewMore, setStateViewMore] = useState<boolean>();
    const [height, setHeight] = useState(0);

    function adjustHeight() {
        setHeight((prev): any => {
            if (prev === 0) {
                return "auto";
            } else {
                return 0;
            }
        });
    }
    const state2 = {
        param1: state,
    };

    useEffect(() => {
        // Save state to localStorage whenever it changes
        // localStorage.setItem("transactionTemplateState", JSON.stringify(state));

        if (state === select.firstSelect.big) {
            setStateViewMore(data?.length > 3);
        } else if (state === select.secondSelect.big) {
            setStateViewMore(
                data?.filter(
                    (item: { fundingType: string }) =>
                        item.fundingType === "deposits",
                ).length > 3,
            );
        } else if (state === select.thirdSelect.big) {
            setStateViewMore(
                data?.filter(
                    (item: { fundingType: string }) =>
                        item.fundingType === "withdrawals",
                ).length > 3,
            );
        }
    }, [state, data]);

    // const [lastScrollY, setLastScrollY] = useState(0);

    // const handleScroll = ({ nativeEvent }: any) => {
    //     const currentScrollY = nativeEvent.contentOffset.y;
    //     if (
    //         currentScrollY > lastScrollY &&
    //         currentScrollY + nativeEvent.layoutMeasurement.height >=
    //             nativeEvent.contentSize.height - 20
    //     ) {
    //         props.navigation.navigate("Community");
    //         //  loadMoreData();
    //     }
    //     setLastScrollY(currentScrollY);
    // };

    const dispatch = useDispatch<AppDispatch>();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        const payload: Payload = {
            email: allData.email,
        };

        dispatch(getUpdatedData(payload))
            .then(async (result: any) => {
                console.log(result.payload.success, "vjhdcjhvjkkkkkkk");
                // if (result.payload.success === true) {
                //     try {
                //         await AsyncStorage.setItem(
                //             "token",
                //             result.payload.token,
                //         );
                //         navigation.dispatch(
                //             CommonActions.reset({
                //                 index: 0,
                //                 routes: [{ name: "MainNavigator" }],
                //             }),
                //         );
                //         setTimeout(() => {
                //             setLoading(false);
                //         }, 100);
                //     } catch (err) {
                //         console.log(err);
                //     }
                // }
                setRefreshing(false);
            })
            .catch((err: any) => {
                setRefreshing(false);
            })
            .finally(() => {
                setRefreshing(false);
            });
    };


      const [loading, setLoading] = useState(false);

     let previousScrollOffset = 0; // Keep track of the previous scroll position

     const handleScroll = ({nativeEvent}: any) => {
       const currentScrollOffset = nativeEvent.contentOffset.y;

       // Check if the user is scrolling up
       if (currentScrollOffset < previousScrollOffset) {
         // The user is scrolling up
         if (
           nativeEvent.layoutMeasurement.height + currentScrollOffset >=
           nativeEvent.contentSize.height - 20
         ) {
           loadMoreData();
         }
       }

       // Update the previous scroll position
       previousScrollOffset = currentScrollOffset;
     };

     const loadMoreData = () => {
       if (loading) return;
       setLoading(true);
       setTimeout(() => {
         props.navigation.navigate("Community");
         setLoading(false);
       }, 300); // simulate network request delay
     };


    return (
        <View style={[styles.transaction_template_container, {}]}>
            <View style={styles.transaction_template_container_header}>
                <View style={styles.transaction_template_container_header_1}>
                    <View
                        style={styles.transaction_template_container_header_1_1}
                    >
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontWeight: "900",
                                opacity: 0.8,
                                // marginLeft: 6,
                                fontSize: 18,
                            }}
                        >
                            {title.name}
                        </Text>
                        <View>{title.icon}</View>
                    </View>
                    <TouchableOpacity
                        onPress={() => props.navigation.push("transactions")}
                    >
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontWeight: "500",
                                // opacity: 0.8,
                                textDecorationColor: "white",
                                fontSize: 17,
                            }}
                        >
                            {languageText.text51}
                            {/* See more */}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#ff00ff"]} // Optional: define the spinner color, default is blue
                    />
                }
                showsVerticalScrollIndicator={false}
                // onScroll={handleScroll}
                scrollEventThrottle={400}
                style={styles.transaction_template_container_body}
                onScroll={handleScroll}
              
            >
                {!data ? (
                    <PopInAnimation
                        scaleSpeed={0.4}
                        opacitySpeed={950}
                        style={{
                            position: "relative",
                            minHeight: 100,
                            flex: 1,
                        }}
                    >
                        <View
                            style={[
                                styles.transaction_template_container_body1,
                                {
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    minHeight: 100,
                                    paddingTop: 20,
                                },
                            ]}
                        >
                            <LottieView
                                source={require("../../../assets/images/emptyTransaction.json")}
                                style={{ width: 240, height: 270 }}
                                autoPlay
                                loop
                            />
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    marginTop: 30,
                                    fontWeight: "900",
                                    width: "40%",
                                    opacity: 0.5,
                                    textAlign: "center",
                                }}
                            >
                                {languageText.text52}
                                {/* You have no recent transactions */}
                            </Text>
                        </View>
                    </PopInAnimation>
                ) : (
                    <View style={styles.transaction_template_container_body1}>
                        {data?.length > 0 ? (
                            data
                                ?.slice()
                                .reverse()
                                .slice(0, 3)
                                .map((data: any, index: any) => (
                                    <TransactionResults
                                        key={index}
                                        time={data.registrationDateTime}
                                        totalAmount={data.totalAmount}
                                        receipt={data._id}
                                        betId={data.betId}
                                        status={data.status}
                                        type={data.fundingType}
                                        recipientTag={data.recipientTag}
                                        bonusBalance={data.bonusBalance}
                                        amount={data.amount}
                                        withdrawalCode={data.withdrawalCode}
                                        momoName={data.momoName}
                                        customErrorCode={data.customErrorCode}
                                        momoNumber={data.momoNumber}
                                        identifierId={data.identifierId}
                                        senderName={data.senderName}
                                        paymentConfirmation={
                                            data.paymentConfirmation
                                        }
                                        service={data.service}
                                        props={props}
                                    />
                                ))
                        ) : (
                            <PopInAnimation
                                scaleSpeed={0.4}
                                opacitySpeed={950}
                                style={{
                                    position: "relative",
                                    minHeight: 100,
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={[
                                        styles.transaction_template_container_body1,
                                        {
                                            alignItems: "center",
                                            justifyContent: "space-evenly",
                                            minHeight: 100,
                                            paddingTop: 20,
                                        },
                                    ]}
                                >
                                    <LottieView
                                        source={require("../../../assets/images/emptyTransaction.json")}
                                        style={{ width: 240, height: 270 }}
                                        autoPlay
                                        loop
                                    />
                                    <Text
                                        style={{
                                            color: Colors.welcomeText,

                                            fontWeight: "900",
                                            width: "40%",
                                            opacity: 0.5,
                                            textAlign: "center",
                                        }}
                                    >
                                        {languageText.text52}
                                        {/* You have no recent transactions */}
                                    </Text>
                                </View>
                            </PopInAnimation>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    transaction_template_container: {
        flex: 1,
        gap: 10,
        padding: 10,
        borderRadius: 10,
        marginTop: 7,
        alignSelf: "center",
        width: "100%",
    },
    transaction_template_container_header: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: 10,
        padding: 2,
    },
    transaction_template_container_header_1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: "700",
        flexDirection: "row",
    },
    transaction_template_container_header_1_1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        gap: 12,
        flexDirection: "row",
    },
    transaction_template_container_header_2: {
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
        gap: 3,
        justifyContent: "flex-end",
    },
    transaction_template_container_header_2_div: {
        fontWeight: "500",
        fontSize: 11,
        display: "flex",
        alignItems: "center",
        gap: 5,
        color: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    transaction_template_container_header_2_span_1: {
        color: "#648900",
        fontSize: 10,
        fontWeight: "800",
    },
    transaction_template_container_header_2_span_2: {
        color: "#0076B8",
        fontSize: 10,
        fontWeight: "800",
    },
    transaction_template_container_header_2_span_3: {
        fontSize: 10,
    },
    transaction_template_container_body: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        flex: 1,
        position: "relative",
    },
    transaction_template_container_body1: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 5,
        paddingBottom: 5,
        height: 250,
    },
    xxx: {
        color: "white",
    },
});

export default TransactionTemplate;
