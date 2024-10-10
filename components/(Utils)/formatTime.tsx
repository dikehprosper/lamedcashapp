/* eslint-disable @typescript-eslint/no-explicit-any */
const formatTime = (inputDate: any) => {
  // Check if inputDate is a valid date string or object
  if (
    !inputDate ||
    !(inputDate instanceof Date || !isNaN(Date.parse(inputDate)))
  ) {
    throw new Error("Invalid date format. Please provide a valid date.");
  }

  // Import Moment.js library
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Moment = require("moment");
  // Ensure correct locale is set
  Moment.locale("en");

  // Create a Moment object from the inputDate
  const momentTime = Moment(inputDate);

  // Format the time to 12-hour format with AM/PM
  const formattedTime = momentTime.format("hh:mm A"); // "hh:mm A" gives you the 12-hour format with AM/PM

  return formattedTime;
};

export default formatTime;
