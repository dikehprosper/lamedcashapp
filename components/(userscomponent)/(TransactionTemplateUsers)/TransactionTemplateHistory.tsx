/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import TransactionResults from "@/components/(userscomponent)/(TransactionTemplateUsers)/(TransactionResults)/TransactionResults";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SectionList,
    RefreshControl,
} from "react-native";
import { Color } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import LottieView from "lottie-react-native";
import Moment from "moment";
import { Language } from "@/constants/languages";
import { getUpdatedData, verifyUserPin } from "@/state/userData/getUserData";
interface Payload {
    email: string;
}
const TransactionTemplate = ({
    props,
    navigation,
    title,
    select,
    totalWithdrawals,
    totalDeposits,
    // data,
    allData,
    showReceipt,
}: any) => {
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
    const dispatch = useDispatch<AppDispatch>();
    const categories = [
        {
            name: languageText.text63,
            // "All"
        },
        {
            name: languageText.text62,
            // "Completed"
        },
        {
            name: languageText.text64,
            // "Cancelled"
        },
    ];
        // For table slider header
        const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
        const [activeIndex, setActiveIndex] = useState(0);
        const selectCategory = (index: number) => {
            setActiveIndex(index);
        };

        const renderTransactionsByDate = (transactions: any, props: any) => {
            const transactionsByDate: any = {};

            transactions.forEach((transaction: any) => {
                const date = formatSortDate(transaction.registrationDateTime);
                if (!transactionsByDate[date]) {
                    transactionsByDate[date] = [];
                }
                transactionsByDate[date].push(transaction);
            });

            const restructuredData: any = [];

            Object.keys(transactionsByDate)
                .sort((a, b) => Moment(b).diff(Moment(a))) // Sort dates in descending order
                .forEach((date) => {
                    // Sort transactions within the same date by time in descending order
                    const sortedTransactions = transactionsByDate[date].sort(
                        (a: any, b: any) => {
                            return Moment(b.registrationDateTime).diff(
                                Moment(a.registrationDateTime),
                            );
                        },
                    );
                    restructuredData.push({
                        date: date,
                        data: sortedTransactions,
                    });
                });


               const [refreshing, setRefreshing] = useState(false);
                const onRefresh = () => {
                    setRefreshing(true);
                     const payload: Payload = {
                       email: data.email,
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


            return (
                <SectionList
                    keyExtractor={(item, index) => item._id || index.toString()}
                    stickySectionHeadersEnabled={true}
                    sections={restructuredData}
                    renderItem={({ item }) => (
                        <TransactionResults
                            time={item.registrationDateTime}
                            totalAmount={item.totalAmount}
                            receipt={item._id}
                            betId={item.betId}
                            status={item.status}
                            type={item.fundingType}
                            withdrawalCode={item.withdrawalCode}
                            momoName={item.momoName}
                            momoNumber={item.momoNumber}
                            identifierId={item.identifierId}
                            senderName={item.senderName}
                            recipientTag={item.recipientTag}
                            amount={item.amount}
                            bonusBalance={item.bonusBalance}
                            customErrorCode={item.customErrorCode}
                            paymentConfirmation={item.paymentConfirmation}
                            service={item.service}
                            props={props}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    renderSectionHeader={({ section }) => (
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                color: Colors.welcomeText,
                                backgroundColor: Colors.background,
                                paddingBottom: 10,
                                paddingTop: 15,
                                marginBottom: 5,
                            }}
                        >
                            {Moment(section.date).format("DD MMM, YYYY")}
                        </Text>
                    )}
                    SectionSeparatorComponent={() => (
                        <View style={{ height: 5 }} />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#ff00ff"]} // Optional: define the spinner color, default is blue
                        />
                    }
                />
            );
        };

    const filterTransactions = (transactions: any[]) => {
        if (activeIndex === 0) {
            // "All" category selected
            return transactions;
        } else if (activeIndex === 1) {
            // "Completed" category selected
            return transactions.filter(
                (entry: { status: string }) => entry.status === "Successful",
            );
        } else if (activeIndex === 2) {
            // "Cancelled" category selected
            return transactions.filter(
                (entry: { status: string }) => entry.status === "Failed",
            );
        }
    };

    const finalData = filterTransactions(data?.transactionHistory)!;
    

    return (
        <View
            style={[
                styles.transaction_template_container,
                { backgroundColor: Colors.transactionTemplateBackground },
            ]}
        >
            <View style={styles.transaction_template_container_header}>
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
                        {title.icon}
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: Colors.welcomeText,
                            fontWeight: "600",
                            opacity: 0.8,
                            fontSize: 18,
                        }}
                    >
                        {title.name}
                    </Text>
                    <View>
                        {/* {title.icon2} */}
                        </View>
                </View>
                <ScrollView
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                        gap: 12,
                        paddingHorizontal: 16,
                        flex: 1,
                        marginBottom: 1,
                    }}
                >
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={
                                activeIndex === index
                                    ? [
                                          styles.categoriesBtnActive,
                                          {
                                              borderBottomColor:
                                                  Colors.welcomeText,
                                          },
                                      ]
                                    : styles.categoriesBtn
                            }
                            ref={(el) => (itemsRef.current[index] = el)}
                            onPress={() => selectCategory(index)}
                        >
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    opacity: activeIndex === index ? 1 : 0.6,
                                    fontWeight: "900",
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View
                style={[
                    styles.transaction_template_container_body,
                    {
                        backgroundColor:
                            Colors.transactionTemplateBackgroundinner,
                    },
                ]}
            >
                {!data?.transactionHistory ? (
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
                                    justifyContent: "flex-start",
                                    minHeight: 100,
                                    paddingTop: 20,
                                    position: "relative",
                                },
                            ]}
                        >
                            <LottieView
                                source={require("../../../assets/images/emptyTransaction.json")}
                                style={{
                                    width: 270,
                                    height: 330,
                                }}
                                autoPlay
                                loop
                            />
                            <Text
                                style={{
                                    color: Colors.welcomeText,
                                    fontWeight: "900",
                                    width: "70%",
                                    opacity: 0.5,
                                    textAlign: "center",
                                    position: "absolute",
                                    top: 305,
                                }}
                            >
                                Vous n'avez aucune transaction récente
                            </Text>
                        </View>
                    </PopInAnimation>
                ) : (
                    <View style={styles.transaction_template_container_body1}>
                        {data?.transactionHistory.length > 0 ? (
                            renderTransactionsByDate(finalData, props)
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
                                            justifyContent: "flex-start",
                                            minHeight: 100,
                                            paddingTop: 20,
                                        },
                                    ]}
                                >
                                    <LottieView
                                        source={require("../../../assets/images/emptyTransaction.json")}
                                        style={{
                                            width: 270,
                                            height: 330,
                                            position: "relative",
                                        }}
                                        autoPlay
                                        loop
                                    />
                                    <Text
                                        style={{
                                            color: Colors.welcomeText,
                                            fontWeight: "900",
                                            width: "70%",
                                            opacity: 0.5,
                                            textAlign: "center",
                                            position: "absolute",
                                            top: 305,
                                        }}
                                    >
                                        Vous n'avez aucune transaction récente
                                    </Text>
                                </View>
                            </PopInAnimation>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    transaction_template_container: {
        display: "flex",
        gap: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,

        flex: 1,
        marginTop: 7,
        alignSelf: "center",
        width: "100%",
        overflow: "hidden",
        // flexDirection: "column",
        // borderRadius: 10,
        // gap: 20,
        // padding: 8,
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
        fontSize: 14,
        fontWeight: "700",
        gap: 12,
        flexDirection: "row",
        marginBottom: 20,
        paddingLeft: 8,
        paddingRight: 8,
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
        // overflow: "hidden",
        flex: 1,
        position: "relative",
    },
    transaction_template_container_body1: {
        display: "flex",
        flex: 1,
        width: "100%",
        flexDirection: "column",
        gap: 12,
    },
    xxx: {
        color: "white",
    },
    categoriesBtnActive: {
        borderBottomWidth: 3,

        display: "flex",
        alignItems: "center",
        paddingBottom: 12,
        flex: 1,
        borderRadius: 4,
    },
    categoriesBtn: {
        display: "flex",
        alignItems: "center",
        paddingBottom: 12,
        flex: 1,
        borderBottomWidth: 3,
        borderBottomColor: "rgba(128, 128, 128, .5)",
        borderRadius: 4,
    },
});

export default TransactionTemplate;
const formatSortDate = (inputDate: any) => {
    const Moment = require("moment"); // Assuming CommonJS, adjust if using ES6 imports
    return Moment(inputDate).format("YYYY-MM-DD"); // Ensure this is for sorting
};
