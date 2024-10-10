import { Color } from '@/constants/Colors';
import { RootState } from '@/state/store';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface TimeDifference {
  hoursBack: number;
  daysBack: number;
  display: string;
}

const calculateTimeDifference = (dateString: string): TimeDifference => {
  const pastDate = new Date(dateString);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate.getTime() - pastDate.getTime();
const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

let display;
if (differenceInDays >= 1) {
  display = `${Math.floor(differenceInDays)}d`;
} else if (differenceInHours >= 1) {
  display = `${Math.floor(differenceInHours)}h`;
} else if (differenceInMinutes >= 1) {
  display = `${Math.floor(differenceInMinutes)}m`;
} else {
  display = "less than a minute";
}

  return {
    hoursBack: Math.floor(differenceInHours),
    daysBack: Math.floor(differenceInDays),
    display,
  };
};

interface TimeDifferenceDisplayProps {
  dateString: string;
}

const TimeDifferenceDisplay: React.FC<TimeDifferenceDisplayProps> = ({ dateString }) => {
  const { display } = calculateTimeDifference(dateString);

  const colorScheme = useSelector(
    (state: RootState) => state.getUserData.colorScheme
);
const Colors =
    parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

  return (
    <View style={styles.container}>
      <Text style={{ width: "100%", fontSize: 12, color: Colors.welcomeText}} ellipsizeMode="tail" numberOfLines={1}>· {display}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimeDifferenceDisplay;
