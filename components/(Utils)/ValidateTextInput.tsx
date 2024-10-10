/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import {View, Text, TextInput} from "react-native";

const ValidateTextInput = ({
  index,
  user,
  onFocus,
  onBlur,
  onChange,
  value,
  leftIcon,
  borderColor,
  autoCorrect,
  style,
  placeholder,
  autoCapitalize,
  leftIconStyle,
}: any) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: Colors.background,
        borderRadius: 8,
        borderColor: borderColor,
        borderWidth: 1.5,
      }}
    >
      <Text style={leftIconStyle}>{leftIcon}</Text>
      <TextInput
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderTextColor={Colors.placeHolderTextColor}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        style={style}
      ></TextInput>
    </View>
  );
};

export default ValidateTextInput