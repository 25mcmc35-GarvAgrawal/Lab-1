let list = [];
let index = 0;


const renderList = (tasks) => {
    const ul = document.getElementById("list") ; 
    ul.innerHTML = "" ; 

    tasks.forEach(data => {
        const li = document.createElement("li") ; 
        li.classList.add("task-item") ; 
        li.dataset.index = data.index ;

        if(data.complete){
            li.classList.add("completed") ; 
        }

        const span = document.createElement("span") ; 
        span.textContent = `${data.task} - ${data.date.toDateString()}` ; 

        const completeBtn = document.createElement("button") ; 

        completeBtn.textContent = "Complete" ; 

        completeBtn.dataset.action = "complete" ; 

        

        completeBtn.addEventListener("click" , () => {
            data.complete = !data.complete ; 
            renderList(list) ;
            
        });

        const removeBtn = document.createElement("button") ; 
        removeBtn.textContent = "Remove" ; 

        removeBtn.dataset.action = "remove" ; 
        removeBtn.addEventListener("click" , () => {
            list = list.filter(item => item.index != data.index) ; 
            renderList(list) ; 
        })

        li.appendChild(span)
        li.appendChild(completeBtn) ;
        li.appendChild(removeBtn) ;
        ul.appendChild(li) ; 
        
    });
}

// document.querySelector("#list").addEventListener("click" , (e) => {
//     const action = e.target.dataset.action ; 
//     if(!action){
//         return ; 
//     }

//     const li = e.target.closest("li") ; 
//     const taskIndex = Number(li.dataset.index) ; 

//     const task = list.find((item) => item.index === taskIndex) ; 

//     if(!task) return ; 

//     if(action === "complete"){
//         task.complete = !task.complete ; 
//     }

//     if(action === "remove"){
//         list = list.filter((item) => item.index != taskIndex) ;
//     }

//     renderList(list) ; 
// })

const addTask = () => {
  const taskInput = document.getElementById("task");
  const dateInput = document.getElementById("date");
  const ul = document.getElementById("list");

  if (taskInput.value.trim() === "" || dateInput.value === "") {
    alert("Please enter task and date");
    return;
  }

  const data = {
    index: index++,
    task: taskInput.value.trim(),
    date: new Date(dateInput.value),
    complete: false,
  };

  list.push(data);

  renderList(list) ; 

  // clear inputs
  taskInput.value = "";
  dateInput.value = "";
};

const completed = () => {
    const completeList = list.filter((task) => task.complete === true) ; 
    renderList(completeList) ; 
}

const pending = () => {
    const pendingList = list.filter((task) => task.complete == false) ; 
    renderList(pendingList) ;
}

const all = () => {
    renderList(list) ; 
}

document
  .getElementById("addTask")
  .addEventListener("click", addTask);

document.getElementById("completed").addEventListener("click" , completed) ; 

document.getElementById("pending").addEventListener("click" , pending) ; 

document.getElementById("all").addEventListener("click" , all) ;
