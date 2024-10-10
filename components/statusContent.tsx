/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { View, Text, StyleSheet, ScrollView, SectionList } from "react-native";
import {Color} from "@/constants/Colors";
import {FontAwesome} from "@expo/vector-icons";
import formatDate from "./(Utils)/formatDate";
import TransactionResults2 from "./(userscomponent)/(TransactionTemplateUsers)/(TransactionResults)/TransactionResults2";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Language } from "@/constants/languages";

export default function StatusContent({ referral }: any) {
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

    const data2 = referral;

    return data2.length > 0 ? (
        <View
            style={{
                height: "100%",
                backgroundColor: Colors.background,
                padding: 20,
            }}
        >
            {renderTransactionsByDate(data2, Colors)}
        </View>
    ) : (
        <View
            style={[styles.container, { backgroundColor: Colors.background }]}
        >
            <ScrollView style={{ height: "100%" }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        margin: 50,
                    }}
                >
                    <View>
                        <FontAwesome
                            name="share-square-o"
                            size={110}
                            color={Colors.default1}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    {/* MIddle Text */}
                    <View style={styles.topSection}>
                        <View style={styles.midText}>
                            <Text
                                style={[
                                    styles.referralText,
                                    { color: Colors.welcomeText },
                                ]}
                            >
                                {languageText.text308}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {languageText.text309}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 80,
                    }}
                ></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    justifyContent: "space-between",
    height: "100%",
  },
  header: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
  paragraphStyle: {
    fontSize: 16,
    lineHeight: 20,
    color: "#888", //Light gray color
  },
  topSection: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  midText: {
    // width: 100%,
    // display: row,
    alignItems: "center",
  },
  referralText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 19.5,
    fontWeight: "bold",
    marginBottom: 15,
   
  },
  descriptionText: {
    textAlign: "center",
    alignSelf: "center",
    lineHeight: 20,
    fontSize: 16,
    color: "#888", //Light gray color
  },
  button: {
    backgroundColor: "#4fa66a",
    padding: 14,
    borderRadius: 5,
    width: "100%", // Take up the entire width

    //  flexDirection: 'row',
    //  alignItems: 'center',
    //  justifyContent: 'space-between',
    //  padding: 15,
    //  backgroundColor: '#4CAF50',
    //  borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // White text
    textAlign: "center",
    fontWeight: "bold",
  },
  codeText: {
    fontSize: 14,

    marginBottom: 10,
    color: "#888", //Light gray color
  },
  codeContainer: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 17,
    borderWidth: 1.4,
    borderColor: "#4fa66a",
    width: "100%",
  },
  copyButton: {
    marginLeft: 10,
    // backgroundColor: '#f0c600', // Orange color as in the image
    color: "#4fa66a", // White text color
    fontSize: 12,
  },
  copyIcon: {
    width: 20,
    height: 20,
  },
  referralCode: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",

  },
  codeSection: {
    marginBottom: 50,
  },

  copyButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 36,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  copyButtonClick: {
    backgroundColor: "#f0c600", // Orange color as in the image
    color: "red", // White text color
    fontSize: 10, // Adjust font size as needed
  },
});

const renderTransactionsByDate = (transactions: any[], Colors: any) => {
  const transactionsByDate: {[key: string]: any[]} = {};

  transactions.forEach((transaction) => {
    const date = formatDate(transaction.time);
    console.log(date);
    if (!transactionsByDate[date]) {
      transactionsByDate[date] = [];
    }
    transactionsByDate[date].push(transaction);
  });

  const restructuredData = [];

  for (const date in transactionsByDate) {
    restructuredData.push({
      date: date,
      data: transactionsByDate[date],
    });
  }

  return (
    <SectionList
      keyExtractor={(item) => item._id}
      stickySectionHeadersEnabled={true}
      sections={restructuredData}
      renderItem={({item}) => {
        return (
          <TransactionResults2
            time={item.time}
            amount={item.amount}
            receipt={item._id}
            betId={item.betId}
            status={item.status}
            type={item.fundingType}
            withdrawalCode={item.withdrawalCode}
            name={item.fullname}
            momoNumber={item.momoNumber}
            identifierId={item.identifierId}
            image={item.image}
          />
        );
      }}
      showsVerticalScrollIndicator={false}
      renderSectionHeader={({section}) => (
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
      SectionSeparatorComponent={() => <View style={{height: 5}}></View>}
      ItemSeparatorComponent={() => <View style={{height: 11}}></View>}
    />
  );
};
