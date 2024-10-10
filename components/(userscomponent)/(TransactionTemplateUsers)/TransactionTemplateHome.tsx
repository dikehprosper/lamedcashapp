/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {useState, useEffect} from "react";
import TransactionResults from "@/components/(userscomponent)/(TransactionTemplateUsers)/(TransactionResults)/TransactionResults";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
// import data1 from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
// const data = data1[0].transactionHistory;
const screenHeight = Dimensions.get("window").height;
import {Color} from "@/constants/Colors";
import PopInAnimation from "@/components/(Utils)/AnimatedContent";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Language } from "@/constants/languages";

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
    homeState,
    setHomeState,
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

    return (
        <View
            style={[
                styles.transaction_template_container,
                { backgroundColor: Colors.background },
            ]}
        >
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
                showsVerticalScrollIndicator={false}
                style={styles.transaction_template_container_body}
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
                                            marginTop: 10,
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
                {homeState === 1 && (
                    <TouchableOpacity
                        onPress={() => setHomeState(2)}
                        style={{
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.welcomeText,
                                fontWeight: "800",
                                // opacity: 0.8,
                                textDecorationColor: "white",
                                fontSize: 19,
                            }}
                        >
                            {languageText.text265}
                            {/* See More Data*/}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    transaction_template_container: {
        gap: 10,
        padding: 10,
        borderRadius: 10,
        marginTop: 7,
        alignSelf: "center",
        width: "100%",
        minHeight: 100,
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

        flexDirection: "column",
        gap: 5,
        paddingBottom: 5,
        minHeight: 100,
    
    },
    xxx: {
        color: "white",
    },
});

export default TransactionTemplate;



 


//   <View style={styles.transaction_template_container_header}>
//       <View style={styles.transaction_template_container_header_1}>
//           <View style={styles.transaction_template_container_header_1_1}>
//               <Text
//                   style={{
//                       color: Colors.welcomeText,
//                       fontWeight: "900",
//                       opacity: 0.8,
//                       // marginLeft: 6,
//                       fontSize: 18,
//                   }}
//               >
//                   {title.name}
//               </Text>
//               <View>{title.icon}</View>
//           </View>
//           <TouchableOpacity
//               onPress={() => props.navigation.push("transactions")}
//           >
//               <Text
//                   style={{
//                       color: Colors.welcomeText,
//                       fontWeight: "500",
//                       // opacity: 0.8,
//                       textDecorationColor: "white",
//                       fontSize: 17,
//                   }}
//               >
//                   {languageText.text51}
//                   {/* See more */}
//               </Text>
//           </TouchableOpacity>
//       </View>
//   </View>;
