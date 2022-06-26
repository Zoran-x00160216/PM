export const formatDate = (zz) => {
  const d = new Date(zz);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getYear() + 1900;
  let hours = "" + d.getHours();
  let minutes = "" + d.getMinutes();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

// a and b are javascript Date objects
export const getDateDiff = (a, b) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
