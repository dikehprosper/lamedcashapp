/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Colors from "../../constants/Colors";
import {useState, useRef } from "react"
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  StyleSheet,
  Animated,
} from "react-native";


export default function OnboardingItem({item}: any) {
 
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={Colors.background === "#0C121D"  ? item.image2 : item.image}
        style={[styles.image, {width: 300, height: 400, resizeMode: "contain"}]}
      />
      <View style={{flex: 0.3, width: "100%", alignItems: "center"}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  title: {
    fontWeight: "800",
    fontSize: 22,
    marginBottom: 15,
    color: Colors.default1,
    textAlign: "center",
    width: "90%",
  },
  description: {
    fontWeight: "300",
    width: "70%",
    color: "#62656b",
    textAlign: "center",
    fontSize: 13.7,
  },
});
