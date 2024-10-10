/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { Color } from "@/constants/Colors";
import BonusListTransaction from "@/components/(receipt)/bonusListTransaction";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import Moment from "moment";

const WalletHistory = ({ navigation }: any) => {
    const transactionsByDate: { [key: string]: any[] } = {};
    const data = useSelector((state: RootState) => state.getUserData.data);
      const colorScheme = useSelector(
          (state: RootState) => state.getUserData.colorScheme,
      );
      const Colors =
          parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const post = data.transactionHistory.filter(
        (transaction: any) => "bonusBalance" in transaction,
    );

    post.forEach((transaction: any) => {
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

    return (
        <View
            style={{
                backgroundColor: Colors.background,
                flex: 1,
                paddingBottom: 10,
            }}
        >
            <View
                style={[
                    styles.container3,
                    { backgroundColor: Colors.background },
                ]}
            >
                {/* <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={post}
          renderItem={({item}) => <Post post={item} />}
        /> */}

                <SectionList
                    keyExtractor={(item: { _id: any }) => item._id}
                    stickySectionHeadersEnabled={true}
                    sections={restructuredData}
                    renderItem={({ item }) => {
                        return (
                            <BonusListTransaction
                                specificData={item}
                                navigation={navigation}
                            />
                        );
                    }}
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
                                marginBottom: 10,
                            }}
                        >
                            {section.date}
                        </Text>
                    )}
                    SectionSeparatorComponent={() => (
                        <View style={{ height: 7 }}></View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container3: {
        paddingHorizontal: 15,
    },
    transaction_result: {
        gap: 8,
        display: "flex",
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 3,
        paddingHorizontal: 15,
    },
    actionRow: {
        flexDirection: "row",
        margin: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    overallactionRow_2: {
        display: "flex",
        flexDirection: "row",
        gap: 7,
    },
    actionRow_2: {
        flexDirection: "row",
        display: "flex",
        width: "auto",
        alignItems: "center",
        textAlign: "auto",
        borderRadius: 4,
        height: 23,
    },
    actionRow_2_background1: {
        display: "flex",
        paddingLeft: 6,
        height: 23,
        paddingRight: 6,
        flexDirection: "row",
        alignItems: "center",
        borderTopStartRadius: 4,
        borderBottomLeftRadius: 4,
    },
    actionRow_2_text1: {
        // fontFamily: "mon-b",
        fontWeight: "900",
    },
    actionRow_2_background2: {
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 15,

        borderWidth: 1.7,
    },
    actionRow_2_text2: {
        alignSelf: "center",
        transform: [{ rotate: "90deg" }],
    },
    imageProfile: {
        width: 84,
        height: 25,
    },
    NotificationBox: {
        padding: 2.5,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 4,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    small_device_group: {
        display: "flex",
        flex: 1,
        gap: 3,
        flexDirection: "column",
        justifyContent: "center",
        // backgroundColor: "red",
        // whiteSpace: 'nowrap'
    },
});

export default WalletHistory;

const formatSortDate = (inputDate: any) => {
    const Moment = require("moment"); // Assuming CommonJS, adjust if using ES6 imports
    return Moment(inputDate).format("YYYY-MM-DD"); // Ensure this is for sorting
};
