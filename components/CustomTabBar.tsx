import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Colors, { Color } from "../constants/Colors"; // Make sure to replace this with the actual Colors import
import NotificationIcon from "./icons/NotificationIcon";
import Drawer from "./icons/Drawer";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const CustomTabBar = ({ state, descriptors, navigation, unreadNotifications, toggleDrawer, navigateToNotfications }: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme
    );

    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

  return (
    <SafeAreaView>
      <BottomSheetModalProvider>
        <View style={styles.headerContainer}>
          <Drawer
            color={Colors.welcomeText}
            onPress={toggleDrawer}
          />
          <NotificationIcon
            onPress={navigateToNotfications}
            unreadNotifications={unreadNotifications}
          />
        </View>
        <View style={styles.tabContainer}>
          {state.routes.map((route: any, index: any) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={[
                  styles.tab,
                  {
                    borderBottomColor: isFocused
                      ? Colors.default1
                      : "transparent",
                  },
                ]}
              >
                <Text
                  style={{
                    color: isFocused ? Colors.default1 : Colors.tabbarLabelColor,
                    fontFamily: "sf-bold",
                    fontSize: 16,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    margin: 10,
    paddingHorizontal: 10,
    gap: 10,
    justifyContent: "space-between",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomColor: Colors.postSelectionBorderColor,
    borderBottomWidth: 1,
  },
  tab: {
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
});

export default CustomTabBar;
