let currentCategory = "technology";

async function fetchNews(category) {
  const listEl = document.getElementById("news-list");
  listEl.innerHTML = `<div class="news-placeholder">Fetching headlines...</div>`;
  try {
    const res = await fetch(`/api/news?category=${category}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "News fetch failed");

    renderNews(data.articles);
  } catch (err) {
    listEl.innerHTML = `<div class="news-placeholder">Unable to load news.</div>`;
    console.error("News error:", err);
  }
}

function renderNews(articles) {
  const listEl = document.getElementById("news-list");
  if (!articles || articles.length === 0) {
    listEl.innerHTML = `<div class="news-placeholder">No articles found.</div>`;
    return;
  }
  listEl.innerHTML = articles.slice(0, 8).map(a => `
    <a class="news-card" href="${a.url}" target="_blank" rel="noopener">
      <div class="news-card-title">${a.title}</div>
      <div class="news-card-source">${a.source?.name || "Unknown"}</div>
    </a>
  `).join("");
}

// Category filter buttons
document.getElementById("news-filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentCategory = btn.dataset.cat;
  fetchNews(currentCategory);
});

fetchNews(currentCategory);
