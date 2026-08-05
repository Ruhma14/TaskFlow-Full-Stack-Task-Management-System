// LOCAL STORAGE FUNCTIONS

// Local Storage Key
const STORAGE_KEY = "taskflowTasks";


// Save Tasks

function saveTasks(tasks) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}


// Load Tasks
function loadTasks() {

    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks) {

        return JSON.parse(savedTasks);

    }

    return [];

}

// Clear Local Storage

function clearTasks() {

    localStorage.removeItem(STORAGE_KEY);

}