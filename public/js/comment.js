const post_id = window.location.pathname.split("/")[2]

document.getElementById("comment").addEventListener("click", async (e) => {
  e.preventDefault()
  const text = document.getElementById("floatingTextarea").value.trim();

  if (text) {
    const response = await fetch("/api/comments", {
      method: "post",
      body: JSON.stringify({
        text,
        post_id
      }),
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) window.location.reload()
    alert(await response.json());
  }
})

document.getElementById("edit").addEventListener("click", (e) => {
  e.preventDefault();

  window.location.assign(`/edit/${post_id}`);
});

document.getElementById("delete").addEventListener("click", async (e) => {
  e.preventDefault()
  
  if (confirm("Are you sure you want to delete this post?")) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) window.location.assign("/")
    alert(await response.json());
  }
})