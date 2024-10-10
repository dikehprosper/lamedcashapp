/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    ActivityIndicatorComponent,
    ActivityIndicator,
    ActivityIndicatorBase,
} from "react-native";

const DeleteconfirmationMessage = ({ visible, message }: any) => {
    const { height, width } = useWindowDimensions();
    return (
        visible && (
            <View style={[style.container, { height, width }]}>
                <View style={style.loader}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "700",
                            textAlign: "center",
                        }}
                    >
                        {message}
                    </Text>
                </View>
            </View>
        )
    );
};
const style = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        height: 130,
        backgroundColor: "white",
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 80,
        gap: 10,
        textAlign: "center",
        justifyContent: "center",
    },
});

export default DeleteconfirmationMessage;
