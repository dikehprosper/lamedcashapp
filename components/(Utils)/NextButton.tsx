/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {AntDesign} from "@expo/vector-icons";
import React from "react";
import {useRef, useEffect} from "react"
import {FaArrowCircleUp} from "react-icons/fa";
import {View, StyleSheet, TouchableOpacity, Animated} from "react-native";
import Svg, {G, Circle} from "react-native-svg";
import {Color} from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";


const NextButton = ({percentage, scrollTo} : any) => {
    const data = useSelector((state: RootState) => state.getUserData.data);
   const colorScheme = useSelector(
       (state: RootState) => state.getUserData.colorScheme,
   );
   const Colors =
       parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
    const size = 128;

    const strokeWidth = 3;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<any>(null);

    const animation = (toValue: any) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset =
                circumference - (circumference * value.value) / 100;
            if (progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        });
        return () => {
            progressAnimation.removeAllListeners();
        };
    }, [percentage]);

    return (
        <View
            style={[styles.container, { backgroundColor: Colors.background }]}
        >
            <Svg width={size} height={size} fill={Colors.background}>
                <G rotation="-90" origin={center}>
                    <Circle
                        stroke=""
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />

                    <Circle
                        ref={progressRef}
                        stroke={Colors.default1}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                    />
                </G>
            </Svg>
            <TouchableOpacity
                onPress={scrollTo}
                style={[styles.button, { backgroundColor: Colors.default1 }]}
                activeOpacity={0.6}
            >
                <AntDesign name="arrowright" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
 
    padding: 20,
    borderRadius: 100,
  },
});
export default NextButton;
