/* eslint-disable @typescript-eslint/no-var-requires */

import { generateHtmlContent } from "@/components/(Utils)/htmlTemplate";
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
const htmlContent = generateHtmlContent({
    _id: 10,
    betId: 50009999,
    bonusAmount: 200,
    depositName: "chioma folakeww",
    depositNumber: 38493833,
    isSubmitted: false,
    mainAmount: 400,
    number: 33333333,
    status: "Successful",
    time: "2024-04-19T13:24:00.000Z",
    totalAmount: 600,
    transactionId: "123456787654221132345678876",
    type: "deposits",
});


const Appss = () => {
    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={["*"]}
                source={{ html: htmlContent }}
                style={styles.webview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        width: 400,
        height: 350,
        alignSelf: "center",
    },
    webview: {
        flex: 1,
    },
});

export default Appss;
