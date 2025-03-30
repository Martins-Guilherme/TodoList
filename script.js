const inputElement = document.querySelector(".new-task--input");
const addTaskButton = document.querySelector(".new-task--button");
const addTaskListContainer = document.querySelector(".tasks--container");

const validateInput = () => inputElement.value.trim().length > 0;

// Adicionar uma nova tarefa
const handleAddTask = () => {
  const inputIsValid = validateInput();
  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", () => {
    handleClick(taskContent);
  });

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-solid");
  deleteItem.classList.add("fa-trash-can");

  deleteItem.addEventListener("click", () => {
    handleDeleteClick(taskItemContainer, taskContent);
  });

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  addTaskListContainer.appendChild(taskItemContainer);
  inputElement.value = "";
  inputElement.focus();
  updateLocalStorage();
};

// Marcar tarefa como concluida
const handleClick = (taskContent) => {
  const tasks = addTaskListContainer.childNodes;
  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }
  updateLocalStorage();
};

// Deletar uma tarefa
const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = addTaskListContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) taskItemContainer.remove();
  }
  updateLocalStorage();
};

// Alterar a cor do input se não estiver preenchido corretamente
const handleInputChange = () => {
  const inputIsValid = validateInput();
  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

// Atualizar o local storage para armazenar e persistir novos dados
const updateLocalStorage = () => {
  const tasks = addTaskListContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");
    return { description: content.innerText, isCompleted };
  });
  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => {
      handleClick(taskContent);
    });

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash-can");

    deleteItem.addEventListener("click", () => {
      handleDeleteClick(taskItemContainer, taskContent);
    });

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    addTaskListContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());
