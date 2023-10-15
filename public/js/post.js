document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault()
  const title = document.getElementById("title").value.trim();
  const text = document.getElementById("floatingTextarea").value.trim();

  if (title && text) {
    const response = await fetch("/api/posts", {
      method: "post",
      body: JSON.stringify({
        title,
        text,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) window.location.assign("/");
    alert(await response.json());
  }
})