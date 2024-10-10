function formatNumberWithCommasAndDecimal(amount: string | number): string {
  try {
    // Convert the input to a number
    const updatedAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;

    // Check if the conversion to number is valid
    if (isNaN(updatedAmount)) {
      console.error("Invalid number input:", amount);
      return "0.00"; // Return a default value instead of throwing an error
    }

    // Use toFixed(2) to ensure two decimal places and convert to a string
    const formattedNumber = updatedAmount.toFixed(2);

    // Use toLocaleString() to add commas for proper indentation
    const formattedString = parseFloat(formattedNumber).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

    return formattedString;
  } catch (error) {
    console.error("Error formatting number:", error);
    return "0.00"; // Return a default value in case of an unexpected error
  }
}

export default formatNumberWithCommasAndDecimal;
