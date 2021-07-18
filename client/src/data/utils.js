export const DEVELOPMENT = true;

export const hexToRgb = (hex = "fff") => {
  hex = hex.substring(1);
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  var a = r > 180 ? 0.2 : 0.4;
  return r + "," + g + "," + b + "," + a;
};

export const timeAgo = (previous) => {
  const current = Date.now();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    const seconds = Math.round(elapsed / 1000);
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    return `${days > 1 ? `${days} days ago` : "Yesterday"}`;
  } else if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
};
