/* eslint-disable @typescript-eslint/no-explicit-any */
import {SafeAreaView} from "react-native";
import React from "react";
import {Color} from "@/constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";


const ExploreHeader8 = () => {
   const colorScheme = useSelector(
       (state: RootState) => state.getUserData.colorScheme,
   );
   const Colors =
       parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

  return (
      <SafeAreaView
          style={{
              backgroundColor: Colors.background,
          }}
      ></SafeAreaView>
  );
};

export default ExploreHeader8;
