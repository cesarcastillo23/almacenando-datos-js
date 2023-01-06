import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js'; 
import { readTask } from './readTask.js';

export const addTask = (evento) => {
  evento.preventDefault();
  const list = document.querySelector('[data-list]');
  const input = document.querySelector('[data-form-input]');
  const calendar = document.querySelector('[data-form-date]'); //1
  
  const date=calendar.value; //2
  const value = input.value;
  const dateFormat=moment(date).format("YYYY/MM/DD"); //3
  
  if(value === "" || date === ""){
    return;
  }
    input.value = '';
    calendar.value = '';

    const complete = false;
    
    const taskobj={
      value,
      dateFormat,
      complete,
      id:uuid.v4(),
    };
  list.innerHTML="";
  //guarda la info 
  const taskList= JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.push(taskobj);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    readTask()
}
export const createTask = ({value, dateFormat,complete,id}) => {
  const task = document.createElement('li');
  task.classList.add('card');
  //backticks
  const taskContent = document.createElement('div');
   const dateElement = document.createElement('span');
  const check =checkComplete(id)
  console.log(taskContent)
  if (complete){
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }
  const titleTask = document.createElement('span');
  titleTask.classList.add('task');
  titleTask.innerText = value;
   dateElement.innerText=dateFormat;
  taskContent.appendChild(check);
  taskContent.appendChild(titleTask);
  // task.innerHTML = content;

  task.appendChild(taskContent);
   task.appendChild(dateElement)
    task.appendChild(deleteIcon(id));
    return task;
}