/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import "./transactionResults.css";
import {TransactionResultsProps} from "@/types";
import formatNumberWithCommasAndDecimal from "../../../(Utils)/formatNumber";
import {View, Text, StyleSheet, Dimensions, Image} from "react-native";
import {AntDesign, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import Moment from "moment";
import {Color} from "@/constants/Colors";
import {colorScheme} from "@/components/(userscomponent)/(TransactionTemplateUsers)/data";
const color: any = colorScheme.state;
const Colors = color === 2 ? Color.darkMode : Color.lightMode;

const TransactionResults = ({
  time,
  amount,
  receipt,
  betId,
  status,
  type,
  showReceipt,
  momoName,
  momoNumber,
  withdrawalCode,
  identifierId,
  name,
  image,
}: any) => {
  //  const handleClick = () => {
  //     showReceipt(
  //       time,
  //       amount,
  //       identifierId,
  //       betId,
  //       status,
  //       type,
  //       momoName,
  //       momoNumber,
  //       withdrawalCode
  //     );
  //   };

  return (
    <View
      style={{
        paddingTop: 5,
        paddingBottom: 5,
        gap: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <View
        style={styles.transaction_result}
        // onClick={handleClick}
      >
        {/* <View
          // className='first-span'
          style={{
            backgroundColor: type === "deposits" ? "#658900" : "#0076B8",
            width: "13px !important",
          }}
        ></View> */}
        <View
          style={{
            backgroundColor:
              type === "deposits"
                ? "rgba(73, 166, 106, .2)"
                : "rgba(120, 120, 120, .2)",
            width: 50,
            height: 50,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{uri: image}}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 10,
            }}
          />
        </View>

        <View style={styles.small_device_group}>
          <Text
            style={{
              color: Colors.welcomeText,
              fontWeight: "700",
              fontSize: 15,
              opacity: 0.9,
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              color: Colors.welcomeText,
              fontSize: 11,
              fontWeight: "600",
              opacity: 0.6,
              padding: 2.5,
            }}
          >
            {formatDate(time)}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            gap: 3,
            flexDirection: "column",
            justifyContent: "center",
            // backgroundColor: "red",
          }}
        >
          {status === "Pending" ? (
            <View
              style={{
                padding: 2.5,
                borderRadius: 3,

                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "900",
                  color: Colors.welcomeText,
                  opacity: 0.5,
                }}
              >
                {status}
              </Text>
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 3,
                borderRadius: 15,
                backgroundColor: Colors.default3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: Colors.default1,
                }}
              >
                {status}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  transaction_result: {
    gap: 8,
    display: "flex",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
  },
  small_device_group: {
    display: "flex",
    flex: 1,
    gap: 3,
    flexDirection: "column",
    justifyContent: "center",
    // backgroundColor: "red",
    // whiteSpace: 'nowrap'
  },
  small_device_group_text1: {
    color: Colors.welcomeText,
    fontWeight: "900",
  },
});
export default TransactionResults;

const formatDate = (inputDate: any) => {
  // Check if inputDate is a valid date string or object
  if (
    !inputDate ||
    !(inputDate instanceof Date || !isNaN(Date.parse(inputDate)))
  ) {
    throw new Error("Invalid date format. Please provide a valid date.");
  }

  // Import Moment.js library
  const Moment = require("moment");
  // Ensure correct locale is set
  Moment.locale("en");

  // Create a Moment object from the inputDate
  const momentDate = Moment(inputDate);

  // Format the date and time separately
  const formattedDate = momentDate.format("DD MMM, YYYY");
  const formattedTime = momentDate.format("hh:mm A"); // Use uppercase 'A' for AM/PM

  const formattedDateTime = (
    <Text style={{display: "flex", alignItems: "center"}}>
      {formattedDate} <Text style={{fontSize: 10.5}}>&#8226; </Text>
      {formattedTime}
    </Text>
  );

  return formattedDateTime;
};
