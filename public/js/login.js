async function loginFormHandler(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/")
    }

    if (response.status == 401) {
      alert("Incorrect username or password.")
    }
  }
}

document.getElementById("login").addEventListener("click", loginFormHandler);
