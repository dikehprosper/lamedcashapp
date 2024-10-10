/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import {Color} from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";


export default function OnboardingItem({item}: any) {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const { width } = useWindowDimensions();
    return (
        <View
            style={[
                styles.container,
                { width, backgroundColor: Colors.background },
            ]}
        >
            <Image
                source={
                    Colors.background === "#0C121D" ? item.image2 : item.image
                }
                style={[
                    styles.image,
                    { width: 300, height: 400, resizeMode: "contain" },
                ]}
            />
            <View style={{ flex: 0.3, width: "100%", alignItems: "center" }}>
                <Text style={[styles.title, { color: Colors.default1 }]}>
                    {item.title}
                </Text>
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
