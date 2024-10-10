/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {View, Animated, useWindowDimensions, StyleSheet} from "react-native";
import {Color} from "@/constants/Colors";



const Paginator = ({data, scrollX}: any) => {
   const color: any = data.colorScheme;
   const Colors = color === 2 ? Color.darkMode : Color.lightMode;

  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: "row", height: 64, justifyContent: "center"}}>
      {data.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
            <Animated.View
                style={[
                    styles.dot,
                    {
                        width: dotWidth,
                        opacity,
                        backgroundColor: Colors.default1,
                    },
                ]}
                key={i.toString()}
            ></Animated.View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  
    marginHorizontal: 8,
  },
});
export default Paginator;
