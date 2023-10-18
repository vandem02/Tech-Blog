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
    if (response.ok) window.location.assign("/");
    alert(await response.json());
  }
}

document.getElementById("form").addEventListener("submit", loginFormHandler);
