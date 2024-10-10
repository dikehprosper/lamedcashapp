/* eslint-disable @typescript-eslint/no-explicit-any */
import {StyleSheet} from "react-native";
import {Color} from "@/constants/Colors";
import {colorScheme} from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
const color: any = colorScheme.state;
const Colors = color === 2 ? Color.darkMode : Color.lightMode;
export const defaultStyles = StyleSheet.create({
  inputField: {
    height: 48,
    // borderWidth: 2,
    // borderColor: Colors.welcomeText,
    opacity: 0.8,
    padding: 10,
    fontSize: 17,
    backgroundColor: "transparent",
    color: Colors.welcomeText,
    flex: 1,
    fontWeight: "700",
    borderColor: "transparent",
    borderWidth: 0,
  },
  focusedInput: {
    borderColor: "transparent", // A distinct color when the input is focused
    borderWidth: 0, // Make the border thicker on focus
  },
  btn: {
    backgroundColor: Colors.default1,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontFamily: "mon-b",
  },
  border: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "flex-start",
    // backgroundColor: '#fff', // Optional background color
    // borderRadius: 5, // Border radius for rounded corners
    borderWidth: 2, // Slightly thicker border
    borderColor: "#ddd", // Border color (adjust for desired color)
    shadowColor: "#000", // Shadow color (adjust for desired color)
    shadowOffset: {width: 3, height: 3}, // Offset for diagonal shadow
    shadowOpacity: 0.15, // Slightly lower opacity for a subtler effect
    shadowRadius: 4, // Higher blur radius for a softer shadow
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
  },
});
