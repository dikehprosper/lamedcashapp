import React from "react";
import {Text, StyleSheet} from "react-native";

// Props type definition for TypeScript (optional but recommended)
interface TruncatedTextProps {
  text: string;
  maxLength: number;
  style?: object;
}

const TruncatedText = ({text, maxLength, style = {}}: TruncatedTextProps) => {
  // Function to truncate text
  const truncate = (input: string, max: number) => {
    return input.length > max ? input.substring(0, max) + "..." : input;
  };

  return (
    <Text style={[styles.defaultStyle, style]}>
      {truncate(text, maxLength)}
    </Text>
  );
};

// Default styles for the component
const styles = StyleSheet.create({
  defaultStyle: {
    // Define default styling here if needed
  },
});

export default TruncatedText;
