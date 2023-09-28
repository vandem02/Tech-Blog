async function loginFormHandler(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/signup", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.status == 400) {
      alert(response.statusText);
    }
  }
}

document.getElementById("login").addEventListener("click", loginFormHandler);
