/* eslint-disable @typescript-eslint/no-explicit-any */
const getTimeDifference = (postTime: string): string => {
  const currentTime = new Date();
  const parsedPostTime = new Date(postTime);
  const timeDifference: number =
    currentTime.getTime() - parsedPostTime.getTime();

  // Calculate time difference in seconds, minutes, hours, and days
  const secondsDifference: number = Math.floor(timeDifference / 1000);
  const minutesDifference: number = Math.floor(secondsDifference / 60);
  const hoursDifference: number = Math.floor(minutesDifference / 60);
  const daysDifference: number = Math.floor(hoursDifference / 24);

  if (daysDifference > 0) {
    return `${daysDifference}d`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}h`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference}m`;
  } else {
    return `${secondsDifference}s`;
  }
};

export default getTimeDifference;
