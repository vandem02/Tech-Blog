const homeEl = document.getElementById("home");
const dashEl = document.getElementById("dashboard");
const signupEl = document.getElementById("signup");

console.log(window.location.pathname);

if (window.location.pathname == "/") {
  homeEl.classList.add("active");
} else if (window.location.pathname == "/dashboard") {
  dashEl.classList.add("active");
} else if (window.location.pathname == "/signup") {
  signupEl.classList.add("active");
}
