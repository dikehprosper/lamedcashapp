
function formatNumberWithCommasAndDecimal(amount: number): string {
  // Use toFixed(2) to ensure two decimal places and convert to a string
  const formattedNumber = amount?.toFixed(2);
  // Use toLocaleString() to add commas for proper indentation
  const formattedString = parseFloat(formattedNumber).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
  return formattedString;
}
export default formatNumberWithCommasAndDecimal;
