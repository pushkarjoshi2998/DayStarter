async function loadTodos() {
  try {
    const res   = await fetch("/api/todos");
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error("Todo fetch error:", err);
  }
}

function renderTodos(todos) {
  const listEl = document.getElementById("todo-list");
  listEl.innerHTML = todos.map(t => `
    <li class="todo-item ${t.done ? "done" : ""}" data-id="${t._id}">
      <div class="todo-check" data-action="check">✓</div>
      <span class="todo-item-text">${t.text}</span>
      <button class="todo-delete" data-action="delete">✕</button>
    </li>
  `).join("");

  updateProgress(todos);
}

function updateProgress(todos) {
  const total = todos.length;
  const done  = todos.filter(t => t.done).length;
  const pct   = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById("todo-bar").style.width   = pct + "%";
  document.getElementById("todo-label").textContent = `${done} of ${total} done`;
}

document.getElementById("todo-list").addEventListener("click", async (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const id = el.closest(".todo-item").dataset.id;

  if (el.dataset.action === "check") {
    await fetch(`/api/todos/${id}`, { method: "PATCH" });
  } else if (el.dataset.action === "delete") {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
  }
  loadTodos();
});

async function addTodo() {
  const input = document.getElementById("todo-input");
  const text  = input.value.trim();
  if (!text) return;
  input.value = "";
  await fetch("/api/todos", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ text }),
  });
  loadTodos();
}

document.getElementById("todo-add-btn").addEventListener("click", addTodo);
document.getElementById("todo-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

loadTodos();