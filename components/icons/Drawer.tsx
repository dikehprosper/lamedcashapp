/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

const Drawer = ({ color, onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                    d="M4 6H20M4 12H12M4 18H20"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    );
};

export default Drawer;
