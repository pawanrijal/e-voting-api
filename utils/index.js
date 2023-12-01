function isDateGreaterThanToday(targetDate) {
  // Parse the target date string into a Date object
  const targetDateObj = new Date(targetDate);

  // Get the current date without the time part
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Compare the dates without the time part
  return targetDateObj < currentDate;
}

module.exports = { isDateGreaterThanToday };
