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
    const m = d.getMinutes()
    const minute = m < 10 ? "0" + m : m
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${hour}:${minute} ${AMorPM}`;
  }
};