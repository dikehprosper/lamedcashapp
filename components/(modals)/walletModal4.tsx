/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import {Color} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {Language} from "@/constants/languages";
import PopInAnimation from "../(Utils)/AnimatedContent";
import {changeModalState} from "@/state/userData/getUserData";
import DOMAIN from "../(Utils)/domain";
import {FontAwesome6} from "@expo/vector-icons";
const WalletModal4 = ({
  value,
  handleSubmit,
  closeModal,
  text,
  loading,
  value2,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
  );
  const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

  const currentLanguage = useSelector(
    (state: RootState) => state.getUserData.currentLanguage
  );
  const languageText =
    currentLanguage === "english" ? Language.english : Language.french;

  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        flex: 1,
        zIndex: 20100000000,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 38,
      }}
    >
      <PopInAnimation
        scaleSpeed={0.9}
        opacitySpeed={200}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "95%",
          backgroundColor: Colors.background,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: 13,
          padding: 15,
          minHeight: 150,
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
          onPress={() => closeModal()}
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
            flexDirection: "column",
            gap: 15,
            width: "100%",
            minHeight: 150,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 20,
              color: Colors.welcomeText,
            }}
          >
            {text}
          </Text>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            {value.image === "" ? (
              <FontAwesome6
                name='bolt-lightning'
                size={19}
                color={Colors.welcomeText}
                style={{
                  borderColor: "rgba(120, 120, 120, 0.5)",
                  borderWidth: 1,
                  padding: 6,
                  borderRadius: 3,
                }}
              />
            ) : (
              <Image
                source={{uri: `${DOMAIN}/${value.image}`}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 3,
                  opacity: 0.8,
                }}
              />
            )}

            <Text
              style={{
                fontWeight: "500",
                fontSize: 16,
                color: Colors.welcomeText,
                justifyContent: "center",
                opacity: 0.8,
              }}
            >
              {value2}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 45,
              width: "40%",
              borderRadius: 5,
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
              borderWidth: 2,
            }}
            onPress={() => closeModal()}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: Colors.welcomeText,
              }}
            >
              {languageText.text349}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 45,
              width: "40%",
              borderRadius: 5,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
            onPress={() => handleSubmit(value)}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "white",
                textAlign: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator size='small' color={Colors.welcomeText} />
              ) : (
                languageText.text350
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </PopInAnimation>
    </View>
  );
};

export default WalletModal4;
