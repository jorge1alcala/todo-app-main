function getTodoInput(event) {
  event.preventDefault();
  let text = document.getElementById('todo-input');
  console.log(text.value);
  console.log(event.path[8].clientInformation.languages.length);
}
