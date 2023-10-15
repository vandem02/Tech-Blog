const homeEl = document.getElementById("home");
const dashEl = document.getElementById("dashboard");
const loginEl = document.getElementById("log-in");
const signupEl = document.getElementById("sign-up");

switch (window.location.pathname) {
  case "/":
    homeEl.classList.add("active");
    break;
  case "/dashboard":
    dashEl.classList.add("active");
    break;
  case "/login":
    loginEl.classList.add("active");
    break;
  case "/signup":
    signupEl.classList.add("active");
}

const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.assign("/");
  } else {
    alert(response.statusText);
  }
};
