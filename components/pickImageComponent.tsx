/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {Color} from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const PickImageComponent = ({ onPress }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    return (
        <TouchableOpacity style={styles.modal} onPress={() => onPress(3)}>
            <View
                style={{
                    paddingHorizontal: 25,
                    paddingVertical: 45,
                    width: "65%",
                    maxHeight: "30%",
                    backgroundColor: Colors.inputBackground,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    borderRadius: 10,
                    gap: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => onPress(1)}
                    style={{
                        borderRadius: 30,
                        backgroundColor: Colors.background,
                        paddingVertical: 15,
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: Colors.welcomeText,
                        }}
                    >
                        Take Photo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onPress(2)}
                    style={{
                        borderRadius: 30,
                        borderColor: Colors.welcomeText,
                        borderWidth: 1.5,
                        paddingVertical: 15,
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            color: Colors.welcomeText,
                        }}
                    >
                        {" "}
                        Upload Photo
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    modal: {
        display: "flex",
        position: "absolute",
        zIndex: 1000000000000000000,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PickImageComponent;
