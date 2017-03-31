let taskInput = document.getElementById("taskInput");
let section = document.getElementsByClassName("todo__body");
let ul = document.createElement('ul');
ul.classList.add("todoList");
section[0].appendChild(ul);
showTasks();

taskInput.onkeydown = function(event) {

    if (event.keyCode === 13 && taskInput.value ) {

        let li = createLi(taskInput.value);
        let todoId = 1;
        if (ul.childNodes.length>0) {
            todoId = +ul.childNodes[ul.childNodes.length-2].getAttribute("data-id")+1;
        }

        li.setAttribute("data-id", todoId);
        localStorage.setItem("key"+todoId,taskInput.value);
        ul.appendChild(li);

        taskInput.value = null;
        let summary = createSummary(ul);
        ul.appendChild(summary)

    }
};


ul.onclick = function (event) {

    if (event.target.classList.contains("removeButton")){

        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        localStorage.removeItem ("key"+ event.target.parentNode.getAttribute("data-id"))
    }

    else if (event.target.classList.contains("circle"))
    {event.target.parentNode.classList.toggle("taskDone")}

    else if (event.target.classList.contains("clear"))
    { clearCompleted (ul)}
    else if (event.target.classList.contains("all"))
    { showAll(ul)}
    else if (event.target.classList.contains("active"))
    { showActive(ul)}
    else if (event.target.classList.contains("completed"))
    { showCompleted(ul)}

    let summary = createSummary(ul);
    ul.appendChild(summary)
};

ul.onchange = function (event) {
    if (event.target.classList.contains("taskOutput")) {
        localStorage.removeItem ("key"+ event.target.parentNode.getAttribute("data-id"));
        localStorage.setItem("key"+ event.target.parentNode.getAttribute("data-id"),event.target.value);
    }
};





