const post_id = window.location.pathname.split("/")[2];

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const text = document.getElementById("text").value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "put",
      body: JSON.stringify({
        title,
        text,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) window.location.assign(`/post/${post_id}`);
    alert(await response.json());
  }
});

document.getElementById("cancel").addEventListener("click", (e) => {
  e.preventDefault();

  window.location.assign(`/post/${post_id}`);
});
