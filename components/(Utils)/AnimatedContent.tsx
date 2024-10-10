/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useRef} from "react";
import {Animated, View, StyleSheet} from "react-native";

const PopInAnimation = ({
  startPositionY,
  startPositionX,
  positionAnimationSpeed,
  scaleSpeed,
  opacitySpeed,
  children,
  style,
}: any) => {
  const translateYAnim = useRef(
    new Animated.Value(startPositionY ? startPositionY : 0)
  ).current;
  const translateXAnim = useRef(
    new Animated.Value(startPositionX ? startPositionX : 0)
  ).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateXAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: positionAnimationSpeed ? positionAnimationSpeed : 15,
      }),
      Animated.spring(translateYAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: positionAnimationSpeed ? positionAnimationSpeed : 15,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: scaleSpeed ? scaleSpeed : 0,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: opacitySpeed ? opacitySpeed: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      ...style,
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {translateY: translateYAnim},
            {translateX: translateXAnim},
            {scale: scaleAnim},
          ],
          opacity: opacityAnim,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default PopInAnimation;
