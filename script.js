let task = [];

const addTodo = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    task.push({ text: text, completed: false });

    updateTaskList();
    updateStats()
  }
};

const toggleTask=(index)=>{
    task[index].completed=!task[index].completed
    updateTaskList()
    updateStats()
}

const deleteTask=(index)=>{
    task.splice(index,1)
    updateTaskList()
    updateStats()
}

const editTask=(index)=>{
    const taskinput=document.getElementById('taskInput')
    taskinput.value=task[index].text

    task.splice(index,1)
    updateTaskList()
    updateStats()
}

const updateStats=()=>{
     const completedTask=task.filter(t=>t.completed).length //---
     const totalTask=task.length
     const progress=(completedTask/totalTask)*100//---
     const bar=document.querySelector('.progress')
     
     bar.style.width=`${progress}%`

     document.querySelector('.progress-number').innerHTML=`${completedTask} / ${totalTask}`
}

const updateTaskList = () => {
  const tasklist = document.getElementById("task-list");
  tasklist.innerHTML = "";

  task.forEach((t,index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${t.completed ? 'completed':''}">
            <input type="checkbox" class="checkbox"  ${
                t.completed ? 'checked':""
            } />
            <p>${t.text}</p>
            </div>
            <div class="icons">
                <img class="edit" src="./img/edit.png" onclick="editTask(${index})">
                <img class="bin" src="./img/bin.png" onclick="deleteTask(${index})">
            </div>
        </div>
        `;
    listItem.addEventListener('change',()=>toggleTask(index))
    tasklist.append(listItem)
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTodo();
});


