function formatNumberWithCommasAndDecimal(amount: string | number): string {
  // Convert the input to a number
  const updatedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Check if the conversion to number is valid
  if (isNaN(updatedAmount)) {
    throw new Error("Invalid number input");
  }

  // Use toFixed(2) to ensure two decimal places and convert to a string
  const formattedNumber = updatedAmount.toFixed(2);

  // Use toLocaleString() to add commas for proper indentation
  const formattedString = parseFloat(formattedNumber).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedString;
}

export default formatNumberWithCommasAndDecimal;
