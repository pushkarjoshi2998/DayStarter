async function fetchQuote() {
  try {
    const res = await fetch("/api/quote");
    const data = await res.json();
    if (!res.ok) throw new Error("Quote fetch failed");

    typeQuote(data.quote, data.author);
  } catch (err) {
    document.getElementById("quote-text").textContent = "Stay focused and never give up.";
    document.getElementById("quote-author").textContent = "— Unknown";
    console.error("Quote error:", err);
  }
}

function typeQuote(text, author) {
  const el = document.getElementById("quote-text");
  el.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      document.getElementById("quote-author").textContent = `— ${author}`;
    }
  }, 28);
}

fetchQuote();
