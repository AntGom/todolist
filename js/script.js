import { todoManager, themeManager } from "./state.js";

document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const clearAllBtn = document.getElementById("clear-all");
  const themeToggle = document.getElementById("theme-toggle");
  const modal = document.getElementById("confirm-modal");
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  const cancelDeleteBtn = document.getElementById("cancel-delete");

  // Cargar tema inicial
  if (themeManager.getCurrentTheme() === "dark") {
    document.body.setAttribute("data-theme", "dark");
  }

  // Pintar las tareas
  function renderTodos() {
    todoList.innerHTML = "";
    todoManager.getTodos().forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;

      li.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span>${todo.text}</span>
        <button class="delete-btn">🗑️</button>
      `;

      //Marcar tareas completadas
      const checkbox = li.querySelector("input");
      checkbox.addEventListener("change", () => {
        todoManager.toggleTodo(index);
        renderTodos();
      });

      //Eliminar tarea
      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        todoManager.deleteTodo(index);
        renderTodos();
      });

      todoList.appendChild(li);
    });
  }

  // Mostrar y ocultar modal
  function showModal() {
    modal.classList.add("show");
  }

  function closeModal() {
    modal.classList.remove("show");
  }

  // Eventos
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      todoManager.addTodo(text);
      todoInput.value = "";
      renderTodos();
    }
  });

  clearAllBtn.addEventListener("click", showModal);

  confirmDeleteBtn.addEventListener("click", () => {
    todoManager.clearAllTodos();
    renderTodos();
    closeModal();
  });

  cancelDeleteBtn.addEventListener("click", closeModal);

  themeToggle.addEventListener("click", () => {
    const newTheme = themeManager.toggleTheme();
    if (newTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      document.body.removeAttribute("data-theme");
      themeToggle.textContent = "🌙";
    }
  });

  // Cerrar modal al hacer clic fuera
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  renderTodos();
});
