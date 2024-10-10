/* eslint-disable @typescript-eslint/no-explicit-any */
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

function formatNumberWithCommasAndDecimal2(amount: number): string {
  // Use toFixed(2) to ensure two decimal places and convert to a string
  const formattedNumber = amount?.toFixed(2);
  // Use toLocaleString() to add commas for proper indentation
  const formattedString = parseFloat(formattedNumber).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  );
  return formattedString;
}

const formatNumber = (num: number) => {
  if (num < 1000) {
    return num.toString();
  } else if (num >= 1000 && num < 1000000) {
    const formatted = (num / 1000).toFixed(1);
    return formatted.replace(".0", "") + "k";
  } else if (num >= 1000000 && num < 1000000000) {
    const formatted = (num / 1000000).toFixed(1);
    return formatted.replace(".0", "") + "M";
  } else if (num >= 1000000000 && num < 1000000000000) {
    const formatted = (num / 1000000000).toFixed(1);
    return formatted.replace(".0", "") + "B";
  } else {
    const formatted = (num / 1000000000000).toFixed(1);
    return formatted.replace(".0", "") + "T";
  }
};


export {
  formatNumberWithCommasAndDecimal as default,
  formatNumber,
  formatNumberWithCommasAndDecimal2,
};
