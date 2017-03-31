function createElement (element, className, text){
    let el = document.createElement(element);
    el.classList.add(className);
    el.appendChild(document.createTextNode(text));
    return el
}


function createToDo (value) {
    let todo = document.createElement('input');
    todo.type = "text";
    todo.className = "taskOutput";
    todo.value = value;
    todo.setAttribute("readonly", "true");

    todo.ondblclick = function () {

        todo.removeAttribute("readonly")
    };
    return todo
}
function createLi (value) {
    let li = document.createElement("li");

    let todo = createToDo(value);
    let button = createElement("button", "removeButton", "x" );
    let circle = createElement("button", "circle", "o");

    li.appendChild(circle);
    li.appendChild(todo);
    li.appendChild(button);
    return li
}
function showTasks(){
    if (localStorage.length>0) {
        for (i=0; i<localStorage.length; i++) {
            let li = createLi(localStorage.getItem(localStorage.key(i)));
            li.setAttribute("data-id", localStorage.key(i).substring(3));
            ul.appendChild(li);
        }
        let summary = createSummary(ul);
        ul.appendChild(summary)
    }
}

function createSummary(list) {
    if (list.childNodes.length>0) {
        for (i = 0; i < list.childNodes.length; i++) {
            if (list.childNodes[i].classList.contains("summary"))
                list.removeChild(ul.childNodes[i])
        }
    }
    let li = document.createElement('li');
    li.classList.add("summary");

    let counter = 0;
    for (i=0; i<list.childNodes.length; i++){
        if (!list.childNodes[i].classList.contains('taskDone')) counter++
    }

    let text = counter + " items left";
    let summary = createElement("span","itemsLeft", text);

    let all = createElement("a", "all","All");
    let active = createElement("a", "active","Active");
    let completed = createElement("a", "completed","Completed");

    let clear = createElement("a", "clear","Clear Completed");


    li.appendChild(summary);
    li.appendChild(all);
    li.appendChild(active);
    li.appendChild(completed);
    li.appendChild(clear);
    return li
}

function showAll (list){
    if (list.childNodes.length>0) {
        for (i = 0; i < list.childNodes.length; i++) {
                ul.childNodes[i].classList.remove("remove")
        }
    }

}
function showCompleted (list) {
    if (list.childNodes.length>0) {
        for (i = 0; i < list.childNodes.length; i++) {
            if (list.childNodes[i].classList.contains("remove")) {
                ul.childNodes[i].classList.remove("remove")
            }
            if (!list.childNodes[i].classList.contains("taskDone")) {
                ul.childNodes[i].classList.add("remove")
            }

        }
    }
}

function showActive (list) {
    if (list.childNodes.length>0) {
        for (i = 0; i < list.childNodes.length; i++) {
            if (list.childNodes[i].classList.contains("remove")) {
                ul.childNodes[i].classList.remove("remove")
            }
            if (list.childNodes[i].classList.contains("taskDone"))
                ul.childNodes[i].classList.add("remove")
        }
    }

}

function clearCompleted (list){
    if (list.childNodes.length>0) {
        for (i = 0; i < list.childNodes.length; i++) {
            if (list.childNodes[i].classList.contains("taskDone")) {
                ul.removeChild(ul.childNodes[i]);
                localStorage.removeItem ("key"+ ul.childNodes[i].getAttribute("data-id"))
                clearCompleted(list)
            }
        }
    }

}