module.exports = {
  format_date: (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date(date);
    var AMorPM = "am";
    let hour = d.getHours();
    if (hour == 0) {
      hour = 12;
    } else if (hour == 12) {
      AMorPM = "pm";
    } else if (hour > 12) {
      hour -= 12;
      AMorPM = "pm";
    }
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${hour}:${d.getMinutes()} ${AMorPM}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
};
