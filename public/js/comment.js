document.getElementById("comment").addEventListener("click", async (e) => {
  e.preventDefault()
  const text = document.getElementById("floatingTextarea").value.trim();

  const post_id = window.location.pathname.split("/")[2]

  if (text) {
    const response = await fetch("/api/comments", {
      method: "post",
      body: JSON.stringify({
        text,
        post_id
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) window.location.reload()
    alert(await response.json());
  }
})