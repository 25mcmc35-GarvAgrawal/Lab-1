interface Data  {
    id : number ;
    task : string ;
    date : Date ;
    complete : boolean  
} ; 

let list : Data[] = [] ; 
let index : number = 0 ;

const addTask = () => {
    const taskInput = document.querySelector<HTMLInputElement>("#task") ; 
    const date = document.querySelector<HTMLInputElement>("#date") ; 

    if (!taskInput || !date) {
    console.error("Required inputs not found");
    return;
}

    if(taskInput.value.trim().length == 0 || date.value === ""){
        alert("Add task and date") ; 
        return ; 
    }

    const data : Data = {
        id : index++ ,
        task : taskInput.value.trim() , 
        date : new Date(date.value) ,
        complete : false  
    }

    list.push(data) ; 

    renderList(list) ; 

    taskInput.value = "" ; 
    date.value = "" ; 
}

const renderList = (tasks : Data[]) => {
    const ul = document.querySelector<HTMLUListElement>("#list") ; 

    if(!ul){
        return ; 
    }

    ul.innerHTML = "" ; 

    tasks.forEach(data => {
        const li = document.createElement("li") ; 
        li.classList.add("task-item") ; 
        li.dataset.index = data.id.toString() ;
        
        if(data.complete){
            li.classList.add("completed") ;
        }

        const span = document.createElement("span") ; 
        span.textContent = `${data.task} - ${data.date.toDateString()}`

        const completeBtn = document.createElement("button") ; 
        completeBtn.textContent = "Complete" ; 

        completeBtn.addEventListener("click" , () => {
            data.complete = !data.complete ; 
            renderList(list) ;
        })

        const removeBtn = document.createElement("button") ; 
        removeBtn.textContent = "Remove" ; 

        removeBtn.addEventListener("click" , () => {
            list = list.filter((task) => task.id != data.id) ; 
            renderList(list) ; 
        })

        li.appendChild(span) ; 
        li.appendChild(completeBtn) ;
        li.appendChild(removeBtn) ; 
        ul.appendChild(li) ; 
    })
}

const all = () => {
    renderList(list) ; 
}

const completed = () => {
    const completeList = list.filter((task) => task.complete === true) ;
    renderList(completeList) 
}

const pending = () => {
    const pendingList = list.filter((task) => task.complete === false) ; 
    renderList(pendingList) ; 
}

document.getElementById("all")?.addEventListener("click" , all) ; 
document.getElementById("completed")?.addEventListener("click" , completed) ; 
document.getElementById("pending")?.addEventListener("click" , pending) ; 
document.getElementById("addTask")?.addEventListener("click" , addTask) ; 

const taskInput = document.querySelector<HTMLInputElement>("#task");
const dateInput = document.querySelector<HTMLInputElement>("#date");

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault() ; 
        addTask();
    }
};

taskInput?.addEventListener("keydown", handleKeyDown);
dateInput?.addEventListener("keydown", handleKeyDown);