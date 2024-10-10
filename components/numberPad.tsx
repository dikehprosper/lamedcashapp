/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {Color} from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";


const NumberPad = ({onPress}: any) => {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

  const buttons = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    <MaterialIcons name='keyboard-backspace' size={24} />,
  ];

  return (
      <View style={styles.container}>
          {buttons.map((item, index) => (
              <TouchableOpacity
                  key={index}
                  style={[
                      styles.button,
                      index === 9 && styles.zeroButton,
                      { marginLeft: index % 3 !== 0 ? 10 : 0 },
                  ]}
                  onPress={() => onPress(item, index)}
                  delayPressIn={0}
              >
                  <Text
                      style={[styles.buttonText, { color: Colors.welcomeText }]}
                  >
                      {item}
                  </Text>
              </TouchableOpacity>
          ))}
      </View>
  );
};

const {width} = Dimensions.get("window");
const BUTTON_SIZE = (width - 120 - 10 * 4) / 3; // Adjust spacing here

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    marginRight: 43,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 1,
    marginHorizontal: 14,
  },
  zeroButton: {
    width: BUTTON_SIZE, // Adjust the width for "0" and backspace icon
    alignSelf: "flex-end", // Align to the left
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",

  },
});

export default NumberPad;

// /* eslint-disable react/jsx-key */
// import React from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import {MaterialIcons} from "@expo/vector-icons";

// const NumberPad = () => {
//   const buttons = [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "0",
//     <MaterialIcons name='keyboard-backspace' size={24} />,
//   ];

//   const handleButtonPress = (value) => {
//     // Handle button press
//   };

//   return (
//     <View style={styles.container}>
//       {buttons.map((item, index) => (
//         <TouchableOpacity
//           key={index}
//           onPress={() => handleButtonPress(item)}
//           style={styles.button}
//         >
//           <Text style={{ fontSize: 30, fontWeight: "900"}}>{item}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginVertical: 0,
//     marginHorizontal: 30,
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   button: {
//     width: 74,
//     height: 74,
//     borderRadius: 37,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 10,
//     marginHorizontal: 10,
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderColor: "red",
//   },
// });

// export default NumberPad;
