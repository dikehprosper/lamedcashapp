/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {View, StyleSheet} from "react-native";
import Svg, {Circle, Defs, LinearGradient, Stop} from "react-native-svg";

const CustomCircle = ({borderColor, gradientColors}: any) => {
  const radius = 100; // Adjust the radius as needed
  const strokeWidth = 10; // Adjust the border thickness as needed
  const centerX = radius + strokeWidth;
  const centerY = radius + strokeWidth;
  const visibleBorderPercentage = 0.65; // Border visible 75% through

  return (
    <View style={styles.container}>
      <Svg
        height={radius * 2 + strokeWidth * 2}
        width={radius * 2 + strokeWidth * 2}
      >
        <Defs>
          <LinearGradient id='grad' x1='0' y1='0' x2='1' y2='1'>
            <Stop offset='0' stopColor={gradientColors[0]} />
            <Stop offset='1' stopColor={gradientColors[1]} />
          </LinearGradient>
        </Defs>
        {/* Transparent circle */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill='transparent'
          stroke='none'
          strokeWidth={0}
          clipPath='url(#clip)'
        />
        {/* Visible border */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill='none'
          stroke={borderColor}
          strokeWidth={strokeWidth}
          strokeDasharray={[
            2 * Math.PI * radius * visibleBorderPercentage,
            2 * Math.PI * radius,
          ]}
          transform={`rotate(-206, ${centerX}, ${centerY})`} // Rotate to start from the bottom
        />
        {/* Hidden border */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill='none'
          stroke={borderColor}
          strokeWidth={strokeWidth}
          strokeDasharray={[
            2 * Math.PI * radius * (1 - visibleBorderPercentage), // Adjust the dasharray for the hidden portion
            2 * Math.PI * radius,
          ]}
          transform={`rotate(-180, ${centerX}, ${centerY})`} // Rotate to start from the bottom
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomCircle;
