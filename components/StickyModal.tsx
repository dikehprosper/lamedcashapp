/* eslint-disable @typescript-eslint/no-explicit-any */
import { Color } from "@/constants/Colors";
import { RootState } from "@/state/store";
import React from "react";
import { Modal, View,  TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const StickyModal = ({
    visible,
    children,
    onClose,
    height = 80,
    width = "40%",
    top,
    navigation,
}: any) => {
    const onTouchInsideModal = () => {
        // This event handler can be left empty since clicking inside the modal should have no effect
    };

    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    return (
        <Modal visible={visible} transparent>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={{ flex: 1 }}
            >
                <View />
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 0.2,
                        position: "absolute",
                        right: 20,
                        borderRadius: 10,
                        backgroundColor: Colors.background,
                        padding: 10,
                        height,
                        width,
                        top,
                    }}
                    onPress={onTouchInsideModal}
                >
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, { navigation })
                    )}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default StickyModal;
