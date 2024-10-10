/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {CountryPicker} from "react-native-country-codes-picker";
import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {Color} from "@/constants/Colors";
import {colorScheme} from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
export default function CountryCode({
  countryFlag,
  changeCountryCode,
  changeCountryFlag,
  displayNotification,
}: any) {
  const [show, setShow] = useState(false);

   const colorScheme = useSelector(
       (state: RootState) => state.getUserData.colorScheme,
   );
   const Colors =
       parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => displayNotification()}
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
          borderRightWidth: 2,
          borderRightColor: Colors.countrySelectionBorderColor,
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          opacity: 0.95,
        }}
      >
        <Text
          style={{
            color: Colors.primary3,
            fontSize: 13,
            fontWeight: "900",
          }}
        >
          {countryFlag}
        </Text>
        <Text>
          <Entypo name='select-arrows' size={11} color={Colors.primary3} />
        </Text>
      </TouchableOpacity>

      <CountryPicker
        show={show}
        lang={"fr"}
        style={{
          // Styles for whole modal [View]
          modal: {
            height: 500,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          // Styles for modal backdrop [View]
          backdrop: {},
          // Styles for bottom input line [View]
          line: {},
          // Styles for list of countries [FlatList]
          itemsList: {},
          // Styles for input [TextInput]
          textInput: {
            height: 40,
            borderRadius: 0,
          },
          // Styles for country button [TouchableOpacity]
          countryButtonStyles: {
            height: 40,
          },
          // Styles for search message [Text]
          searchMessageText: {},
          // Styles for search message container [View]
          countryMessageContainer: {},
          // Flag styles [Text]
          flag: {},
          // Dial code styles [Text]
          dialCode: {},
          // Country name styles [Text]
          countryName: {},
        }}
        pickerButtonOnPress={(item) => {
          changeCountryFlag(item.flag);
          changeCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 48,
    paddingLeft: 2,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
