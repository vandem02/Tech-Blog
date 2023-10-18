document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password.length >= 8) {
    const response = await fetch("/api/users/signup", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) window.location.assign("/")
    alert(await response.json())
  } else if (password.length < 8) {
    document.querySelector(".invalid-feedback").style.display = "block"
    document.getElementById("password").classList.add("is-invalid")
  }
})