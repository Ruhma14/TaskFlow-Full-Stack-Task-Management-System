// ==========================================
// TASKFLOW - FRONTEND + BACKEND API
// ==========================================

const API_URL = "http://localhost:5000/api/tasks";

// MongoDB is now the main source of truth.
// LocalStorage is no longer used for tasks.
let tasks = [];


// ==========================================
// SELECT HTML ELEMENTS
// ==========================================

const title = document.getElementById("title");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completionRate = document.getElementById("completionRate");
const searchTask = document.getElementById("searchTask");
const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");
const toast = document.getElementById("toast");


// ==========================================
// TOAST NOTIFICATION
// ==========================================

function showToast(message, success = true) {
    toast.innerText = message;
    toast.style.background = success ? "#22c55e" : "#ef4444";
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


// ==========================================
// LOAD TASKS FROM MONGODB THROUGH API
// ==========================================

async function loadTasksFromAPI() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        tasks = await response.json();

        displayTasks();
        updateDashboard();

    } catch (error) {
        console.error("Load tasks error:", error);
        showToast("Unable to load tasks from server.", false);
    }
}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {
    let completed = 0;

    for (let task of tasks) {
        if (task.completed) {
            completed++;
        }
    }

    const pending = tasks.length - completed;

    totalTasks.innerText = tasks.length;
    completedTasks.innerText = completed;
    pendingTasks.innerText = pending;

    if (tasks.length === 0) {
        completionRate.innerText = "0%";
    } else {
        const percentage = Math.round((completed / tasks.length) * 100);
        completionRate.innerText = percentage + "%";
    }
}


// ==========================================
// DISPLAY TASKS
// ==========================================

function displayTasks(taskArray = tasks) {
    taskContainer.innerHTML = "";

    if (taskArray.length === 0) {
        taskContainer.innerHTML = `
            <p class="empty">
                No tasks available.
            </p>
        `;
        return;
    }

    // Backend already returns newest tasks first.
    taskArray.forEach(function (task) {
        let badgeClass = "low";

        if (task.priority === "High") {
            badgeClass = "high";
        } else if (task.priority === "Medium") {
            badgeClass = "medium";
        }

        const card = document.createElement("div");
        card.classList.add("task");

        if (task.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${escapeHTML(task.title)}</h3>
            <p>${escapeHTML(task.description)}</p>

            <div class="task-info">
                <span>📅 ${escapeHTML(task.dueDate)}</span>

                <span class="badge ${badgeClass}">
                    ${escapeHTML(task.priority)}
                </span>

                <span>📂 ${escapeHTML(task.category)}</span>
            </div>

            <div class="task-buttons">
                <button
                    class="complete-btn"
                    data-id="${task._id}"
                    data-completed="${task.completed}">
                    ${task.completed ? "Completed" : "Complete"}
                </button>

                <button
                    class="delete-btn"
                    data-id="${task._id}">
                    Delete
                </button>
            </div>
        `;

        taskContainer.appendChild(card);
    });
}


// Small helper to safely display user-entered text in HTML.
function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================
// ADD NEW TASK - POST /api/tasks
// ==========================================

async function addTask() {
    const taskTitle = title.value.trim();
    const taskDescription = description.value.trim();
    const taskDueDate = dueDate.value;
    const taskPriority = priority.value;
    const taskCategory = category.value.trim();

    // Validation
    if (
        taskTitle === "" ||
        taskDescription === "" ||
        taskDueDate === "" ||
        taskCategory === ""
    ) {
        showToast("Please fill all required fields.", false);
        return;
    }

    const taskData = {
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: taskPriority,
        category: taskCategory,
        completed: false
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to create task");
        }

        // Backend returns { message, task }
        tasks.unshift(data.task);

        displayTasks();
        updateDashboard();
        clearForm();

        showToast("Task Added Successfully.");

    } catch (error) {
        console.error("Add task error:", error);
        showToast("Failed to add task.", false);
    }
}


// ==========================================
// CLEAR FORM
// ==========================================

function clearForm() {
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.selectedIndex = 0;
    category.selectedIndex = 0;
}


addTaskBtn.addEventListener("click", addTask);


// ==========================================
// TASK BUTTONS - COMPLETE & DELETE
// ==========================================

taskContainer.addEventListener("click", async function (event) {
    const button = event.target;

    if (!button.dataset.id) {
        return;
    }

    const id = button.dataset.id;


    // ------------------------------------------
    // COMPLETE / UNCOMPLETE - PUT /api/tasks/:id
    // ------------------------------------------

    if (button.classList.contains("complete-btn")) {
        const currentCompleted = button.dataset.completed === "true";

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: !currentCompleted
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update task");
            }

            const index = tasks.findIndex(function (task) {
                return task._id === id;
            });

            if (index !== -1) {
                tasks[index] = data.task;
            }

            displayTasks();
            updateDashboard();

            showToast("Task Updated Successfully.");

        } catch (error) {
            console.error("Update task error:", error);
            showToast("Failed to update task.", false);
        }
    }


    // ------------------------------------------
    // DELETE - DELETE /api/tasks/:id
    // ------------------------------------------

    if (button.classList.contains("delete-btn")) {
        const confirmDelete = confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete task");
            }

            tasks = tasks.filter(function (task) {
                return task._id !== id;
            });

            displayTasks();
            updateDashboard();

            showToast("Task Deleted Successfully.");

        } catch (error) {
            console.error("Delete task error:", error);
            showToast("Failed to delete task.", false);
        }
    }
});


// ==========================================
// SEARCH TASKS
// ==========================================

searchTask.addEventListener("input", function () {
    const searchValue = searchTask.value.toLowerCase().trim();

    const filteredTasks = tasks.filter(function (task) {
        return (
            task.title.toLowerCase().includes(searchValue) ||
            task.description.toLowerCase().includes(searchValue) ||
            task.category.toLowerCase().includes(searchValue)
        );
    });

    displayTasks(filteredTasks);
});


// ==========================================
// FILTER - ALL TASKS
// ==========================================

allBtn.addEventListener("click", function () {
    displayTasks(tasks);
});


// ==========================================
// FILTER - PENDING TASKS
// ==========================================

pendingBtn.addEventListener("click", function () {
    const pending = tasks.filter(function (task) {
        return task.completed === false;
    });

    displayTasks(pending);
});


// ==========================================
// FILTER - COMPLETED TASKS
// ==========================================

completedBtn.addEventListener("click", function () {
    const completed = tasks.filter(function (task) {
        return task.completed === true;
    });

    displayTasks(completed);
});


// ==========================================
// PRESS ENTER TO ADD TASK
// ==========================================

title.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});

description.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        addTaskBtn.click();
    }
});


// ==========================================
// INITIAL PAGE LOAD
// ==========================================

loadTasksFromAPI();
