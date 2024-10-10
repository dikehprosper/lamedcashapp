/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import PopInAnimation from "./AnimatedContent";
import {Color} from "@/constants/Colors";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";

const NoticeModalPage = ({closeNotice}: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;
  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        flex: 1,
        zIndex: 20100000000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 38,
      }}
    >
      <PopInAnimation
        // startPositionY={0}
        // startPositionX={-200}
        // positionAnimationSpeed={700}
        scaleSpeed={0.9}
        opacitySpeed={200}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "95%",
          backgroundColor: Colors.background,
          position: "relative",
          alignItems: "center",
          borderRadius: 13,
          padding: 20,
          minHeight: 400,
        }}
      >
        <TouchableOpacity
          //   onPress={
          //     network.length === 1 ? closeNetworkModal2 : closeNetworkModal
          //   }
          style={{
            position: "absolute",
            top: -44,
            right: -5,
          }}
          onPress={() => closeNotice()}
        >
          <Text
            style={{
              fontWeight: "400",
              color: "white",
              fontSize: 26,
            }}
          >
            X
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            flex: 1,

            height: "20%",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <AntDesign name='checkcircleo' size={80} color={Colors.default1} />
          <Text
            style={{
              fontSize: 23,
              fontWeight: "800",
              color: Colors.welcomeText,
              marginTop: 50,
            }}
          >
            Bien envoyé
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              textAlign: "center",
              color: Colors.welcomeText,
              marginTop: 16,
            }}
          >
            Vérifiez votre courrier électronique pour le lien pour réinitialiser
            votre mot de passe.
          </Text>
        </View>
      </PopInAnimation>
    </View>
  );
};

export default NoticeModalPage;
