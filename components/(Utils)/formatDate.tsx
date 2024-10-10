/* eslint-disable @typescript-eslint/no-explicit-any */

const formatDate = (inputDate: any) => {
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
  const momentDate = Moment(inputDate);

  // Format the date and time separately
  const formattedDate = momentDate.format("DD MMM, YYYY");

  return formattedDate;
};
export default formatDate;
