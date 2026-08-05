// TASKS ARRAY
// Load saved tasks from Local Storage
let tasks = loadTasks();


// SELECT HTML ELEMENTS


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


// TOAST NOTIFICATION


function showToast(message, success = true) {

    toast.innerText = message;

    if (success) {

        toast.style.background = "#22c55e";

    }

    else {

        toast.style.background = "#ef4444";

    }

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


// UPDATE DASHBOARD


function updateDashboard() {

    let completed = 0;

    for (let task of tasks) {

        if (task.completed) {

            completed++;

        }

    }

    let pending = tasks.length - completed;

    totalTasks.innerText = tasks.length;

    completedTasks.innerText = completed;

    pendingTasks.innerText = pending;

    if (tasks.length === 0) {

        completionRate.innerText = "0%";

    }

    else {

        let percentage = Math.round((completed / tasks.length) * 100);

        completionRate.innerText = percentage + "%";

    }

}


// DISPLAY TASKS

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

    // Newest task first
    const reversedTasks = [...taskArray].reverse();

    reversedTasks.forEach(function (task) {

        let badgeClass = "";

        if (task.priority === "High") {

            badgeClass = "high";

        }

        else if (task.priority === "Medium") {

            badgeClass = "medium";

        }

        else {

            badgeClass = "low";

        }

        const card = document.createElement("div");

        card.classList.add("task");

        if (task.completed) {

            card.classList.add("completed");

        }

        card.innerHTML = `

            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <div class="task-info">

                <span>

                    📅 ${task.dueDate}

                </span>

                <span class="badge ${badgeClass}">

                    ${task.priority}

                </span>

                <span>

                    📂 ${task.category}

                </span>

            </div>

            <div class="task-buttons">

                <button
                    class="complete-btn"
                    data-id="${task.id}">

                    ${task.completed ? "Completed" : "Complete"}

                </button>

                <button
                    class="delete-btn"
                    data-id="${task.id}">

                    Delete

                </button>

            </div>

        `;

        taskContainer.appendChild(card);

    });

}

// INITIAL PAGE LOAD

updateDashboard();

displayTasks();

// ADD NEW TASK


addTaskBtn.addEventListener("click", function () {

    // Get Values

    const taskTitle = title.value.trim();

    const taskDescription = description.value.trim();

    const taskDueDate = dueDate.value;

    const taskPriority = priority.value;

    const taskCategory = category.value;


    // Validation

    if (
        taskTitle === "" ||
        taskDescription === "" ||
        taskDueDate === ""
    ) {

        showToast(
            "Please fill all required fields.",
            false
        );

        return;

    }


    // Create Task Object

    const task = {

        id: Date.now(),

        title: taskTitle,

        description: taskDescription,

        dueDate: taskDueDate,

        priority: taskPriority,

        category: taskCategory,

        completed: false

    };


    // Add Task

    tasks.push(task);


    // Save

    saveTasks(tasks);


    // Update UI

    displayTasks();

    updateDashboard();


    // Clear Form

    title.value = "";

    description.value = "";

    dueDate.value = "";

    priority.selectedIndex = 0;

    category.selectedIndex = 0;


    showToast("Task Added Successfully.");

});


// TASK BUTTONS
// (Complete & Delete)

taskContainer.addEventListener("click", function (event) {

    const button = event.target;

    const id = Number(button.dataset.id);

    if (!id) {

        return;

    }


    // COMPLETE TASK

    if (button.classList.contains("complete-btn")) {

        for (let task of tasks) {

            if (task.id === id) {

                task.completed = !task.completed;

                break;

            }

        }

        saveTasks(tasks);

        displayTasks();

        updateDashboard();

        showToast("Task Updated Successfully.");

    }


    // DELETE TASK


    if (button.classList.contains("delete-btn")) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {

            return;

        }

        tasks = tasks.filter(function (task) {

            return task.id !== id;

        });

        saveTasks(tasks);

        displayTasks();

        updateDashboard();

        showToast("Task Deleted Successfully.");

    }

});

// SEARCH TASKS

searchTask.addEventListener("input", function () {

    const searchValue = searchTask.value.toLowerCase();

    const filteredTasks = tasks.filter(function (task) {

        return (

            task.title.toLowerCase().includes(searchValue) ||

            task.description.toLowerCase().includes(searchValue) ||

            task.category.toLowerCase().includes(searchValue)

        );

    });

    displayTasks(filteredTasks);

});



// FILTER - ALL TASKS


allBtn.addEventListener("click", function () {

    displayTasks(tasks);

});



// FILTER - PENDING TASKS


pendingBtn.addEventListener("click", function () {

    const pending = tasks.filter(function (task) {

        return task.completed === false;

    });

    displayTasks(pending);

});


// FILTER - COMPLETED TASKS


completedBtn.addEventListener("click", function () {

    const completed = tasks.filter(function (task) {

        return task.completed === true;

    });

    displayTasks(completed);

});

// PRESS ENTER TO ADD TASk
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

// INITIAL PAGE LOAD


updateDashboard();

displayTasks();