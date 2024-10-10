/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {TouchableOpacity, Text} from "react-native";
import {Color} from "@/constants/Colors";
import {colorScheme} from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
const color: any = colorScheme.state;
const Colors = color === 2 ? Color.darkMode : Color.lightMode;

const Button = ({color, text, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        backgroundColor: Colors.default1,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => onPress()}
    >
      <Text style={{color: color, fontSize: 20, fontWeight: "700"}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
