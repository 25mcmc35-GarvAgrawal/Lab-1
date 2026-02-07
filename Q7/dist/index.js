var _a, _b, _c, _d;
;
let list = [];
let index = 0;
const addTask = () => {
    const taskInput = document.querySelector("#task");
    const date = document.querySelector("#date");
    if (!taskInput) {
        alert("Add task");
        return;
    }
    if (!date) {
        alert("Add Date");
        return;
    }
    if (taskInput.value.trim().length == 0 || date.value === "") {
        alert("Add task and date");
        return;
    }
    const data = {
        id: index++,
        task: taskInput.value.trim(),
        date: new Date(date.value),
        complete: false
    };
    list.push(data);
    renderList(list);
    taskInput.value = "";
    date.value = "";
};
const renderList = (tasks) => {
    const ul = document.querySelector("#list");
    if (!ul) {
        return;
    }
    ul.innerHTML = "";
    tasks.forEach(data => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.dataset.index = data.id.toString();
        if (data.complete) {
            li.classList.add("completed");
        }
        const span = document.createElement("span");
        span.textContent = `${data.task} - ${data.date.toDateString()}`;
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.addEventListener("click", () => {
            data.complete = !data.complete;
            renderList(list);
        });
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            list = list.filter((task) => task.id != data.id);
            renderList(list);
        });
        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(removeBtn);
        ul.appendChild(li);
    });
};
const all = () => {
    renderList(list);
};
const completed = () => {
    const completeList = list.filter((task) => task.complete === true);
    renderList(completeList);
};
const pending = () => {
    const pendingList = list.filter((task) => task.complete === false);
    renderList(pendingList);
};
(_a = document.getElementById("all")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", all);
(_b = document.getElementById("completed")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", completed);
(_c = document.getElementById("pending")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", pending);
(_d = document.getElementById("addTask")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", addTask);
const taskInput = document.querySelector("#task");
const dateInput = document.querySelector("#date");
const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
};
taskInput === null || taskInput === void 0 ? void 0 : taskInput.addEventListener("keydown", handleKeyDown);
dateInput === null || dateInput === void 0 ? void 0 : dateInput.addEventListener("keydown", handleKeyDown);
export {};
//# sourceMappingURL=index.js.map