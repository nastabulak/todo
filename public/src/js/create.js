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

    let fragment = document.createDocumentFragment();
    fragment.appendChild(circle);
    fragment.appendChild(todo);
    fragment.appendChild(button);

    li.appendChild(fragment);

    return li
}
function showTasks(list){
    if (localStorage.length) {
        for (let i=0; i<localStorage.length; i++) {
            let li = createLi(localStorage.getItem(localStorage.key(i)));
            li.setAttribute("data-id", localStorage.key(i).substring(3));
            list.appendChild(li);
        }
        let summary = createSummary(list);
        list.appendChild(summary)
    }
}

function createSummary(list) {
    let taskLis = list.childNodes;
    if (taskLis.length) {
        for (let i = 0; i < taskLis.length; i++) {
            if (taskLis[i].classList.contains("summary"))
                list.removeChild(taskLis[i])
        }
    }
    let li = document.createElement('li');
    li.classList.add("summary");

    let counter = 0;
    for (let i=0; i<list.childNodes.length; i++){
        if (!taskLis[i].classList.contains('taskDone')) counter++
    }

    let text = counter + " items left";
    let summary = createElement("span","itemsLeft", text);

    let all = createElement("a", "all","All");
    let active = createElement("a", "active","Active");
    let completed = createElement("a", "completed","Completed");

    let clear = createElement("a", "clear","Clear Completed");

    let fragment = document.createDocumentFragment();
    fragment.appendChild(summary);
    fragment.appendChild(all);
    fragment.appendChild(active);
    fragment.appendChild(completed);
    fragment.appendChild(clear);

    li.appendChild(fragment);
    return li
}

function showAll (list){
    let taskLis = list.childNodes;
    if (taskLis.length) {
        for (let i = 0; i < taskLis.length; i++) {
                taskLis[i].classList.remove("remove")
        }
    }

}
function showCompleted (list) {
    let taskLis = list.childNodes;
    if ( taskLis.length) {
        for ( let i = 0; i < taskLis.length; i++ ) {
            if (taskLis[i].classList.contains("remove")) {
                taskLis[i].classList.remove("remove")
            }
            if (!taskLis[i].classList.contains("taskDone")) {
                taskLis[i].classList.add("remove")
            }

        }
    }
}

function showActive (list) {
    let taskLis = list.childNodes;
    if ( taskLis.length ) {
        for ( let i = 0; i < taskLis.length; i++ ) {
            if ( taskLis[i].classList.contains("remove") ) {
                taskLis[i].classList.remove("remove")
            }
            if (taskLis[i].classList.contains("taskDone"))
                taskLis[i].classList.add("remove")
        }
    }

}

function clearCompleted (list){
    let taskLis = list.childNodes;
    if (taskLis.length) {
        for ( let i = 0; i < taskLis.length; i++ ) {
            if ( taskLis[i].classList.contains("taskDone") ) {
            list.removeChild(taskLis[i]);
                localStorage.removeItem ("key"+ taskLis[i].getAttribute("data-id"));
                clearCompleted(list)
            }
        }
    }

}