// Timezone configuration for the entire system
// All components should use UTC for storage and processing
// Display formatting should be handled in the presentation layer

export const SYSTEM_TIMEZONE = 'UTC';
export const DISPLAY_TIMEZONE = 'Asia/Ho_Chi_Minh';

// Utility functions for date handling
export const parseDateAsUTC = (dateString) => {
  return new Date(dateString + (dateString.includes('Z') ? '' : 'Z'));
};

export const formatDateForDisplay = (date, locale = 'vi-VN') => {
  return new Date(date).toLocaleString(locale);
};

export const getCurrentUTCDate = () => {
  return new Date().toISOString();
};