/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function Status({ width, height }: any) {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const SkeletonCommonProps = {
        colorMode: Colors === 2 ? "dark" : "light",
        transition: {
            type: "timing",
            timimg: 1000,
        },
    } as const;

    //   const image =
    //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

    return (
        <View
            style={[styles.container, { backgroundColor: Colors.background }]}
        >
            <Skeleton
                height={height}
                width={width}
                {...SkeletonCommonProps}
                show
            >
                <View
                    style={{
                        width: "100%",
                        height: 50,
                        backgroundColor: "red",
                        borderRadius: 2,
                        marginBottom: 7,
                    }}
                />
            </Skeleton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        // justifyContent: 'space-between',
        alignItems: "center",
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
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    descriptionText: {
        textAlign: "center",
        alignSelf: "center",
        lineHeight: 20,
        fontSize: 14,
        color: "#888", //Light gray color
    },
    button: {
        backgroundColor: "#4fa66a",
        padding: 10,
        borderRadius: 2,
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
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "orange",
    },
    copyButton: {
        marginLeft: 10,
    },
    copyIcon: {
        width: 20,
        height: 20,
    },
    referralCode: {
        flex: 1,
        fontSize: 16,
    },
    codeSection: {
        marginBottom: 30,
    },
});
