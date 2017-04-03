window.addEventListener('DOMContentLoaded', function() {
    let taskInput = document.getElementById("taskInput");
    let section = document.getElementsByClassName("todo__body");
    let list = document.createElement('ul');
    list.classList.add("todoList");
    section[0].appendChild(list);
    showTasks(list);

    taskInput.onkeydown = function (event) {
        let task = event.target.value.trim();

        if (event.keyCode === 13 && task) {
            let taskLis = list.childNodes;
            let li = createLi(task);
            let todoId = 1;
            if (taskLis.length > 1) {
                todoId = +taskLis[taskLis.length - 2].getAttribute("data-id") + 1;
            }

            li.setAttribute("data-id", todoId);
            localStorage.setItem("key" + todoId, task);
            list.appendChild(li);

            event.target.value = null;
            let summary = createSummary(list);
            list.appendChild(summary)

        }
    };


    list.onclick = function (event) {
        let taskLi = event.target.parentNode;

        if (event.target.classList.contains("removeButton")) {

            taskLi.parentNode.removeChild(taskLi);
            localStorage.removeItem("key" + taskLi.getAttribute("data-id"))
        }

        else if (event.target.classList.contains("circle")) {
            taskLi.classList.toggle("taskDone")
        }

        else if (event.target.classList.contains("clear")) {
            clearCompleted(list)
        }
        else if (event.target.classList.contains("all")) {
            showAll(list)
        }
        else if (event.target.classList.contains("active")) {
            showActive(list)
        }
        else if (event.target.classList.contains("completed")) {
            showCompleted(list)
        }

        let summary = createSummary(list);
        list.appendChild(summary)
    };

    list.onchange = function (event) {
        let taskLi = event.target.parentNode;
        if (event.target.classList.contains("taskOutput")) {
            localStorage.removeItem("key" + taskLi.getAttribute("data-id"));
            localStorage.setItem("key" + taskLi.getAttribute("data-id"), event.target.value);
        }
    };
});




