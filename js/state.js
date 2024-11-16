let todos = JSON.parse(localStorage.getItem('todos')) || [];

const themeManager = {
    getCurrentTheme: () => localStorage.getItem('theme') || 'dark',
    setTheme: (theme) => localStorage.setItem('theme', theme),
    toggleTheme: () => {
        const currentTheme = themeManager.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        themeManager.setTheme(newTheme);
        return newTheme;
    }
};

const todoManager = {
    getTodos: () => todos,
    
    addTodo: (text) => {
        todos.push({ text, completed: false });
        todoManager.saveTodos();
        return todos;
    },
    
    toggleTodo: (index) => {
        todos[index].completed = !todos[index].completed;
        todoManager.saveTodos();
        return todos;
    },
    
    deleteTodo: (index) => {
        todos.splice(index, 1);
        todoManager.saveTodos();
        return todos;
    },
    
    clearAllTodos: () => {
        todos = [];
        todoManager.saveTodos();
        return todos;
    },
    
    saveTodos: () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};

export { todoManager, themeManager };