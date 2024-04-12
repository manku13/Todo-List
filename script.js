const apiUrl = "https://jsonplaceholder.typicode.com/todos"

const getTodos = () => {
  fetch(apiUrl + "?_limit=10")
  .then(res => res.json())
  .then(data => {
    data.forEach(todo => {
      getTodosToDOM(todo)
    });
  })
}

const getTodosToDOM = (todo) => {
  const div = document.createElement("div")
  div.classList.add("todo")
  div.appendChild(document.createTextNode(todo.title))
  div.setAttribute("data-id", todo.id)

  if (todo.completed){
    div.classList.add("done")
    // div.textContent = div.textContent + " - Done"

    // div.innerText = div.innerText + " - Done"

    div.innerHTML += " - Done"
  }

  document.getElementById("todo-list").appendChild(div)
}

const createTodo = (event) =>{
  event.preventDefault()

  const newTodo = {
    title: event.target.firstElementChild.value,
    completed: false
  }
  
  fetch(apiUrl,{
    method: "Post",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => res.json())
  .then((data) => getTodosToDOM(data))
}

const toggleClick = (event) => {
  if(event.target.classList.contains("todo")){
    event.target.classList.toggle("done")

    updateTodo(event.target.dataset.id, event.target.classList.contains("done"))
  }
}

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`,{
    method: "PUT",
    body: JSON.stringify(completed),
    headers:{
      "Content-type": "application/json"
    }
  })
}

const deleteTodo = (event) =>{
  if(event.target.classList.contains("todo")){
    const id = event.target.dataset.id
    fetch(`${apiUrl}/${id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => event.target.remove())
  }
}

function init() {
  document.addEventListener("DOMContentLoaded", getTodos)
  document.querySelector("#todo-form").addEventListener("submit",createTodo)
  document.querySelector("#todo-list").addEventListener("click", toggleClick)
  document.querySelector("#todo-list").addEventListener("dblclick", deleteTodo)
}

init()

// git repo