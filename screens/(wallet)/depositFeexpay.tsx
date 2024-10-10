/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */

import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import React from "react";

export default function DepositFeexpay({ route }: any) {
    const url = route.params.url;
    const data = route.params.data;
    console.log(data, url, "gsbdz");

    const injectedJavaScript = `
        (function() {
            window.postMessage(${JSON.stringify(data)});
        })();
    `;

    return (
        <WebView
            style={styles.container}
            source={{ uri: url }}
            injectedJavaScript={injectedJavaScript}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
