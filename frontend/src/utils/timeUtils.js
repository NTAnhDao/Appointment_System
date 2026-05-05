export const parseDate = (d) => new Date(d);

export const formatDate = (d) =>
  parseDate(d).toLocaleDateString("vi-VN");

export const formatTime = (d) =>
  parseDate(d).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const getHour = (d) =>
  parseDate(d).getHours();

export const getDateOnly = (d) =>
  parseDate(d).toISOString().split("T")[0];