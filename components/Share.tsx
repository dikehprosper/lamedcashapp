/* eslint-disable @typescript-eslint/ban-types */
import { Share } from 'react-native';

// Function to share the file
export const shareFile = async (filePath: String, message = 'Check out this file') => {
  try {
    // Share the file using the Share API
    await Share.share({
      message,
      url: `file://${filePath}`,
    });
  } catch (error) {
    console.error('Error sharing file:', error);
  }
};
