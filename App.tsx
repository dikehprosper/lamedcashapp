/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */

import React, {useEffect, useRef, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import AppNavigator from "./navigation/AppNavigator";
import {persistor, store} from "./state/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {RootSiblingParent} from "react-native-root-siblings";
import { Provider as PaperProvider } from "react-native-paper"; // Import PaperProvider

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    mon: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "mon-sb": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "mon-b": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "mon-i": require("./assets/fonts/Roboto/Roboto-Italic.ttf"),
    "new-mon-i": require("./assets/fonts/Roboto/Peralta/Peralta-Regular.ttf"),
    sf: require("./assets/fonts/SanFrancisco/SanFransisco.ttf"),
    "sf-bold": require("./assets/fonts/SanFrancisco/sfbold.otf"),
  });

  useEffect(() => {
    // if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <PersistGate loading={null} persistor={persistor}>
            <RootSiblingParent>
              <PaperProvider>
              <AppNavigator />
               </PaperProvider>
            </RootSiblingParent>
          </PersistGate>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
