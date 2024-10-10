/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Text} from "react-native";
 function FormatDateAndTime(inputDate: any) {
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
}



function FormatDateAndTime2(dateString: string): string {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Set up options for the date and time format with correct typings
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // 'short' for abbreviated month name
    day: "2-digit", // '2-digit' for two-digit day
    year: "numeric", // 'numeric' for full numeric year
    hour: "2-digit", // '2-digit' for two-digit hour
    minute: "2-digit", // '2-digit' for two-digit minute
    hour12: true, // true for 12-hour format instead of 24-hour format
  };

  // Use Intl.DateTimeFormat to format the date according to the specified options
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
}

export {
  FormatDateAndTime as default,
  FormatDateAndTime2,
};