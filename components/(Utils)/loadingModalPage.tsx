/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import PopInAnimation from "./AnimatedContent";
import Colors from "@/constants/Colors";

const allNetwork = ["mtn", "glo", "moov"];
const LoadingModalPage = ({
  changeNetworkModal,
  runNetworkCheck,
  currentNetwork,
  closeNetworkModal,
  networkModal,
  network,
  closeNetworkModal2,
  proceedWithNetworkModal,
  proceedWithNetworkModal2,
}: any) => {
  //   let networkModal = "third" || "second" || "first";
  //   networkModal = "third";
  //   let network = ["MOOV", "MTN"] || ["MOOV"] || [];
  //   network = ["MOOV", "MTN"];
  useEffect(() => {
    console.log(currentNetwork);
    if (currentNetwork === undefined) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [currentNetwork]);

  const [disabled, setDisabled] = useState<boolean>();
  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        flex: 1,
        zIndex: 20100000000000000,
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
          flexDirection: "row",
          backgroundColor: "white",
          position: "relative",
          borderRadius: 13,
          paddingVertical: 20,
          paddingHorizontal: 40,
          gap: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={35} color={Colors.primary3} />
        <Text style={{fontWeight: "800", fontSize: 17}}>Traitement . . .</Text>
      </PopInAnimation>
    </View>
  );
};

export default LoadingModalPage;
