// Tüm elementleri seçmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoUI);
  clearButton.addEventListener("click", clearAllTodo);
  filterInput.addEventListener("keyup", filter);
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display: block");
      } else {
        todo.setAttribute("style", "display:none !important");
      }
    });
  }
}

function clearAllTodo() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    // ekrandan silme
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    // storage dan silme
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert2("success", "Başarılı bir şekilde silindi.");
  } else {
    showAlert2("warning", "Silinecek to do yok");
  }
}

function removeTodoUI(e) {
  if (e.target.className === "fa fa-remove") {
    //ekrandan silmek
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    showAlert2("success", "Todo başarıyla silindi.");

    //storage dan silmek
    removeTodoToStorage(todo.textContent);
  }
}

function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen boş bırakmayınız !");
  } else {
    //arayüze ekleme
    addTodoUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "Todo eklendi :)");
  }

  //storage ekleme
  e.preventDefault();
}

function addTodoUI(newTodo) {
  // <li class="list-group-item d-flex justify-content-between">
  //             Todo 1
  //             <a href="#" class="delete-item">
  //               <i class="fa fa-remove"></i>
  //             </a>
  //           </li>

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  //     <div class="alert alert-warning" role="alert">
  //   This is a warning alert—check it out!
  // </div>

  const div = document.createElement("div");
  //   div.className = "alert alert-" + type;
  div.className = `alert alert-${type}`;
  div.textContent = message;

  firstCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 1000);
}

function showAlert2(type, message) {
  //     <div class="alert alert-warning" role="alert">
  //   This is a warning alert—check it out!
  // </div>

  const div = document.createElement("div");
  //   div.className = "alert alert-" + type;
  div.className = `alert alert-${type}`;
  div.textContent = message;

  document.querySelector("#alertArea").appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 1000);
}
